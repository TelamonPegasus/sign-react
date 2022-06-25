require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/connectDB");
const router = express.Router();
const registerRoute = require("./routes/register");
const authRoute = require("./routes/authorisation");

// connect to Mongo DB
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// routes
app.use("/api/register", registerRoute);
app.use("/api/login", authRoute);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  // app.use("/", require("./routes/root"));

  router.get("*", (request, response) => {
    response.sendFile(
      path.join(__dirname, "client", "build", "index.html"),
      (err) => {
        if (err) {
          response.status(500).send(err);
        }
      }
    );
  });
}

// listening for request when successfully connected to the MongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
