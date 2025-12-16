import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  loading: false,
  error: null,
  user: storedUser,
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
      state.loading = false;
      state.error = null;

      localStorage.setItem("user", JSON.stringify(userData));
    },

    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("user");
    },
  },
});

export const { apiRequested, apiRequestFailed, loginUser, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;

const url = "/auth";

export const userLogin = (credentials) =>
  apiCallBegan({
    url: `${url}/login`,
    method: "POST",
    data: credentials,
    onStart: apiRequested.type,
    onSuccess: loginUser.type,
    onError: apiRequestFailed.type,
  });
