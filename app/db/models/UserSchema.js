import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validateEmail } from "../validators.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: [validateEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, "At least 4 characters"],
    maxlength: [30, "Max length is 30 characters"],
  },
  username: {
    type: String,
    required: true,
    minLength: [3, "At least 3 characters"],
  },
  city: {
    type: String,
    required: true,
    minLength: [3, "At least 3 characters"],
  },
  phone: {
    type: Number,
    minLength: [8, "At least 8 characters"],
    maxlength: [10, "Maximum 10 characters"],
  },
  announcements: [{ type: mongoose.Types.ObjectId, ref: "Announcement" }],
  description: {
    type: String,
  },
  business: {
    type: String,
  },
  NIP: {
    type: Number,
  },
  openHour: {
    type: Number,
  },
  closeHour: {
    type: Number,
  },
});

userSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

export const User = mongoose.model("User", userSchema);
