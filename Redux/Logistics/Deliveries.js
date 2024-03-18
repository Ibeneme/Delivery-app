import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

export const createAuthorizedHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

const initialState = {
  deliveries: [],
  loading: false,
  error: null,
  successs: false,
};

export const fetchDeliveriesByStatus = createAsyncThunk(
  "deliveriesLogistics/fetchDeliveriesByStatus",
  async (status) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/deliveries/company?status=${status}`,
        {
          headers: headers.headers,
        }
      );

      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw new Error("Failed to fetch deliveries.");
    }
  }
);

export const fetchLogisticsDeliveries = createAsyncThunk(
  "deliveriesLogistics/fetchLogisticsDeliveries",
  async () => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(`${API_BASE_URL}/deliveries/company`, {
        headers: headers.headers,
      });
      console.log(response.data, "company");
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw new Error("Failed to fetch deliveries.");
    }
  }
);

export const updateDeliveryStatus = createAsyncThunk(
  "deliveriesLogistics/updateDeliveryStatus",
  async ({ deliveryId, status }) => {
    console.log(deliveryId, status, "update");
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.put(
        `${API_BASE_URL}/deliveries/${deliveryId}/status`,
        { status },
        {
          headers: headers.headers,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      //checkForUnauthorizedStatus(error?.response);
      throw new Error("Failed to update delivery status.");
    }
  }
);

const deliveriesLogisticsSlice = createSlice({
  name: "deliveriesLogistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveriesByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveriesByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveriesByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLogisticsDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successs = false;
      })
      .addCase(fetchLogisticsDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
        state.successs = true;
      })
      .addCase(fetchLogisticsDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDeliveryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeliveryStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateDeliveryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default deliveriesLogisticsSlice.reducer;
