import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAuthorizedHeaders } from "../Payment/Payments";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

const initialState = {
  loading: false,
  error: null,
  success: false,
  vehicles: []
};

const url = API_BASE_URL;

export const fetchLogisticsCompanies = createAsyncThunk(
  "delivery/fetchLogisticsCompanies",
  async ({ packageWeight, vehicleType, pickupAddress, deliveryAddress }) => {
    try {
      console.log(vehicleType, pickupAddress);
      const token = await AsyncStorage.getItem("accessToken");
      const BearerToken = `Bearer ${token}`;

      console.log(BearerToken, token, "chiokike");
      const response = await axios.get(
        `${url}/deliveries/logistics-companies?packageWeight=${packageWeight}&pickupAddress=${pickupAddress}&deliveryAddress=${deliveryAddress}&vehicleType=${vehicleType}`,
        {
          headers: {
            Authorization: BearerToken,
          },
        }
      );
      console.log(response, 'reduxres')

      return response?.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      console.log(error?.response, 'reduxrerrores')
      return error?.response;
    }
  },
  {
    serializeError: (error) => {
      return {
        ...error,
        headers: null, // Marking headers as non-serializable
      };
    },
  }
);


export const fetchDeliveryById = createAsyncThunk(
  "delivery/fetchDeliveryById",
  async (deliveryId, { rejectWithValue }) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.get(`${url}/deliveries/${deliveryId}`, {
        headers: {
          ...headers.headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(response.data, "byID");
      return response?.data;
    } catch (error) {
      //checkForUnautho
      console.log(error.response, "sender");
      return rejectWithValue(error?.response);
    }
  }
);

export const deleteDelivery = createAsyncThunk(
  "delivery/deleteDelivery",
  async (deliveryId, { rejectWithValue }) => {
    try {
      const headers = await createAuthorizedHeaders();
      const response = await axios.delete(
        `https://backend.quicklogisticshub.com/api/deliveries/${deliveryId}`,
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDelivery = createAsyncThunk(
  "delivery/updateDelivery",
  async (
    {
      receiverPhoneNumber,
      deliveryId,
      receiverName,
      receiverEmail,
      pickupTime,
    },
    { rejectWithValue }
  ) => {
    try {
      const headers = await createAuthorizedHeaders();

      const response = await axios.put(
        `https://backend.quicklogisticshub.com/api/deliveries/${deliveryId}`,
        {
          receiverPhoneNumber,
          receiverName,
          receiverEmail,
          pickupTime,
        },
        {
          headers: {
            ...headers.headers,
          },
        }
      );
      return response?.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      return rejectWithValue(error?.response);
    }
  }
);

export const fetchAllDeliveries = createAsyncThunk(
  "delivery/fetchAllDeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await createAuthorizedHeaders();

      const response = await axios.get(
        `https://backend.quicklogisticshub.com/api/deliveries/sender`,
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const createDelivery = createAsyncThunk(
  "delivery/createDelivery",
  async (
    data
    //({
    //   receiverPhoneNumber,
    //   pickupAddress,
    //   deliveryAddress,
    //   cost,
    //   packageWeight,
    //   paymentMethod,
    //   receiverName,
    //   receiverEmail,
    //   pickupTime,
    //   logisticsCompanyID,
    //   vehicleID,
    //   pickupCoordinates,
    //   deliveryCoordinates,
    //   pickupPhoneNumber,
    //   pickupName,
  ) => {
    try {
      const headers = await createAuthorizedHeaders();

      // const data = [
      //   {
      //     receiverPhoneNumber,
      //     pickupAddress,
      //     deliveryAddress,
      //     cost,
      //     packageWeight,
      //     paymentMethod,
      //     receiverName,
      //     receiverEmail,
      //     pickupTime,
      //     logisticsCompanyID,
      //     vehicleID,
      //     pickupCoordinates,
      //     deliveryCoordinates,
      //     pickupPhoneNumber,
      //     pickupName,
      //   },
      // ];
      console.log(JSON.stringify(data, null, 3));
      console.log(data, "soooooso");

      // Pass the data as a raw JSON body
      const response = await axios.post(
        "https://backend.quicklogisticshub.com/api/deliveries",
        data, // Send data as the request body
        {
          headers: {
            ...headers.headers,
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );

      console.log(response.data, "reserrrr");
      return response.data;
    } catch (error) {
      console.log(error.response, "errrr");
      console.log(error, "errrrresponse");
      //checkForUnauthorizedStatus(error?.response);
      return error;
    }
  }
);

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogisticsCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchLogisticsCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true
        state.vehicles = action.payload;
      })
      .addCase(fetchLogisticsCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error occurred while signing up.";
        state.success = false;
      })
      .addCase(createDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(createDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchDeliveryById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchDeliveryById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(fetchDeliveryById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Error occurred while fetching delivery.";
        state.success = false;
      })
      .addCase(deleteDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(deleteDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Error occurred while fetching deliveries.";
        state.success = false;
      })
      .addCase(updateDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(updateDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Error occurred while fetching deliveries.";
        state.success = false;
      })

      .addCase(fetchAllDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAllDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(fetchAllDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Error occurred while fetching deliveries.";
        state.success = false;
      });
  },
});

export default deliverySlice.reducer;
