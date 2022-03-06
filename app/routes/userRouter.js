import express from "express";

export const userRouter = express.Router();

userRouter.get("/:aid", (req, res) => {
  res.status(200).json({
    message: "get user data",
  });
});

userRouter.put("/:aid", (req, res) => {
  res.status(200).json({
    message: "edit user data",
  });
});
