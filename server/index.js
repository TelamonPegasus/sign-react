require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
// const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const registerRoute = require("./routes/register");
const authRoute = require("./routes/authorisation");
const refreshTokenRoute = require("./routes/refreshToken");
const logoutRoute = require("./routes/logout");
const ignoreFavicon = require("./middleware/ignoreFavicon");
const connectDB = require("./config/connectDB");

// connect to Mongo DB
connectDB();

app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Then pass them to cors:
app.use(cors(corsOptions));

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
app.use("/api/logout", logoutRoute);
app.use(ignoreFavicon);
// app.use(verifyJWT);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  const router = express.Router();

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

app.use(errorHandler);

// listening for request when successfully connected to the MongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
