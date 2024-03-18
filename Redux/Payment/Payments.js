import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

export const createAuthorizedHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  console.log(token, "token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const initializePayment = createAsyncThunk(
  "payment/initializePayment",
  async ({
    amount,
    currency,
    successPageURL,
    transactionDescription,
    logisticsId,
    logisticsName,
    paymentRef,
  }) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const BearerToken = `Bearer ${token}`;

      const response = await axios.post(
        `${API_BASE_URL}/payment/initialize`,
        {
          amount,
          currency,
          successPageURL,
          transactionDescription,
          logisticsId,
          logisticsName,
          paymentRef,
        },
        {
          headers: {
            Authorization: BearerToken,
          },
        }
      );
      console.log(response, "token");
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      console.log(error, "err");
      throw error.response;
    }
  }
);

export const initializeWalletFunding = createAsyncThunk(
  "payment/initializeWalletFunding",
  async ({ amount, currency, successPageURL, transactionDescription }) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.post(
        `${API_BASE_URL}/payment/initialize/wallet-funding`,
        {
          amount,
          currency,
          successPageURL,
          transactionDescription,
        },
        headers
      );
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const initializeWithdrawal = createAsyncThunk(
  "payment/initializeWithdrawal",
  async ({ amount, currency, bankCode, userAccountNumber }) => {
    try {
      const headers = await createAuthorizedHeaders();

      const response = await axios.post(
        `${API_BASE_URL}/wallet/withdraw-wallet`,
        {
          amount,
          currency,
          bankCode,
          userAccountNumber,
        },
        headers
      );
      return response;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const payFromWallet = createAsyncThunk(
  "payment/payFromWallet",
  async ({
    amount,
    delivery,
    currency,
    paymentRef,
    transactionDescription,
  }) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.post(
        `${API_BASE_URL}/payment/wallet-payment`,
        {
          amount,
          delivery,
          currency,
          transactionDescription,
          paymentRef,
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
      throw error.response;
    }
  }
);

export const getBanks = createAsyncThunk("payment/getBanks", async () => {
  try {
    const headers = await createAuthorizedHeaders();
    const response = await axios.get(`${API_BASE_URL}/payment/select-bank/NG`, {
      headers: headers.headers,
    });
  } catch (error) {
    //checkForUnauthorizedStatus(error?.response);
    throw error.response;
  }
});

export const OrdinaryUserPaymentHistory = createAsyncThunk(
  "payment/OrdinaryUserPaymentHistory",
  async (ordinaryUserId) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/payment/user/ordinary/${ordinaryUserId}`,
        headers
      );

      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const LogisticsUserPaymentHistory = createAsyncThunk(
  "payment/LogisticsUserPaymentHistory",
  async (logisticsUserId) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/payment/user/logistics/${logisticsUserId}`,
        headers
      );

      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentId) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/verify/${paymentId}`,
        headers
      );
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const getUserReference = createAsyncThunk(
  "payment/getUserReference",
  async (referenceId) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/user/reference/${referenceId}`,
        headers
      );
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const getOrdinaryUser = createAsyncThunk(
  "payment/getOrdinaryUser",
  async (userId) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/user/ordinary/${userId}`,
        headers
      );
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const getAllPayments = createAsyncThunk(
  "payment/getAllPayments",
  async () => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(`${API_BASE_URL}`, headers);
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const walletPayment = createAsyncThunk(
  "payment/walletPayment",
  async ({ amount, deliveryId, transactionDescription }) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.post(
        `${API_BASE_URL}/wallet-payment`,
        {
          amount,
          deliveryId,
          transactionDescription,
        },
        headers
      );
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

export const fundWallet = createAsyncThunk("payment/fundWallet", async () => {
  try {
    const headers = await createAuthorizedHeaders();
    const response = await axios.get(
      `${API_BASE_URL}/wallet/check-balance`,

      headers
    );

    return response.data;
  } catch (error) {
    //checkForUnauthorizedStatus(error?.response);
    throw error.response;
  }
});

export const walletHistory = createAsyncThunk(
  "payment/walletHistory",
  async () => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL}/wallet/user/wallet-history`,

        headers
      );

      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response;
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    initializing: false,
    initializedPayment: null,
    initializingFunding: false,
    initializedPaymentFunding: null,
    initializingWithdrawal: false,
    initializedWithdrawal: null,
    payingFromWallet: false,
    paidFromWallet: null,
    verifying: false,
    verifiedPayment: null,
    fetchingUserReference: false,
    userReference: null,
    fetchingOrdinaryUser: false,
    ordinaryUser: null,
    fetchingPayments: false,
    payments: [],
    walletPaying: false,
    walletPaymentResult: null,
    ordinaryUserHistory: false,
    ordinaryUserHistoryResult: null,
    LogisticsUserHistory: false,
    LogisticsUserHistoryResult: null,
    fundWalletResults: null,
    fundWallets: false,
    walletHistoryResults: null,
    walletHistories: false,
    success: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializePayment.pending, (state) => {
        state.initializing = true;
      })
      .addCase(initializePayment.fulfilled, (state, action) => {
        state.initializing = false;
        state.initializedPayment = action.payload;
      })
      .addCase(initializePayment.rejected, (state) => {
        state.initializing = false;
      })
      .addCase(payFromWallet.pending, (state) => {
        state.payingFromWallet = true;
      })
      .addCase(payFromWallet.fulfilled, (state, action) => {
        state.payingFromWallet = false;
        state.paidFromWallet = action.payload;
      })
      .addCase(payFromWallet.rejected, (state) => {
        state.payingFromWallet = false;
      })
      .addCase(initializeWalletFunding.pending, (state) => {
        state.initializingFunding = true;
      })
      .addCase(initializeWalletFunding.fulfilled, (state, action) => {
        state.initializingFunding = false;
        state.initializedPaymentFunding = action.payload;
      })
      .addCase(initializeWalletFunding.rejected, (state) => {
        state.initializingFunding = false;
      })
      .addCase(initializeWithdrawal.pending, (state) => {
        state.initializingWithdrawal = true;
      })
      .addCase(initializeWithdrawal.fulfilled, (state, action) => {
        state.initializingWithdrawal = false;
        state.initializedWithdrawal = action.payload;
      })
      .addCase(initializeWithdrawal.rejected, (state) => {
        state.initializingWithdrawal = false;
        state.error = action.payload;
      })
      .addCase(getBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(getBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.verifying = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verifying = false;
        state.verifiedPayment = action.payload;
      })
      .addCase(verifyPayment.rejected, (state) => {
        state.verifying = false;
      })
      .addCase(getUserReference.pending, (state) => {
        state.fetchingUserReference = true;
      })
      .addCase(getUserReference.fulfilled, (state, action) => {
        state.fetchingUserReference = false;
        state.userReference = action.payload;
      })
      .addCase(getUserReference.rejected, (state) => {
        state.fetchingUserReference = false;
      })
      .addCase(getOrdinaryUser.pending, (state) => {
        state.fetchingOrdinaryUser = true;
      })
      .addCase(getOrdinaryUser.fulfilled, (state, action) => {
        state.fetchingOrdinaryUser = false;
        state.ordinaryUser = action.payload;
      })
      .addCase(getOrdinaryUser.rejected, (state) => {
        state.fetchingOrdinaryUser = false;
      })
      .addCase(getAllPayments.pending, (state) => {
        state.fetchingPayments = true;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.fetchingPayments = false;
        state.payments = action.payload;
      })
      .addCase(getAllPayments.rejected, (state) => {
        state.fetchingPayments = false;
      })
      .addCase(walletPayment.pending, (state) => {
        state.walletPaying = true;
      })
      .addCase(walletPayment.fulfilled, (state, action) => {
        state.walletPaying = false;
        state.walletPaymentResult = action.payload;
      })
      .addCase(walletPayment.rejected, (state) => {
        state.walletPaying = false;
      })
      .addCase(OrdinaryUserPaymentHistory.pending, (state) => {
        state.ordinaryUserHistory = true;
      })
      .addCase(OrdinaryUserPaymentHistory.fulfilled, (state, action) => {
        state.ordinaryUserHistory = false;
        state.ordinaryUserHistoryResult = action.payload;
      })
      .addCase(OrdinaryUserPaymentHistory.rejected, (state) => {
        state.ordinaryUserHistory = false;
      })
      .addCase(fundWallet.pending, (state) => {
        state.fundWallets = true;
      })
      .addCase(fundWallet.fulfilled, (state, action) => {
        state.fundWallets = false;
        state.fundWalletResults = action.payload;
      })
      .addCase(fundWallet.rejected, (state) => {
        state.fundWallets = false;
      })
      .addCase(walletHistory.pending, (state) => {
        state.walletHistories = true;
      })
      .addCase(walletHistory.fulfilled, (state, action) => {
        state.walletHistories = false;
        state.walletHistoryResults = action.payload;
      })
      .addCase(walletHistory.rejected, (state) => {
        state.walletHistories = false;
      })
      .addCase(LogisticsUserPaymentHistory.pending, (state) => {
        state.ordinaryUserHistory = true;
      })
      .addCase(LogisticsUserPaymentHistory.fulfilled, (state, action) => {
        state.LogisticsUserHistory = false;
        state.LogisticsUserHistoryResult = action.payload;
      })
      .addCase(LogisticsUserPaymentHistory.rejected, (state) => {
        state.LogisticsUserHistory = false;
      });
  },
});

export default paymentSlice.reducer;
