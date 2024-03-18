// pushSubscriptionSlice.js
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthorizedHeaders } from "../Payment/Payments";

const initialState = {
  pushToken: null,
  deviceType: null,
  loading: false,
  error: null,
};

export const subscribeToPushNotifications = createAsyncThunk(
  "push/subscribe",
  async ({ pushToken, deviceType }, { rejectWithValue }) => {
    try {
      const headers = await createAuthorizedHeaders();
      console.log(pushToken, headers, deviceType, "pushnotts"); // Get authorized headers with access token
      // Replace 'your-api-url' with your actual API endpoint
      const response = await axios.put(
        `${API_BASE_URL}/notifications/push/subscribe`,
        { pushToken, deviceType },
        headers
      );
      console.log(response, headers, "pushnott");
      return response.data; // You can return data or response data, depending on your needs
    } catch (error) {
      console.log(error, "pushnotterr");
      return rejectWithValue(error.message);
    }
  }
);

const pushSubscriptionSlice = createSlice({
  name: "pushSubscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToPushNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribeToPushNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.pushToken = action.payload.pushToken;
        state.deviceType = action.payload.deviceType;
      })
      .addCase(subscribeToPushNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pushSubscriptionSlice.reducer;
