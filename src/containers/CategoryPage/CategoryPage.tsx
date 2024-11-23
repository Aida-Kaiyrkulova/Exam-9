import "../../App.css";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCategories,
  updateCategory,
  addCategory,
  deleteCategory,
} from "../../store/slices/categorySlice";
import { Category } from "../../types";
import Modal from "../../components/Modal/Modal";

const CategoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState<"income" | "expense">(
    "income",
  );
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    const newCategory = {
      id: "",
      name: categoryName,
      type: categoryType,
    };
    dispatch(addCategory(newCategory))
      .then(() => {
         setCategoryName("");
        setCategoryType("income");
        setShowModal(false);
      })
      .catch((err) => {
        console.error("Error adding category:", err);
      });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryType(category.type);
    setShowModal(true);
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      dispatch(
        updateCategory({
          ...editingCategory,
          name: categoryName,
          type: categoryType,
        }),
      );
      setCategoryName("");
      setCategoryType("income");
      setEditingCategory(null);
      setShowModal(false);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id))
        .catch((err) => console.error('Error deleting category:', err));
    }
  };


  const closeModal = () => {
    setShowModal(false);
    setCategoryName("");
    setCategoryType("income");
    setEditingCategory(null);
  };

  return (
    <div className="category-container">
      <div className="category-top">
        <h2>Categories</h2>
        <button className="btn" onClick={() => setShowModal(true)}>
          Add Category
        </button>
      </div>

      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            <div>
              <h5>{category.name}</h5>
              <div
                className={
                  category.type === "income" ? "income-type" : "expense-type"
                }
              >
                {category.type.charAt(0).toUpperCase() + category.type.slice(1)}
              </div>
            </div>
            <div className="category-actions">
              <button
                className="btn btn-warning"
                onClick={() => handleEditCategory(category)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        show={showModal}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        closeModal={closeModal}
      >
        <div>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="form-control mb-2"
          />
          <select
            value={categoryType}
            onChange={(e) =>
              setCategoryType(e.target.value as "income" | "expense")
            }
            className="form-control mb-2"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button
            className="btn btn-success"
            onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
          >
            {editingCategory ? "Update Category" : "Add Category"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryPage;
