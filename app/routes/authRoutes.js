import express from "express";
import { resetAuth } from "../middleware/resetToken.js"
import { login, register, forgot, reset } from "../controllers/userController.js";

export const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/forgot",  forgot);

authRouter.post("/reset/:token", resetAuth, reset);

authRouter.post("/register", register);
