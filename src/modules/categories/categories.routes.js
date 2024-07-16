import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoryController.js";
import auth from "../../middleware/auth.js";

const categoryRoutes = express.Router();

// Get all categories
categoryRoutes.get("/", auth, getCategories);

// Create a new category
categoryRoutes.post("/", auth, createCategory);

// Update a category
categoryRoutes.put("/:id", auth, updateCategory);

// Delete a category
categoryRoutes.delete("/:id", auth, deleteCategory);

export default categoryRoutes;
