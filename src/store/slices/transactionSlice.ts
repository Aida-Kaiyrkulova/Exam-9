import { Transaction } from "../../types";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
} from "../thunks/transactionThunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TransactionState = {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
};

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load transactions";
      })
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.loading = false;
          state.transactions.push(action.payload);
        },
      )
      .addCase(addTransaction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteTransaction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.transactions = state.transactions.filter(
            (transaction) => transaction.id !== action.payload,
          );
        },
      )
      .addCase(deleteTransaction.rejected, (state) => {
        state.loading = false;
      })

      .addCase(editTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        );
      })
      .addCase(editTransaction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
export const {} = transactionSlice.actions;
