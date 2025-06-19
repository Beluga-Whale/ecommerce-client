import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type variantItem = {
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

type allState = cartListState;

export const initialState: allState = {
  cartList: [],
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
  },
});

export const { setCartItem } = cartSlice.actions;

export default cartSlice.reducer;
