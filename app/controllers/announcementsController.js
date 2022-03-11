import { Announcement } from "../db/models/AnnouncementSchema.js";
import { User } from "../db/models/UserSchema.js";

export const getAnnouncementById = async (req, res, next) => {
  res.json({ response: "Pojedyncze ogłoszenie" });
};

export const getAnnouncements = async (req, res, next) => {
  const where = {};
  const queries = req.query;
  for (const query in queries) {
    where[query] = queries[query];
  }

  const announcements = await Announcement.find(where);
  res.json(announcements);
};

export const addAnnouncement = async (req, res, next) => {
  const { title, description, price, category, animal, city, user } = req.body;

  let creator;

  try {
    creator = await User.findById(user);
  } catch (e) {
    res.status(422).json({ message: "Couldn't find user" });
    return next();
  }
  const announcement = new Announcement({
    title: title,
    description: description,
    price: price,
    category: category,
    animal: animal,
    city: city,
    user: creator,
  });
  try {
    await announcement.save();
    res.status(201).json(announcement);
  } catch (e) {
    res.status(422).json(e);
  }
};
