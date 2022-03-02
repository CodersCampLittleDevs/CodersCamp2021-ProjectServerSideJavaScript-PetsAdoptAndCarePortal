import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/Opinions-db", {
  useNewUrlParser: true,
});

const OpinionSchema = new mongoose.Schema({
  rating: Number,
  description: String,
  name: String,
  city: String,
});

const Opinions = mongoose.model("Opinions", OpinionSchema);

app.get("/", function (req, res) {
  Opinions.find(function (err, opinion) {
    if (!err) {
      res.render(console.log(opinion));
      //   res.render("Opinions", {
      //     Opinions: opinion,
      //   });
    } else {
      res.render(err);
    }
  });
});

app.listen(5050, function () {
  console.log("Server on 5050");
});
