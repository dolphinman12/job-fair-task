import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./taskController.js";
import auth from "../../middleware/auth.js";

const taskRoutes = express.Router();

// Get all tasks
taskRoutes.get("/", auth, getTasks);

taskRoutes.get("/", getTasks);

// Create a new task
taskRoutes.post("/", auth, createTask);

// Update a task
taskRoutes.put("/:id", auth, updateTask);

// Delete a task
taskRoutes.delete("/:id", auth, deleteTask);

export default taskRoutes;
