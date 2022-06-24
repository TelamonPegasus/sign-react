require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/connectDB");

// connect to Mongo DB

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // why true?
// const routes = require("./routes")(app, fs);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.use("/", require("./routes/root"));
}

// listening for request when successfully connected to the MongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
