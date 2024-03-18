import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthorizedHeaders } from "./Payments";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

const initialState = {
  withdrawalStatus: "idle",
  withdrawalData: null,
  error: null,
};

const withdrawalAPIURL = `${API_BASE_URL}/wallet/withdraw-wallet`;

export const initializeWithdrawal = createAsyncThunk(
  "withdrawal/initializeWithdrawal",
  async ({
    amount,
    currency,
    transactionDescription,
    bankCode,
    userAccountNumber,
  }) => {
    try {
      const headers = await createAuthorizedHeaders();

      const response = await axios.post(
        withdrawalAPIURL,
        {
          amount,
          currency,
          bankCode,
          userAccountNumber,
          transactionDescription,
        },
        {
          headers: headers.headers,
        }
      );

      return response.data;
    } catch (error) {
      // checkForUnauthorizedStatus(error?.response);

      throw error.response;
    }
  }
);

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeWithdrawal.pending, (state) => {
        state.withdrawalStatus = "loading";
        state.error = null;
      })
      .addCase(initializeWithdrawal.fulfilled, (state, action) => {
        state.withdrawalStatus = "succeeded";
        state.withdrawalData = action.payload;
      })
      .addCase(initializeWithdrawal.rejected, (state, action) => {
        state.withdrawalStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default withdrawalSlice.reducer;
