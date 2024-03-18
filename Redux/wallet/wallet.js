import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

const createAuthorizedHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  const tokenWithoutQuotes = token.slice(1, -1);
  return {
    headers: {
      Authorization: `Bearer ${tokenWithoutQuotes}`,
    },
  };
};

export const fundWallet = createAsyncThunk(
  "payment/fundWallet",
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
     // checkForUnauthorizedStatus(error?.response);
      throw error.response 
    }
  }
);



const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    initializing: false,
    initializedPayment: null,
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
      });
  },
});

export default paymentSlice.reducer;
