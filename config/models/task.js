import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["text", "list"], required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  shared: { type: Boolean, default: false },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

TaskSchema.plugin(mongoosePaginate);
const Task = mongoose.model("Task", TaskSchema);
export default Task;
