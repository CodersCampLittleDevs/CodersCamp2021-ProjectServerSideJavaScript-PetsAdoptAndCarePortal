import {} from "dotenv/config";
import express from "express";
const port = process.env.PORT || 3000;
const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app
  .listen(port, () => {
    console.log(`App listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("An error occurred while starting the server " + err);
  });
