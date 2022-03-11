import express from "express";
import { auth } from "../middleware/verifyToken.js";
import {
  getAnnouncementById,
  getAnnouncements,
  addAnnouncement,
} from "../controllers/announcementsController.js";

export const announcementRouter = express.Router();

announcementRouter.get("/:aid", getAnnouncementById);
announcementRouter.get("/", getAnnouncements);

announcementRouter.post("/", addAnnouncement);
