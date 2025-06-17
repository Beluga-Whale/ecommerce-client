import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "./features/dialog/dialogSlice";
import filterReducer from "./features/filter/filerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      dialog: dialogReducer,
      filter: filterReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
