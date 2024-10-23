import { configureStore } from "@reduxjs/toolkit";
import error from "../store/middleware/error";
import api from "./middleware/api";
import authReducer from "./auth";
import groupReducer from "./Group";
import deviceDataReducer from "./deviceData";

const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    device: deviceDataReducer,
  },

  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api, error],
});

export default store;
