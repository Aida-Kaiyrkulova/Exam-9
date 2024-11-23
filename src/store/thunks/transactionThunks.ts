import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Transaction } from "../../types";

export const fetchTransactions = createAsyncThunk<Transaction[]>(
  "transactions/fetchTransactions",
  async () => {
    const response = await axiosApi.get("/transactions.json");
    const data = response.data;
    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  },
);

export const addTransaction = createAsyncThunk<
  Transaction,
  Omit<Transaction, "id">,
  { rejectValue: string }
>("transactions/addTransaction", async (transaction, { rejectWithValue }) => {
  try {
    const createdAt = new Date().toISOString();
    const response = await axiosApi.post("/transactions.json", {
      ...transaction,
      createdAt,
    });
    return {
      id: response.data.name,
      ...transaction,
      createdAt,
    };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return rejectWithValue("Failed to add transaction");
  }
});

export const deleteTransaction = createAsyncThunk<string, string>(
  "transactions/deleteTransaction",
  async (id) => {
    await axiosApi.delete(`/transactions/${id}.json`);
    return id;
  },
);

export const editTransaction = createAsyncThunk<
  Transaction,
  { id: string; amount: number; category: string; type: string },
  { rejectValue: string }
>("transactions/editTransaction", async ({ id, amount, category, type }) => {
  try {
    await axiosApi.put(`/transactions/${id}.json`, { amount, category, type });
    return { id, amount, category, type };
  } catch (error) {
    console.error("Error editing transaction:", error);
    throw new Error("Failed to update transaction");
  }
});
