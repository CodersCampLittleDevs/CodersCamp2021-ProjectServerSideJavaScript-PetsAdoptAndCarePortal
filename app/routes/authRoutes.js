import express from "express";
import { User } from "../db/models/UserSchema.js";
import jwt from "jsonwebtoken";
import { login, register } from "../controllers/userController.js";

export const authRouter = express.Router();

authRouter.post("/login", login);

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

authRouter.post("/register", register);
