import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthorizedHeaders } from "../Payment/Payments";
import { API_BASE_URL } from "../BaseUrl/Baseurl";

export const fetchUser = createAsyncThunk(
  "userProfile/fetchUser",
  async ({ ordinaryUserId }) => {
    const headers = await createAuthorizedHeaders();
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/ordinary/${ordinaryUserId}`,
        headers
      );
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const updateProfileLogistics = createAsyncThunk(
  "userProfile/updateProfileLogistics",
  async ({
    logisticsId,
    logisticsName,
    profileImage,
    phoneNumber,
    address,
    location,
    basePrice,
    pickupDuration,
    deliveryDuration,
  }) => {
    const headers = await createAuthorizedHeaders();

    try {
      const formData = new FormData();
      formData.append("logisticsId", logisticsId);
      formData.append("logisticsName", logisticsName);
      formData.append("profileImage", profileImage);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("location", location);
      formData.append("basePrice", basePrice);
      formData.append("pickupDuration", pickupDuration);
      formData.append("deliveryDuration", deliveryDuration);

      const response = await axios.put(
        `${API_BASE_URL}/users/logistics/profile-update/${logisticsId}`,
        formData,
        {
          headers: {
            ...headers.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);
export const fetchUserLogistics = createAsyncThunk(
  "userProfile/fetchUserLogistics",
  async (logisticsId, { getState }) => {
    const headers = await createAuthorizedHeaders();

    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/logistics/${logisticsId}`,
        headers
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    success: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserLogistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserLogistics.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(fetchUserLogistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfileLogistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileLogistics.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(updateProfileLogistics.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.error.message;
      });
  },
});

export default userProfileSlice.reducer;
