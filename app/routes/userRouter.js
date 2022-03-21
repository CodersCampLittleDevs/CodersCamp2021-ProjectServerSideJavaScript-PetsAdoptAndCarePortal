import express from "express";
import { auth } from "../middleware/verifyToken.js";
import { getUserData, updateUser } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/:uid", getUserData);

userRouter.patch("/:uid", updateUser);
