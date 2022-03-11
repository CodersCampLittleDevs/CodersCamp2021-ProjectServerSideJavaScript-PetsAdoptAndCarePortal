import { Opinion } from "../db/models/OpinionSchema.js";
import { User } from "../db/models/UserSchema.js";

export const addOpinion = async (req, res, next) => {
  const { rate, opinion, user } = req.body;
  let creator;
  try {
    creator = await User.findById(user);
  } catch (error) {
    res.status(422).json({ message: "Couldn't find user" });
    return next();
  }
  const newOpinion = new Opinion({
    rate,
    opinion,
    name: creator.username,
    city: creator.city,
    user: creator,
  });

  try {
    await newOpinion.save();
    res.status(201).json(newOpinion);
  } catch (error) {
    res.status(422).json(error);
  }
};
export const getOpinions = async (req, res, next) => {
  const opinions = await Opinion.find().limit(4);
  res.json(opinions);
};
