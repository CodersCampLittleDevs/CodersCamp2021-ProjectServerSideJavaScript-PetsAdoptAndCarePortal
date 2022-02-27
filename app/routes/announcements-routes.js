import express from "express";
import { getAnnouncementById, getAnnouncements } from "../controllers/announcements-controller.js"

export const announcementRouter = express.Router();

announcementRouter.get('/:aid', getAnnouncementById);

announcementRouter.get('/', getAnnouncements);
