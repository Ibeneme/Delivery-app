import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://backend.quicklogisticshub.com";

export const createAuthorizedHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  console.log(token, "tokenmp");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchMarketPlaceDeliveries = createAsyncThunk(
  "marketplace/fetchMarketPlaceDeliveries",
  async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log(token, "Marketplace Slice - Fetch Deliveries:");
      const response = await axios.get(
        `${API_BASE_URL}/api/deliveries/marketplace`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Marketplace Slice - Fetch Deliveries:", response.data);
      return response.data;
    } catch (error) {
      console.log(
        "Marketplace Slice - Fetch Deliveries Error:",
        error?.response
      );
      return error?.response;
    }
  }
);

// ... (previous imports and code)

export const acceptDelivery = createAsyncThunk(
    "marketplace/acceptDelivery",
    async ({ deliveryId, vehicleId }) => { // Accept an object with deliveryId and vehicleId
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log(token, "Marketplace Slice - Fetch Deliveries:");
  
        const response = await axios.put(
          `${API_BASE_URL}/api/deliveries/marketplace/accept/${deliveryId}?vehicleID=${vehicleId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Marketplace Slice - Accept Delivery:", response.data);
        return response.data;
      } catch (error) {
        console.log(
          "Marketplace Slice - Accept Delivery Error:",
          error?.response
        );
        return error?.response;
      }
    }
  );


const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState: {
    deliveries: [],
    acceptedDelivery: null,
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketPlaceDeliveries.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchMarketPlaceDeliveries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deliveries = action.payload;
        state.loading = false;
      })
      .addCase(fetchMarketPlaceDeliveries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(acceptDelivery.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(acceptDelivery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.acceptedDelivery = action.payload;
        state.loading = false;
      })
      .addCase(acceptDelivery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default marketplaceSlice.reducer;
