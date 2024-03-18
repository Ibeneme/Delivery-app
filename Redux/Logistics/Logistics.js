// logisticsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthorizedHeaders } from "../Auth/Auth";
import { API_BASE_URL } from "../BaseUrl/Baseurl";
import checkForUnauthorizedStatus from "../middleware";

const apiUrl = `${API_BASE_URL}/vehicles`;

export const createVehicle = createAsyncThunk(
  "logistics/createVehicle",
  async ({
    type,
    capacity,
    location,
    isEnabled,
    riderName,
    basePrice,
    riderPhoneNumber,
    pickupDuration,
    deliveryDuration,
    vehicleNumber,
    image,
    name,
  }) => {
    const headers = await createAuthorizedHeaders();
    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("capacity", capacity);
      formData.append("name", name);
      formData.append("location", location);
      formData.append("available", isEnabled);
      formData.append("basePrice", basePrice);
      formData.append("riderName", riderName);
      formData.append("riderPhoneNumber", riderPhoneNumber);
      formData.append("pickupDuration", pickupDuration);
      formData.append("deliveryDuration", deliveryDuration);
      formData.append("vehicleNumber", vehicleNumber);
      formData.append("image", {
        uri: image,
        name: "vvvehiclssse_image.jpg",
        type: "image/jpeg",
      });
      // formData.append("image",
      //  image,
      // );
      console.log(formData, "formdata");
      const response = await axios.post(apiUrl, formData, {
        headers: {
          ...headers.headers,
          "Content-Type": "multipart/form-data",
          //formData: true,
        },
      });
      console.log(response, "formdataresponse");
      return response.data;
    } catch (error) {
      console.log(error, "formdataerror");
      //checkForUnauthorizedStatus(error?.response);
      return error?.response;
    }
  }
);

// export const createVehicle = createAsyncThunk(
//   "logistics/createVehicle",
//   async ({
//     type,
//     capacity,
//     location,
//     isEnabled,
//     riderName,
//     basePrice,
//     riderPhoneNumber,
//     pickupDuration,
//     deliveryDuration,
//     vehicleNumber,
//     image,
//     name,
//   }) => {
//     const headers = await createAuthorizedHeaders();
//     try {
//       const formData = new FormData();
//       formData.append("type", type);
//       formData.append("capacity", capacity);
//       formData.append("name", name);
//       formData.append("location", location);
//       formData.append("available", isEnabled);
//       formData.append("basePrice", basePrice);
//       formData.append("riderName", riderName);
//       formData.append("riderPhoneNumber", riderPhoneNumber);
//       formData.append("pickupDuration", pickupDuration);
//       formData.append("deliveryDuration", deliveryDuration);
//       formData.append("vehicleNumber", vehicleNumber);
//       // formData.append("image", {
//       //   uri: image,
//       //   name: `${
//       //     vehicleNumber + basePrice + riderPhoneNumber + pickupDuration
//       //   }vvvehiclssse_image.jpg`,
//       //   type: "image/jpeg",
//       // });
//       formData.append("image",
//        image,
//       );
//       console.log(formData, "formdata");
//       const response = await axios.post(apiUrl, formData, {
//         headers: {
//           ...headers.headers,
//           "Content-Type": "multipart/form-data",
//           //formData: true,
//         },
//       });
//       console.log(response, "formdataresponse");
//       return response.data;
//     } catch (error) {
//       console.log(error, "formdataerror");
//       //checkForUnauthorizedStatus(error?.response);
//       throw new Error("Failed to create vehicle");
//     }
//   }
// );

export const fetchVehicles = createAsyncThunk(
  "logistics/fetchVehicles",
  async () => {
    const headers = await createAuthorizedHeaders();
    try {
      const response = await axios.get(apiUrl, {
        headers: headers.headers,
      });
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw new Error("Failed to fetch vehicles");
    }
  }
);

export const updateVehicle = createAsyncThunk(
  "logistics/updateVehicle",
  async ({
    id,
    type,
    capacity,
    location,
    isEnabled,
    riderName,
    basePrice,
    riderPhoneNumber,
    pickupDuration,
    deliveryDuration,
    vehicleNumber,
    image,
  }) => {
    const headers = await createAuthorizedHeaders();
    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("capacity", capacity);
      formData.append("location", location);
      formData.append("available", isEnabled.toString());
      formData.append("basePrice", basePrice);
      formData.append("riderName", riderName);
      formData.append("riderPhoneNumber", riderPhoneNumber);
      formData.append("pickupDuration", pickupDuration);
      formData.append("deliveryDuration", deliveryDuration);
      formData.append("vehicleNumber", vehicleNumber);
      formData.append("image", {
        uri: image,
        name: "vvvehiclssse_image.jpg",
        type: "image/jpeg",
      });

      const response = await axios.put(`${apiUrl}/${id}`, formData, {
        headers: {
          ...headers.headers,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      return error?.response;  }
  }
);

export const deleteVehicle = createAsyncThunk(
  "logistics/deleteVehicle",
  async (id) => {
    const headers = await createAuthorizedHeaders();
    try {
      const response = await axios.delete(`${apiUrl}/${id}`, {
        headers: headers.headers,
      });
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw new Error("Failed to delete vehicle");
    }
  }
);

export const getVehicle = createAsyncThunk(
  "logistics/getVehicle",
  async (id) => {
    const headers = await createAuthorizedHeaders();
    try {
      const response = await axios.get(`${apiUrl}/${id}`, {
        headers: headers.headers,
      });
      return response.data;
    } catch (error) {
      //checkForUnauthorizedStatus(error?.response);
      throw new Error("Failed to delete vehicle");
    }
  }
);

export const updateVehicleAvailability = createAsyncThunk(
  "logistics/updateVehicleAvailability",
  async ({ vehicleId, available }) => {
    const headers = await createAuthorizedHeaders();
    try {
      const response = await axios.put(
        `${apiUrl}/${vehicleId}/availability`,
        `available=${available}`,
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
      throw new Error("Failed to update vehicle availability");
    }
  }
);

const logisticsSlice = createSlice({
  name: "logistics",
  initialState: {
    isLoading: false,
    error: null,
    vehicle: null,
    vehicles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.vehicle = action.payload;
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.vehicle = null;
      })
      .addCase(fetchVehicles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.vehicles = [];
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVehicle.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getVehicle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVehicle.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateVehicleAvailability.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVehicleAvailability.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateVehicleAvailability.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default logisticsSlice.reducer;
