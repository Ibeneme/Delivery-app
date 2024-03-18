import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAuthorizedHeaders } from "../Payment/Payments";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

export const fetchUserLogisticsHere = createAsyncThunk(
  "profileTwo/fetchUserLogisticsHere",
  async ({ logisticsId }, { getState }) => {
    const state = getState();
    const token = state.auth.refreshToken.accessToken;

    const createAuthorizedHeaders = async () => {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    };
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/users/logistics/${logisticsId}`,
        headers
      );

      return response.data;
    } catch (error) {
        //checkForUnauthorizedStatus(error?.response);
      throw error.response 
    }
  }
);

export const generateApiKey = createAsyncThunk(
  "profileTwo/generateApiKey",
  async (logisticsId, { getState }) => {
    const headers = await createAuthorizedHeaders();

    const accessToken = getState().auth.refreshToken.accessToken;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/logistics/apikey/generate-apikey/${logisticsId}`,{},
        {
          headers: {
            ...headers.headers,
          },
        }
      );
      return response.data;
    } catch (error) {
        //checkForUnauthorizedStatus(error?.response);
      throw error.response 
    }
  }
);

const profileTwoSlice = createSlice({
  name: "profileTwo",
  initialState: {
    loading: false,
    error: null,
    success: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogisticsHere.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserLogisticsHere.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(fetchUserLogisticsHere.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(generateApiKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(generateApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileTwoSlice.reducer;
