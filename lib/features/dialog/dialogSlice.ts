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

export type dialogEditCategoryState = {
  editCategoryToggle: boolean;
};

export type dialogDeleteCategoryState = {
  deleteCategoryToggle: boolean;
};

export type CategoryState = {
  categoryId: number;
  categoryName: string;
};

export type dialogAddCategoryState = {
  addCategoryToggle: boolean;
};

type allState = dialogLoginState &
  dialogDeleteProductState &
  productID &
  dialogEditStatusState &
  orderStatusState &
  orderIdState &
  dialogDeleteOrderState &
  dialogEditCategoryState &
  dialogDeleteCategoryState &
  dialogCreateReviewState &
  CategoryState &
  dialogAddCategoryState;

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
  deleteCategoryToggle: false,
  editCategoryToggle: false,
  categoryId: 0,
  categoryName: "",
  addCategoryToggle: false,
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
    setDialogEditCategoryOpen: (state) => {
      state.editCategoryToggle = true;
    },
    setDialogEditCategoryClose: (state) => {
      state.editCategoryToggle = false;
    },
    setCategory: (
      state,
      action: PayloadAction<{ categoryId: number; categoryName: string }>
    ) => {
      state.categoryId = action.payload.categoryId ?? 0;
      state.categoryName = action.payload.categoryName;
    },
    setDialogDeleteCategoryOpen: (state) => {
      state.deleteCategoryToggle = true;
    },
    setDialogDeleteCategoryClose: (state) => {
      state.deleteCategoryToggle = false;
    },
    setDialogAddCategoryOpen: (state) => {
      state.addCategoryToggle = true;
    },
    setDialogAddCategoryClose: (state) => {
      state.addCategoryToggle = false;
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
  setDialogEditCategoryClose,
  setDialogEditCategoryOpen,
  setCategory,
  setDialogDeleteCategoryClose,
  setDialogDeleteCategoryOpen,
  setDialogAddCategoryOpen,
  setDialogAddCategoryClose,
} = dialogSlice.actions;

export default dialogSlice.reducer;
