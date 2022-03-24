import express from "express";
import { login, register, forgot, reset } from "../controllers/userController.js";

export const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/forgot",  forgot);

authRouter.post("/reset/:token", reset);

authRouter.post("/register", register);
