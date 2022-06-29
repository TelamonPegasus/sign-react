require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");
const router = express.Router();
const corsOptions = require("./config/corsOptions");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

const registerRoute = require("./routes/register");
const authRoute = require("./routes/authorisation");
// const rootRoute = require("./routes/root");
const refreshTokenRoute = require("./routes/refreshToken");
const logoutRoute = require("./routes/logout");

const connectDB = require("./config/connectDB");

// connect to Mongo DB
connectDB();

app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// app.use(cors(corsOptions));
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// routes
app.use("/api/register", registerRoute);
app.use("/api/login", authRoute);
app.use("/api/refresh", refreshTokenRoute);
app.use("/logout", logoutRoute);

app.use(verifyJWT);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // app.use("*", rootRoute);

  router.get("*", (_, response) => {
    response.sendFile(
      path.join(__dirname, "../client/build/index.html"),
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
