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

export const fetchVehicleReview = createAsyncThunk(
  "rating/fetchVehicleReview",
  async (reviewId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/deliveries/vehicle-reviews/${reviewId}`,
        {
          headers: headers.headers,
        }
      );
      return response.data;
    } catch (error) {
      ///checkForUnauthorizedStatus(error?.response);
      return error.response;
    }
  }
);

export const updateDeliveryRating = createAsyncThunk(
  "rating/updateDeliveryRating",
  async ({ deliveryId, rating, review, token }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/deliveries/rate-delivery/${deliveryId}`,
        `rating=${rating}&review=${review}`,
        {
          headers: headers.headers,
        }
      );
      return response.data;
    } catch (error) {
      ///checkForUnauthorizedStatus(error?.response);
      return error.response;
    }
  }
);

export const fetchCompanyReview = createAsyncThunk(
  "rating/fetchCompanyReview",
  async (reviewId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/deliveries/company-reviews/${reviewId}`,
        {
          headers: headers.headers,
        }
      );
      return response.data;
    } catch (error) {
      ///checkForUnauthorizedStatus(error?.response);

      return error.response;
    }
  }
);

export const deleteDeliveryRating = createAsyncThunk(
  "rating/deleteDeliveryRating",
  async ({ deliveryId, token }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deliveries/rate-delivery/${deliveryId}`,
        {
          headers: headers.headers,
        }
      );
      return response.data;
    } catch (error) {
      ///checkForUnauthorizedStatus(error?.response);

      return error.response;
    }
  }
);

export const deleteVehicleReview = createAsyncThunk(
  "rating/deleteVehicleReview",
  async ({ reviewId, token }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deliveries/vehicle-reviews/${reviewId}`,
        {
          headers: headers.headers,
        }
      );
      return response.data;
    } catch (error) {
      ///checkForUnauthorizedStatus(error?.response);

      return error.response;
    }
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    vehicleReview: null,
    deliveryRatingUpdate: null,
    companyReview: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleReview.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicleReview = action.payload;
      })
      .addCase(fetchVehicleReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDeliveryRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeliveryRating.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveryRatingUpdate = action.payload;
      })
      .addCase(updateDeliveryRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCompanyReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyReview.fulfilled, (state, action) => {
        state.loading = false;
        state.companyReview = action.payload;
      })
      .addCase(fetchCompanyReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDeliveryRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeliveryRating.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDeliveryRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteVehicleReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVehicleReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteVehicleReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ratingSlice.reducer;
