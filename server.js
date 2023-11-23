const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./config/config.js");
const UserRoute = require("./routes/user");
const EventRoute = require("./routes/event");

require("dotenv").config();

const app = express();

let port = process.env.PORT;
mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {})
  .then(() => {
    console.log("Databse Connected");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/api/user", UserRoute);
app.use("/api/event", EventRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Hello Crud Node Express",
  });
});

app.listen(port || 4000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 4000}`);
});
