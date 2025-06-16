import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type dialogLoginState = {
  loginToggle: boolean;
};

export type dialogDeleteProductState = {
  deleteProductToggle: boolean;
};

export type productID = {
  productID: number | undefined;
  productName: string;
};

type allState = dialogLoginState & dialogDeleteProductState & productID;

export const initialState: allState = {
  loginToggle: false,
  deleteProductToggle: false,
  productID: undefined,
  productName: "",
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
    setDialogDeleteProductOpen: (state) => {
      state.deleteProductToggle = true;
    },
    setDialogDeleteProductClose: (state) => {
      state.deleteProductToggle = false;
    },
    setProductID: (state, action: PayloadAction<number>) => {
      state.productID = action.payload;
    },
    setProductName: (state, action: PayloadAction<string>) => {
      state.productName = action.payload;
    },
  },
});

export const {
  setDialogLoginClose,
  setDialogLoginOpen,
  setDialogDeleteProductOpen,
  setDialogDeleteProductClose,
  setProductID,
  setProductName,
} = dialogSlice.actions;

export default dialogSlice.reducer;
