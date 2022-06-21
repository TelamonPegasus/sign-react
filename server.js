// const path = require("path");
// const express = require("express");
// const jsonServer = require("json-server");
// const cors = require("cors");

// const app = express();
// const router = jsonServer.router(path.join(__dirname, "./db.json"));

// app.use(cors());

// app.use("/", router);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "./client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
//   });
// }

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("../db.json");
// const middlewares = jsonServer.defaults({ static: "./build" });

// const PORT = process.env.PORT || 5000;

// server.use(middlewares);

// server.use(
//   jsonServer.rewriter({
//     "/api/*": "/$1",
//   })
// );

// server.use(router);

// server.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes")(app, fs);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
