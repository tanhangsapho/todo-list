import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  isImportant: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const TodoModel = mongoose.model("Todo", TodoSchema);
