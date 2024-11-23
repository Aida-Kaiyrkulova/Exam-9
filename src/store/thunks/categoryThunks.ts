import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Category } from "../../types";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await axiosApi.get("/categories.json");
    const data = res.data;
    const categories = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    return categories;
  },
);

export const addCategory = createAsyncThunk<
  Category,
  Category,
  { rejectValue: string }
>("categories/addCategory", async (category, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post("/categories.json", category);
    return { id: response.data.name, ...category };
  } catch (error) {
    console.error("Error adding category:", error);
    return rejectWithValue("Failed to add category");
  }
});

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
    try {
      await axiosApi.put(`/categories/${category.id}.json`, category);
      return category;
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error("Failed to update category");
    }
  },
);
