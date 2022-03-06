import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "You have to type title"],
    minLength: [3, "At least 3 characters"],
    maxLength: [25, "Maximum 25 characters."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "You have to type description"],
    minlength: [3, "At least 3 characters"],
    maxLength: [50, "Maximum 50 characters"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "You have to type price"],
    min: [1, "The lowest value for price is 1"],
    max: [9999, "The highest value for price is 9999"],
  },
  category: {
    type: String,
    required: [true, "You have to select category"],
  },
  animal: {
    type: String,
    required: [true, "You have to select animal"],
  },
  city: {
    type: String,
    required: [true, "You have to type city"],
  },
  image: String,
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

export const Announcement = mongoose.model("Announcement", AnnouncementSchema);
