import express from "express";
import { announcementRouter } from "./routes/announcements-routes.js";
const port = process.env.PORT || 3000;
const app = express();


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/announcements", announcementRouter)

app
  .listen(port, () => {
    console.log(`App listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("An error occurred while starting the server " + err);
  });
