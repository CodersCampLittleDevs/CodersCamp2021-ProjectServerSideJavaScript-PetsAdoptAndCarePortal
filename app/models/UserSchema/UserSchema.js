import mongoose from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
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

export const User = mongoose.model("User", UserSchema);
