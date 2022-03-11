import express from "express";
export const opinionsRouter = express.Router();
import { addOpinion } from "../controllers/opinionController.js";

opinionsRouter.get("/", (req, res, next) => {
  res.json({ message: "Wszystkie opinie" });
});

opinionsRouter.post("/", addOpinion);
