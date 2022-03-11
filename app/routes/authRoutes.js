import express from "express";

export const authRouter = express.Router();
import { register, login } from "../controllers/userController.js";

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
