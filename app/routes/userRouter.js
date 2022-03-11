import express from "express";
import { auth } from "../middleware/verifyToken.js";

export const userRouter = express.Router();

userRouter.get("/:aid", auth, (req, res) => {
  res.status(200).json({
    message: "get user data",
  });
});

userRouter.put("/:aid", auth, (req, res) => {
  res.status(200).json({
    message: "edit user data",
  });
});
