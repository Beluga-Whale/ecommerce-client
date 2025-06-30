import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type variantItem = {
  variantId: number;
  quantity: number;
};

export type productItem = {
  productId: number;
  variant: variantItem[];
};

export type cartListState = {
  cartList: productItem[];
};

export type addressDetail = {
  fullName: string;
  phone: string;
  address: string;
  province: string;
  district: string;
  subdistrict: string;
  zipCode: string;
};

export type addressUser = {
  addressDetail: addressDetail | null;
};

export type priceTotalState = {
  priceTotal: number;
};

type allState = cartListState & addressUser & priceTotalState;

export const initialState: allState = {
  cartList: [],
  addressDetail: null,
  priceTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<productItem>) => {
      const existingProduct = state.cartList.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingProduct) {
        // NOTE- เช็ค variantId ว่ามีอยู่ไหม
        action.payload.variant.forEach((newVariant) => {
          const existingVariant = existingProduct.variant.find(
            (v) => v.variantId === newVariant.variantId
          );

          if (existingVariant) {
            // NOTE - ถ้ามีก้ เพิ่มแค่ จำนวน
            existingVariant.quantity += newVariant.quantity;
          } else {
            // NOTE -ไม่มีก็แสดงว่าเป้น size ใหม่
            existingProduct.variant.push(newVariant);
          }
        });
      } else {
        // NOTE - ถ้าเป็นสินค้าใหม่ → เพิ่มเข้าไปทั้งก้อน
        state.cartList.push(action.payload);
      }
    },
    removeCardItem: (
      state,
      action: PayloadAction<{ productId: number; variantId: number }>
    ) => {
      const { productId, variantId } = action.payload;
      const product = state.cartList.find(
        (item) => item.productId === productId
      );
      if (!product) return;

      product.variant = product.variant.filter(
        (variant) => variant.variantId !== variantId
      );

      if (product.variant.length === 0) {
        state.cartList = state.cartList.filter(
          (item) => item.productId !== productId
        );
      }
    },
    deCreaseCartItemQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        variantId: number;
      }>
    ) => {
      const { productId, variantId } = action.payload;

      const product = state.cartList.find(
        (item) => item.productId === productId
      );
      if (!product) return;

      const variant = product.variant.find((v) => v.variantId === variantId);
      if (!variant) return;

      variant.quantity -= 1;
    },
    inCreaseCartItemQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        variantId: number;
      }>
    ) => {
      const { productId, variantId } = action.payload;

      const product = state.cartList.find(
        (item) => item.productId === productId
      );
      if (!product) return;

      const variant = product.variant.find((v) => v.variantId === variantId);
      if (!variant) return;

      variant.quantity += 1;
    },
    setAddress: (state, action: PayloadAction<addressDetail>) => {
      state.addressDetail = action.payload;
    },
    setPriceTotal: (state, action: PayloadAction<number>) => {
      state.priceTotal = action.payload;
    },
    setDefaultCartList: (state) => {
      state.cartList = initialState.cartList;
    },
  },
});

export const {
  setCartItem,
  removeCardItem,
  deCreaseCartItemQuantity,
  inCreaseCartItemQuantity,
  setAddress,
  setPriceTotal,
  setDefaultCartList,
} = cartSlice.actions;

export default cartSlice.reducer;
