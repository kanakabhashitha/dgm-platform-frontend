import { configureStore } from "@reduxjs/toolkit";

import error from "../store/middleware/error";
import api from "./middleware/api";
import authReducer from "./auth";
import groupReducer from "./group";
import deviceDataReducer from "./deviceData";
import popupSliceReducer from "./popup";
import gatewaySliceReducer from "./gateway";
import toggleReducer from "./toggle";

const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    device: deviceDataReducer,
    popup: popupSliceReducer,
    gateway: gatewaySliceReducer,
    modelToggler: toggleReducer,
  },

  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api, error],
});

export default store;
