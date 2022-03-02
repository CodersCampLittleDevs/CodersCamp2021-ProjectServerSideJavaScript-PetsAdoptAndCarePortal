import { Announcement } from "../models/AnnouncementSchema/AnnouncementSchema";

export const getAnnouncementById = async (req, res, next) => {
  res.json({ response: "Pojedyncze ogłoszenie" });
};
export const getAnnouncements = async (req, res, next) => {
  res.json({ response: "Wiele ogłoszeń" });
};

export const getAllAnnouncements = async (req, res, next) => {
  const where = {};
  const queries = req.query;
  for (const query in queries) {
    where[query] = queries[query];
  }

  const announcements = await Announcement.find(where);
  res.json(announcements);
};
