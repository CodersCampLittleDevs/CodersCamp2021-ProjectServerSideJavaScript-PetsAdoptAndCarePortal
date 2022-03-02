import mongoose from "mongoose";

const AnnouncementSchema = new Schema({});

export const Announcement = mongoose.model("Announcement", AnnouncementSchema);
