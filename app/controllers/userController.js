import { User } from "../db/models/UserSchema.js";

export const register = async (req, res, next) => {
  const { email, password, username, city, phone } = req.body;
  const newUser = new User({
    email,
    password,
    username,
    city,
    phone,
  });
  try {
    await newUser.save();
    res.json({ message: "User has been created" });
  } catch (e) {
    res.status(422).json({ errors: e });
  }
};
