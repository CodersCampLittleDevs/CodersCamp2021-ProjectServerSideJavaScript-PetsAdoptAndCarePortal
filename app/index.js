import express from "express";
import { authRouter } from "./routes/authRoutes.js";
import { announcementRouter } from "./routes/announcementsRoutes.js";
import { opinionsRouter } from "./routes/opinionsRoutes.js";
import { userRouter } from "./routes/userRouter.js";
import "./db/mongoose.js";
import { config } from "./config.js";

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/auth", authRouter);
app.use("/announcements", announcementRouter);
app.use("/opinions", opinionsRouter);
app.use("/user", userRouter);

app
  .listen(config.port, () => {
    console.log(`App listening on port ${config.port}`);
  })
  .on("error", (err) => {
    console.error("An error occurred while starting the server " + err);
  });
