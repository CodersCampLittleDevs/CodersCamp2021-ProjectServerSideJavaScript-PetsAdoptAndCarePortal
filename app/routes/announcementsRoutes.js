import express from "express";
import { auth } from "../middleware/verifyToken.js";
import {
  getAnnouncementById,
  getAllAnnouncements,
} from "../controllers/announcementsController.js";

export const announcementRouter = express.Router();

announcementRouter.get("/:aid", getAnnouncementById);
announcementRouter.get("/", getAllAnnouncements);

announcementRouter.post("/", auth, (req, res) => {
  res.status(200).json({
    message: "Add new announcement",
  });
});
