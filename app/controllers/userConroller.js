import { User } from "../db/models/UserSchema.js";
import jsonwebtoken from "jsonwebtoken";
import { validateEmail } from "../db/validators.js";

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
      const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET);
      return res.header("auth-token", token).send(token);
    }
    return res.json({ error: "Invalid password" });
  } catch (error) {
    res.json(error);
  }
};
