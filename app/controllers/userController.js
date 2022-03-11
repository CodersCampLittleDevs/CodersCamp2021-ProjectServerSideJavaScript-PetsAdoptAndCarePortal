import { config } from "../config.js";
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

export const login = async (req, res, next) => {
  let user;
  try {
    if (req.body.email) {
      const isValidMail = validateEmail(req.body.email);
      if (isValidMail) {
        user = await User.findOne({ email: req.body.email });
      } else {
        return res.json({ error: "email is invalid" });
      }
    }
    const isValidPassword = user.comparePassword(req.body.password);
    if (isValidPassword) {
      const token = jsonwebtoken.sign({ id: user.id }, config.jwt);
      return res.header("auth-token", token).send(token);
    }
    return res.json({ error: "Invalid password" });
  } catch (error) {
    res.json(error);
  }
};