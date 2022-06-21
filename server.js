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
