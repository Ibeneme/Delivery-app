import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthorizedHeaders } from "./Payments";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";


export const fetchSelectedBank = createAsyncThunk(
  "banks/fetchSelectedBank",
  async () => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(
        `${API_BASE_URL }/payment/select-bank/NG`,
        headers
      );
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw error.response 
    }
  }
);

const banksSlice = createSlice({
  name: "banks",
  initialState: {
    selectedBank: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedBank: (state, action) => {
      state.selectedBank = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedBank.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedBank.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBank = action.payload;
      })
      .addCase(fetchSelectedBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { setSelectedBank } = banksSlice.actions;

export default banksSlice.reducer;
