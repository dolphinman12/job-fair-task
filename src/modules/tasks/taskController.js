import Task from "../../../config/models/task.js";
import { catchError } from "../../middleware/catchError.js";

export const getTasks =catchError (async (req, res, next) => {
  const {
    category,
    shared,
    page = 1,
    limit = 10,
    sortBy = "title",
    order = "asc",
  } = req.query;
  let filter = { user: req.user._id };

  if (category) filter.category = category;
  if (shared !== undefined) filter.shared = shared === "true";

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { [sortBy]: order === "asc" ? 1 : -1 },
    populate: "category",
  };

  {
    const tasks = await Task.paginate(filter, options);
    res.status(200).json(tasks);
  } 
});

export const createTask =catchError (async (req, res) => {
  const { title, type, content, category, shared } = req.body;
  {
    const task = new Task({
      title,
      type,
      content,
      category,
      shared,
      user: req.user._id,
    });
    await task.save();
    res.status(201).json(task);
  } 
});

export const updateTask =catchError (async (req, res) => {
  {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    task.title = req.body.title || task.title;
    task.type = req.body.type || task.type;
    task.content = req.body.content || task.content;
    task.shared = req.body.shared !== undefined ? req.body.shared : task.shared;
    await task.save();
    res.status(200).json(task);
  }
});

export const deleteTask =catchError (async (req, res) => {
  {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await task.remove();
    res.status(200).json({ message: "Task deleted successfully" });
  } 
});
