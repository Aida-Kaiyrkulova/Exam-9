import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../types";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../thunks/categoryThunks.ts";

type CategoriesState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
};

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.loading = false;
          state.categories.push(action.payload);
        },
      )
      .addCase(addCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.categories = state.categories.filter(
            (category) => category.id !== action.payload,
          );
        },
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.categories.findIndex(
            (category) => category.id === action.payload.id,
          );
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
        },
      );
  },
});

export const categoryReducer = categorySlice.reducer;
export const {} = categorySlice.actions;
