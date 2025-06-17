import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type filterCategoryState = {
  category: string[] | undefined;
};

export type filterSizeState = {
  size: string[] | undefined;
};

type allState = filterCategoryState & filterSizeState;

export const initialState: allState = {
  category: undefined,
  size: undefined,
};

// NOTE - create slice

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string[]>) => {
      state.category = action.payload;
    },
    setSizeFilter: (state, action: PayloadAction<string[]>) => {
      state.size = action.payload;
    },
  },
});

export const { setCategoryFilter, setSizeFilter } = filterSlice.actions;

export default filterSlice.reducer;
