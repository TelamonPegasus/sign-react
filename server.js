const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const AuthRoute = require("./routes/auth");

dotenv.config();

// const router = express.Router();
// const path = require("path");

// data base connection

// const fs = require("fs");

// https://data.mongodb-api.com/app/data-lhaiy/endpoint/data/v1
mongoose.connect(process.env.DATABASE_ACCESS, () => {
  console.log("Data base connected!");
});

app.use(express.json());
app.use(cors());

app.use("/api", AuthRoute);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // why true?
// const routes = require("./routes")(app, fs);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
