import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const storedToken = storedUser ? storedUser.token : null;

const initialState = {
  loading: false,
  error: null,
  user: storedUser,
  token: storedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    apiRequested: (state) => {
      state.loading = true;
      state.error = null;
    },

    apiRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    loginUser: (state, action) => {
      const userData = action.payload;
      state.user = userData;
      state.token = userData.token;
      state.loading = false;
      state.error = null;

      localStorage.setItem("user", JSON.stringify(userData));
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("user");
    },
  },
});

export const { apiRequested, apiRequestFailed, loginUser, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;

// API call for user login
const url = "/user";
export const userLogin = (credentials) =>
  apiCallBegan({
    url: `${url}/login`,
    method: "POST",
    data: credentials,
    onStart: apiRequested.type,
    onSuccess: loginUser.type,
    onError: apiRequestFailed.type,
  });
