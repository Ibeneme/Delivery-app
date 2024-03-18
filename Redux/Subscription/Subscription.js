// apiSlice.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

const createAuthorizedHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const initialState = {
  apiKeyData: null,
  apiKeyHistory: [],
  generatedApiKey: null,
  walletUpgradeResponse: null,
  loading: false,
  error: null,
};

export const receiveApiKey = createAsyncThunk(
  "api/receiveApiKey",
  async ({
    logisticsCompanyId,
    receivedSecretKey,
    receivedAccessKey,
    receivedApiKey,
  }) => {
    try {
      const headers = await createAuthorizedHeaders();

      const response = await axios.put(
        `${API_BASE_URL}/users/logistics/apikey/receive-apikey/${logisticsCompanyId}`,
        {
          receivedsecretKey: receivedSecretKey,
          receivedaccessKey: receivedAccessKey,
          receivedapiKey: receivedApiKey,
        },
        {
          headers: {
            ...headers.headers,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error;
    }
  }
);

export const getApiKeyHistory = createAsyncThunk(
  "api/getApiKeyHistory",
  async (logisticsCompanyId) => {
    try {
      const headers = await createAuthorizedHeaders();

      const response = await axios.get(
        `${API_BASE_URL}/users/logistics/apikey/history/logistics/${logisticsCompanyId}`,
        {
          headers: {
            ...headers.headers,
          },
        }
      );

      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error;
    }
  }
);

export const generateApiKey = createAsyncThunk(
  "api/generateApiKey",
  async (logisticsId) => {
    const headers = await createAuthorizedHeaders();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/logistics/apikey/generate-apikey/${logisticsId}`,
        {
          headers: {
            ...headers.headers,
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

export const upgradeWalletSubscription = createAsyncThunk(
  "api/upgradeWalletSubscription",
  async ({ amount, subscriptionPlan, currency, transactionDescription }) => {
    try {
      const headers = await createAuthorizedHeaders();

      const response = await axios.post(
        `${API_BASE_URL}/payment/plan-upgrade-wallet/subscription/logistics`,
        {
          amount,
          subscriptionPlan,
          currency,
          transactionDescription,
        },
        {
          headers: {
            ...headers.headers,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data, "f");
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      console.log(error.response, "rrr");
      throw error;
    }
  }
);

export const upgradeLogisticsPlan = createAsyncThunk(
  "api/upgradeLogisticsPlan",
  async ({
    amount,
    subscriptionPlan,
    currency,
    successPageURL,
    transactionDescription,
  }) => {
    try {
      const headers = await createAuthorizedHeaders();

      const response = await axios.post(
        `${API_BASE_URL}/payment/logistics-plan/logistics`,
        {
          amount,
          subscriptionPlan,
          currency,
          successPageURL,
          transactionDescription,
        },
        {
          headers: {
            ...headers.headers,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data, "f");
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      console.log(error.response, "rrr");
      throw error;
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(receiveApiKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(receiveApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.apiKeyData = action.payload;
      })
      .addCase(receiveApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getApiKeyHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApiKeyHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.apiKeyHistory = action.payload;
      })
      .addCase(getApiKeyHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(generateApiKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedApiKey = action.payload;
      })
      .addCase(generateApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(upgradeWalletSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(upgradeWalletSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.walletUpgradeResponse = action.payload;
      })
      .addCase(upgradeWalletSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(upgradeLogisticsPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(upgradeLogisticsPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.walletUpgradeResponse = action.payload;
      })
      .addCase(upgradeLogisticsPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
