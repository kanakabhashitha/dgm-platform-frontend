import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  loading: false,
  error: null,
  realTimeData: [],
};

const deviceDataSlice = createSlice({
  name: "device",
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
    getRealTimeData: (state, action) => {
      state.realTimeData = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { apiRequested, apiRequestFailed, getRealTimeData } =
  deviceDataSlice.actions;
export default deviceDataSlice.reducer;

const url = "/data";

export const loadRealTimeData = () =>
  apiCallBegan({
    url: `${url}/latest`,
    method: "GET",
    onStart: apiRequested.type,
    onSuccess: getRealTimeData.type,
    onError: apiRequestFailed.type,
  });
