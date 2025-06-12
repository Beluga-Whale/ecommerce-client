import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type dialogLoginState = {
  loginToggle: boolean;
};

type allState = dialogLoginState;

export const initialState: allState = {
  loginToggle: false,
};

// NOTE - create Slice
const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setDialogLoginOpen: (state) => {
      state.loginToggle = true;
    },
    setDialogLoginClose: (state) => {
      state.loginToggle = false;
    },
  },
});

export const { setDialogLoginClose, setDialogLoginOpen } = dialogSlice.actions;

export default dialogSlice.reducer;
