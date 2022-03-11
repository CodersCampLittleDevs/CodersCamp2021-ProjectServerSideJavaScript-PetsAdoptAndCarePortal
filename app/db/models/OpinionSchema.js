import mongoose from "mongoose";

const OpinionSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: [true, "You have to add rating."],
    min: [1, "Minimum value is 1."],
    max: [25, "Maximum value is 5."],
    trim: true,
  },
  opinion: {
    type: String,
    required: [true, "You have to type your opinion"],
    minlength: [3, "At least 3 characters"],
    maxLength: [50, "Maximum 50 characters"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "You have to type price"],
    minlength: [3, "At least 3 characters"],
    maxLength: [25, "Maximum 25 characters"],
  },
  city: {
    type: String,
    required: [true, "You have to type city"],
    minlength: [3, "At least 3 characters"],
    maxLength: [25, "Maximum 25 characters"],
  },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

export const Opinion = mongoose.model("Opinion", OpinionSchema);
