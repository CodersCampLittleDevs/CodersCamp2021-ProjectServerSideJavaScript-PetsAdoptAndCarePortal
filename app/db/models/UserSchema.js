import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validateEmail } from "../validators.js";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    minLength: [8, "At least 8 characters"],
    maxlength: [30, "Max length is 30 characters"],
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
    maxlength: [30, "Max length is 30 characters"],
    unique: true,
  },
  city: {
    type: String,
    required: true,
    minLength: [3, "At least 3 characters"],
  },
  phone: {
    type: Number,
    required: true,
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

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

UserSchema.pre("save", function (next) {
  const user = this;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    error = { user: "This user is already registered" };
  }
  next(error);
});

export const User = mongoose.model("User", UserSchema);
