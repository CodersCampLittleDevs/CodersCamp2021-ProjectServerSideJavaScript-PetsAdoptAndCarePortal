import express from "express";
export const authRouter = express.Router();

authRouter.post("/login", (req, res, next) => {
  res.status(200).json({
    message: "Handling POST requests to /auth/login",
  });
});

authRouter.post("/forgot", (req, res) => {
  res.status(200).json({
    message: "Handling POST requests to /auth/forgot",
  });
});

authRouter.post("/register", (req, res) => {
  res.status(200).json({
    message: "Handling POST requests to /auth/register",
  });
});
