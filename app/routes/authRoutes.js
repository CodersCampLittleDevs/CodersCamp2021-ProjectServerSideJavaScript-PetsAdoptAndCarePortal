import express from "express";
export const authRouter = express.Router();
import User from "../models/UserSchema";

authRouter.post("/login", (req, res, next) => {
  // const {error} = loginValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //Checking if email exists in database

  const emailExists = await User.findOne({ email: req.body.user });
  const userExists = await User.findOne({ username: req.body.user });
  if (!emailExists || !userExists)
    return res.status(400).send("Invalid login name!");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  res.send("Logged In!");
});

authRouter.post("/forgot", (req, res) => {
  res.status(200).json({
    message: "Handling POST requests to /auth/forgot",
  });
});

authRouter.post("/reset", (req, res) => {
  res.status(200).json({
    message: "Handling POST requests to /auth/reset",
  });
});

authRouter.post("/register", (req, res) => {
  res.status(200).json({
    message: "Handling POST requests to /auth/register",
  });
});
