import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthorizedHeaders } from "../Payment/Payments";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

export const updateProfile = createAsyncThunk(
  "profile/update",
  async ({
    ordinaryId,
    fullName,
    profileImage,
    phoneNumber,
    address,
    location,
  }) => {
    const headers = await createAuthorizedHeaders();

    try {
      const formData = new FormData();
      formData.append("ordinaryId", ordinaryId);
      formData.append("fullName", fullName);
      formData.append("profileImage", profileImage);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("location", location);

      const response = await axios.put(
        `${API_BASE_URL}/users/ordinary/profile-update/${ordinaryId}`,
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

export const fetchUser = createAsyncThunk(
  "profile/fetchUser",
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

export const deleteUser = createAsyncThunk(
  "profile/deleteUser",
  async (userId) => {

    const headers = await createAuthorizedHeaders();
    console.log(userId,headers, {
      headers: {
        ...headers.headers,
        "Content-Type": "application/json",
      }}, '"Content-Type": "application/json');

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/user/${userId}`,
        {
          headers: {
            ...headers.headers,
          //  "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      throw error.response;
    }
  }
);

export const fetchUserLogistics = createAsyncThunk(
  "profile/fetchUserLogistics",
  async ({logisticsId} , { getState }) => {
    const headers = await createAuthorizedHeaders();

    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/logistics/${logisticsId}`,
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
  "profile/updateProfileLogistics",
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

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    success: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
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
      })
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
      });
  },
});

export default profileSlice.reducer;
