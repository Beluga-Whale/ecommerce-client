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

export type dialogEditStatusState = {
  editStatusToggle: boolean;
};

export type orderStatusState = {
  orderId: number;
  status: string;
};

export type dialogDeleteOrderState = {
  deleteOrderToggle: boolean;
};

export type orderIdState = {
  orderIdDelete: number;
};

export type dialogCreateReviewState = {
  createReviewToggle: boolean;
};

type allState = dialogLoginState &
  dialogDeleteProductState &
  productID &
  dialogEditStatusState &
  orderStatusState &
  orderIdState &
  dialogDeleteOrderState &
  dialogCreateReviewState;

export const initialState: allState = {
  loginToggle: false,
  deleteProductToggle: false,
  productID: undefined,
  productName: "",
  editStatusToggle: false,
  orderId: 0,
  status: "",
  orderIdDelete: 0,
  deleteOrderToggle: false,
  createReviewToggle: false,
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
    setDialogEditStatusOpen: (state) => {
      state.editStatusToggle = true;
    },
    setDialogEditStatusClose: (state) => {
      state.editStatusToggle = false;
    },
    setStatusOrder: (
      state,
      action: PayloadAction<{ orderId: number; status: string }>
    ) => {
      state.orderId = action.payload.orderId ?? 0;
      state.status = action.payload.status;
    },
    setDialogDeleteOrderOpen: (state) => {
      state.deleteOrderToggle = true;
    },
    setDialogDeleteOrderClose: (state) => {
      state.deleteOrderToggle = false;
    },
    setOrderIdDelete: (state, action: PayloadAction<number>) => {
      state.orderIdDelete = action.payload;
    },
    setDialogCreateReviewOpen: (state) => {
      state.createReviewToggle = true;
    },
    setDialogCreateReviewClose: (state) => {
      state.createReviewToggle = false;
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
  setDialogEditStatusClose,
  setDialogEditStatusOpen,
  setStatusOrder,
  setDialogDeleteOrderClose,
  setDialogDeleteOrderOpen,
  setOrderIdDelete,
  setDialogCreateReviewClose,
  setDialogCreateReviewOpen,
} = dialogSlice.actions;

export default dialogSlice.reducer;
