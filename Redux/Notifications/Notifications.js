import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthorizedHeaders } from "../Payment/Payments";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

const initialState = {
  notifications: [],
  loading: false,
  error: null,
  success: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/notifications`,
        headers
      );

      return response.data;
    } catch (error) {
      throw error.response;
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.put(
        `${API_BASE_URL}/notifications/mark-read/${notificationId}`,
        null,
        headers
      );
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error;
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.success = false;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(markNotificationAsRead.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export default notificationSlice.reducer;
