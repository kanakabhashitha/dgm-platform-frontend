import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  loading: false,
  error: null,
  groups: [],
};

const groupSlice = createSlice({
  name: "group",
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
    getGroup: (state, action) => {
      state.groups = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { apiRequested, apiRequestFailed, getGroup } = groupSlice.actions;
export default groupSlice.reducer;

const url = "/group";

export const loadGroup = () =>
  apiCallBegan({
    url,
    method: "GET",
    onStart: apiRequested.type,
    onSuccess: getGroup.type,
    onError: apiRequestFailed.type,
  });
