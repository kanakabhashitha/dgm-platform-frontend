import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isViewModelOpen: false,
  selectedItem: null,
  mode: "view",
};

const toggleSlice = createSlice({
  name: "modelToggler",
  initialState,
  reducers: {
    openViewModel: (state, action) => {
      state.isViewModelOpen = true;
      state.selectedItem = action.payload;
      state.mode = "view";
    },
    openEditModel: (state, action) => {
      state.isViewModelOpen = true;
      state.selectedItem = action.payload;
      state.mode = "edit";
    },
    closeViewModel: (state) => {
      state.isViewModelOpen = false;
      state.selectedItem = null;
      state.mode = "view";
    },
  },
});

export const { openViewModel, openEditModel, closeViewModel } =
  toggleSlice.actions;
export default toggleSlice.reducer;
