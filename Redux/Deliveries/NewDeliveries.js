import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAuthorizedHeaders } from "../Payment/Payments";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

const initialState = {
  loading: false,
  error: null,
  success: false,
  vehicles: [],
};

const url = API_BASE_URL;

export const fetchLogisticsCompaniesNew = createAsyncThunk(
    "newDelivery/fetchLogisticsCompaniesNew",
    async ({ params }) => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const BearerToken = `Bearer ${token}`;
        const [packageWeight, vehicleType, pickupAddress, deliveryAddress] = params;
        const response = await axios.get(
          `${url}/deliveries/logistics-companies?packageWeight=${packageWeight}&pickupAddress=${pickupAddress}&deliveryAddress=${deliveryAddress}&vehicleType=${vehicleType}`,
          {
            headers: {
              Authorization: BearerToken,
            },
          }
        );
        console.log(response, "reduxres");
  
        return response?.data;
      } catch (error) {
        console.log(error?.response, "reduxrerrores");
        return error?.response;
      }
    },
    {
      serializeError: (error) => {
        return {
          ...error,
          headers: null, // Marking headers as non-serializable
        };
      },
    }
  );
  

const newDeliverySlice = createSlice({
  name: "newDelivery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogisticsCompaniesNew.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchLogisticsCompaniesNew.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.vehicles = action.payload;
      })
      .addCase(fetchLogisticsCompaniesNew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error occurred while signing up.";
        state.success = false;
      });
  },
});

export default newDeliverySlice.reducer;
