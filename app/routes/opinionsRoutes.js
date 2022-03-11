import express from "express";
export const opinionsRouter = express.Router();
import { addOpinion, getOpinions } from "../controllers/opinionController.js";
import { auth } from "../middleware/verifyToken.js";

opinionsRouter.get("/", getOpinions);

opinionsRouter.post("/", auth, addOpinion);
