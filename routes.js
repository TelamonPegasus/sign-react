const userRoutes = require("./users");

const path = require("path");
const fs = require("fs");

const basePathToData = path.join(__dirname, "./users.json");

const getJsonData = function (basePathToData) {
  const filename = path.join(basePathToData);

  return JSON.parse(fs.readFileSync(filename, "utf-8"));
};

const appRouter = (app, fs) => {
  // default route
  app.get("/api/users", (req, res) => {
    const data = getJsonData(basePathToData);

    return res.send(data);
  });

  // // other routes
  userRoutes(app, fs);
};

module.exports = appRouter;
