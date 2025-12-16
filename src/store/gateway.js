import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  loading: false,
  error: null,
  gateways: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  totalPages: 0,
};
const gatewaySlice = createSlice({
  name: "gateway",
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
    getGatewayData: (state, action) => {
      state.gateways = action.payload.data;
      console.log(action.payload.data);
      state.currentPage = action.payload.pagination.currentPage;
      state.itemsPerPage = action.payload.pagination.itemsPerPage;
      state.totalItems = action.payload.pagination.totalItems;
      state.totalPages = action.payload.pagination.totalPages;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { apiRequested, apiRequestFailed, getGatewayData } =
  gatewaySlice.actions;
export default gatewaySlice.reducer;

const url = "/gateways";

export const loadGatewayData = (pageNumber, pageSize) =>
  apiCallBegan({
    url,
    method: "GET",
    onStart: apiRequested.type,
    onSuccess: getGatewayData.type,
    onError: apiRequestFailed.type,
  });
