const express = require("express");
const router = express.Router();

router.get("/", (_, response) => {
  response.sendFile(
    path.join(__dirname, "../../client/build/index.html"),
    (err) => {
      if (err) {
        response.status(500).send(err);
      }
    }
  );
});

module.exports = router;
