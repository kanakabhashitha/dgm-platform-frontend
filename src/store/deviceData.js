import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  loading: false,
  error: null,
  realTimeData: [],
  historicalData: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  totalPages: 0,
  selectedGatewaysFromTreeView: [],
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
    // getRealTimeData: (state, action) => {
    //   state.realTimeData = action.payload.data;
    //   state.loading = false;
    //   state.error = null;
    // },
    getRealTimeData: (state, action) => {
      const org = action.payload.data;
      state.realTimeData = Array.isArray(org) ? org : [org];
      state.loading = false;
      state.error = null;
    },

    getHistoricalData: (state, action) => {
      state.historicalData = action.payload.data;
      state.currentPage = action.payload.pagination.currentPage;
      state.itemsPerPage = action.payload.pagination.itemsPerPage;
      state.totalItems = action.payload.pagination.totalItems;
      state.totalPages = action.payload.pagination.totalPages;
      state.loading = false;
      state.error = null;
    },
    setSelectedGatewaysToTreeView: (state, action) => {
      state.selectedGatewaysFromTreeView = action.payload;
    },
  },
});

export const {
  apiRequested,
  apiRequestFailed,
  getRealTimeData,
  getHistoricalData,
  setSelectedGatewaysToTreeView,
} = deviceDataSlice.actions;
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

export const loadHistoricalData = (pageNumber, pageSize) =>
  apiCallBegan({
    url: `${url}/all-values?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: "GET",
    onStart: apiRequested.type,
    onSuccess: getHistoricalData.type,
    onError: apiRequestFailed.type,
  });
