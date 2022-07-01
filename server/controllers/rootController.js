const path = require("path");

const handleRoot = (_, response) => {
  response.sendFile(
    path.join(__dirname, "../../client/build/index.html"),
    (error) => {
      if (error) {
        return response.status(500).send(error);
      }
    }
  );
};

module.exports = { handleRoot };
