import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Category is required"],
    maxLength: 50,
    unique: true,
  },
});

export const Category = mongoose.model("Category", categorySchema);
