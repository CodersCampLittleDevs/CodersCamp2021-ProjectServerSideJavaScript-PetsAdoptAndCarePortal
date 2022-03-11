import express from "express";
import { auth } from "../middleware/verifyToken.js";
import { getUserData } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/:uid", getUserData);

userRouter.put("/:aid", auth, (req, res) => {
  res.status(200).json({
    message: "edit user data",
  });
});
