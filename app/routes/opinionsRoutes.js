import express from "express";
export const opinionsRouter = express.Router();

opinionsRouter.post("/", (req, res, next) => {
  res.json({ message: "Wszystkie opinie" });
});
