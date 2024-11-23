import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Category } from "../../types";

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

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axiosApi.get("/categories.json");
    const data = response.data;
    const categories = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    return categories;
  },
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category: { name: string; type: "income" | "expense" }) => {
    try {
      const response = await axiosApi.post("/categories.json", { ...category });
      const newCategory = {
        id: response.data.name,
        name: category.name,
        type: category.type,
      };

      console.log("New category with ID:", newCategory);
      return newCategory;
    } catch (error) {
      console.error("Error adding category:", error);
      throw new Error("Failed to add category");
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string) => {
    await axiosApi.delete(`/categories/${id}.json`);
    return id;
  },
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category: Category) => {
    await axiosApi.put(`/categories/${category.id}.json`, {
      name: category.name,
      type: category.type,
    });
    return category;
  },
);

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
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories.push(action.payload);
        },
      )
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        )
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
