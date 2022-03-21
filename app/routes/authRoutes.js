import express from "express";
import { login, register, reset } from "../controllers/userController.js";

export const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/forgot", (req, res) => {
  res.status(200).json({
    message: "Handling POST requests to /auth/forgot",
  });
});

authRouter.post("/reset", reset);

authRouter.post("/register", register);
