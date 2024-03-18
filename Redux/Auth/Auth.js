import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import qs from "qs";
import { API_BASE_URL } from "../BaseUrl/Baseurl";

const initialState = {
  user: null,
  loading: false,
  error: null,
  userloaded: null,
  registerUser: null,
  refreshToken: null,
  success: [],
};

export const createAuthorizedHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");

  console.log(token, "tokenWithoutQuotes");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register/ordinary`,
        userData
      );
      console.log(response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginData
      );
      console.log(response?.data, "RESPONSE-DATA");
      const accessToken = response?.data.token.accessToken;
      const refreshToken = response?.data.token.refreshToken;
      const token = response?.data.token;
      console.log(response?.data.token.refreshToken, "response");
      try {
        const decodedToken = jwtDecode(accessToken);
        const decodedRefreshToken = jwtDecode(refreshToken);
        await AsyncStorage.setItem("thisUser", JSON.stringify(decodedToken));
        const tokenJSONString = JSON.stringify(accessToken);
        await AsyncStorage.setItem("accessToken", accessToken);
        console.log("Access token stored in AsyncStorage:", tokenJSONString);
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        console.log(storedAccessToken, "AsyncStorage.getItem(accessToken)");
        console.log("accessTokenaccessTokenaccessToken", accessToken);
        console.log(token, "stokenn");
        return token;
      } catch (error) {
        console.error("Error storing access token:", error);
      }

      console.log(
        response?.data.token.accessToken,
        "accessTokenaccessTokenaccessToken"
      );
      console.log(response.data, "styyyy");
      return response?.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const refreshingToken = createAsyncThunk(
  "auth/refreshingToken",
  async (refreshToken, thunkAPI) => {
    try {
      const requestBody = qs.stringify({
        refreshToken: refreshToken,
      });
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh-token`,
        requestBody,
        config
      );
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const registerBusiness = createAsyncThunk(
  "auth/register/business",
  async (businessData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register/business`,
        businessData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerLogistics = createAsyncThunk(
  "auth/register/logistics",
  async (logisticsData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register/logistics`,
        logisticsData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    const headers = createAuthorizedHeaders();
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, headers);

      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forget-password`,
        userData
      );

      const responseData = response.data;
      return responseData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (googleData, thunkAPI) => {
    try {
      const response = await axios.get("${API_BASE_URL}/auth/google", {
        params: googleData,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const googleRegistrationOrdinary = createAsyncThunk(
  "auth/googleRegistrationOrdinary",
  async (userData) => {
    console.log(userData, "lol");
    try {
      const response = await axios.post(
        "https://backend.quicklogisticshub.com/api/auth/google/registration/ordinary/",
        userData
      );
      console.log(response?.data, "RESPONSE-DATA");
      const accessToken = response?.data.token.accessToken;
      const refreshToken = response?.data.token.refreshToken;
      const token = response?.data.token;
      console.log(response?.data.token.refreshToken, "response");
      try {
        const decodedToken = jwtDecode(accessToken);

        const decodedRefreshToken = jwtDecode(refreshToken);

        await AsyncStorage.setItem("thisUser", JSON.stringify(decodedToken));

        const tokenJSONString = JSON.stringify(accessToken);
        await AsyncStorage.setItem("accessToken", accessToken);

        console.log("Access token stored in AsyncStorage:", tokenJSONString);
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        console.log(storedAccessToken, "AsyncStorage.getItem(accessToken)");
        console.log("accessTokenaccessTokenaccessToken", accessToken);
        console.log(token, "stokenn");
        return token;
      } catch (error) {
        console.error("Error storing access token:", error);
      }

      console.log(
        response?.data.token.accessToken,
        "accessTokenaccessTokenaccessToken"
      );
      console.log(response.data, "styyyy");
      return response?.data;
    } catch (error) {
      console.log(JSON.stringify(error.response, null, 3));
      return { error: error?.response?.status || "An error occurred" };
    }
  }
);

export const googleRegistrationLogistics = createAsyncThunk(
  "auth/googleRegistrationLogistics",
  async (userData) => {
    console.log(userData, "lol");
    try {
      const response = await axios.post(
        "https://backend.quicklogisticshub.com/api/auth/google/registration/logistics/",
        userData
      );
      console.log(response?.data, "RESPONSE-DATA");
      const accessToken = response?.data.token.accessToken;
      const refreshToken = response?.data.token.refreshToken;
      const token = response?.data.token;
      console.log(response?.data.token.refreshToken, "response");
      try {
        const decodedToken = jwtDecode(accessToken);

        const decodedRefreshToken = jwtDecode(refreshToken);

        await AsyncStorage.setItem("thisUser", JSON.stringify(decodedToken));

        const tokenJSONString = JSON.stringify(accessToken);
        await AsyncStorage.setItem("accessToken", accessToken);

        console.log("Access token stored in AsyncStorage:", tokenJSONString);
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        console.log(storedAccessToken, "AsyncStorage.getItem(accessToken)");
        console.log("accessTokenaccessTokenaccessToken", accessToken);
        console.log(token, "stokenn");
        return token;
      } catch (error) {
        console.error("Error storing access token:", error);
      }

      console.log(
        response?.data.token.accessToken,
        "accessTokenaccessTokenaccessToken"
      );
      console.log(response.data, "styyyy");
      return response?.data;
    } catch (error) {
      console.log(JSON.stringify(error.response, null, 3));
      return { error: error?.response?.status || "An error occurred" };
    }
  }
);

export const googleRegistrationBusiness = createAsyncThunk(
  "auth/googleRegistrationBusiness",
  async (businessData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/auth/google/registration/business`,
        { params: businessData }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const googleUserLogin = createAsyncThunk(
  "auth/googleUserLogin",
  async (userData) => {
    console.log(userData, "lol");
    try {
      const response = await axios.post(
        "https://backend.quicklogisticshub.com/api/auth/google/user/login",
        userData
      );
      console.log(response?.data, "RESPONSE-DATA");
      const accessToken = response?.data.token.accessToken;
      const refreshToken = response?.data.token.refreshToken;
      const token = response?.data.token;
      console.log(response?.data.token.refreshToken, "response");
      try {
        const decodedToken = jwtDecode(accessToken);

        const decodedRefreshToken = jwtDecode(refreshToken);

        await AsyncStorage.setItem("thisUser", JSON.stringify(decodedToken));

        const tokenJSONString = JSON.stringify(accessToken);
        await AsyncStorage.setItem("accessToken", accessToken);

        console.log("Access token stored in AsyncStorage:", tokenJSONString);
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        console.log(storedAccessToken, "AsyncStorage.getItem(accessToken)");
        console.log("accessTokenaccessTokenaccessToken", accessToken);
        console.log(token, "stokenn");
        return token;
      } catch (error) {
        console.error("Error storing access token:", error);
      }

      console.log(
        response?.data.token.accessToken,
        "accessTokenaccessTokenaccessToken"
      );
      console.log(response.data, "styyyy");
      return response?.data;
    } catch (error) {
      console.log(JSON.stringify(error.response, null, 3));
      return { error: error?.response?.status || "An error occurred" };
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ userId, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const headers = await createAuthorizedHeaders();
      console.log(headers, "yeahh");
      console.log(userId, currentPassword, newPassword, "yeahh");

      const formData = new URLSearchParams();
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);

      const data = {
        currentPassword,
        newPassword,
      };

      const response = await axios.post(
        `${API_BASE_URL}/auth/change-password/${userId}`,
        new URLSearchParams(data).toString(),
        {
          headers: headers.headers,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      );
      console.log(response?.data), "sjs";
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUs: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = jwtDecode(action.payload.accessToken);
        state.refreshToken = action?.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerBusiness.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUser = action.payload;
      })
      .addCase(registerBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerLogistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerLogistics.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUser = action.payload;
      })
      .addCase(registerLogistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(changeEmail.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(changeEmail.fulfilled, (state) => {
      //   state.loading = false;
      // })
      // .addCase(changeEmail.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(googleRegistrationOrdinary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleRegistrationOrdinary.fulfilled, (state, action) => {
        state.loading = false;
        state.user = jwtDecode(action.payload.accessToken);
        state.refreshToken = action?.payload;
      })
      .addCase(googleRegistrationOrdinary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(googleRegistrationLogistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleRegistrationLogistics.fulfilled, (state, action) => {
        state.loading = false;
        state.user = jwtDecode(action.payload.accessToken);
        state.refreshToken = action?.payload;
      })
      .addCase(googleRegistrationLogistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(googleUserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = jwtDecode(action.payload.accessToken);
        state.refreshToken = action?.payload;
      })
      .addCase(googleUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(googleRegistrationBusiness.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleRegistrationBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleRegistrationBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshingToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshingToken.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        {
          console.log(action.payload, state.success, "koko");
        }
      })
      .addCase(refreshingToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, logoutUs } = authSlice.actions;
export default authSlice.reducer;
