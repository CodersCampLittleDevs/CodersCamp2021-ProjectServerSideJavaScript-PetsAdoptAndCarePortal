import express from "express";
import {
  getAnnouncementById,
  getAnnouncements,
} from "../controllers/announcementsController.js";

export const announcementRouter = express.Router();

announcementRouter.get("/:aid", getAnnouncementById);
announcementRouter.get("/", getAnnouncements);

announcementRouter.post("/", (req, res) => {
  res.status(200).json({
    message: "Add new announcement",
  });
});
