import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserIdState = {
  userId: number | undefined;
};

type allState = UserIdState;

export const initialState: allState = {
  userId: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number | undefined>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
