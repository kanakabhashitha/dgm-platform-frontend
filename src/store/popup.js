import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowPopup: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.isShowPopup = true;
    },
    hidePopup: (state) => {
      state.isShowPopup = false;
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
