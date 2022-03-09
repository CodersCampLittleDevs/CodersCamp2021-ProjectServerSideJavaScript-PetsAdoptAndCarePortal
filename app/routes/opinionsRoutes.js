import express from "express";
import { auth } from "../middleware/verifyToken.js";
export const opinionsRouter = express.Router();

opinionsRouter.post("/", auth, (req, res, next) => {
  res.json({ message: "Wszystkie opinie" });
});
