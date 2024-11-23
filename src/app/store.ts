import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "../store/slices/categorySlice.ts";
import { transactionReducer } from "../store/slices/transactionSlice.ts";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
