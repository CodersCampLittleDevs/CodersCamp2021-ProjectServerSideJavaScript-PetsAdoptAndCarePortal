import { Announcement } from "../db/models/AnnouncementSchema.js";

export const getAnnouncementById = async (req, res, next) => {
  const id = req.params.aid;
  let announcement;
  try {
    announcement = await Announcement.findById(id);
    console.log(announcement);
    res.json(announcement);
  } catch (error) {
    res.json({ message: error });
  }
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
