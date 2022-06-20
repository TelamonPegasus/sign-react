const shortid = require("shortid");

const userRoutes = (app, fs) => {
  // variables
  const dataPath = "./users.json";

  // helper methods
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  // READ
  app.get("/api/users", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  // CREATE
  app.post("/api/users", (req, res) => {
    readFile((data) => {
      const id = shortid.generate();

      // add the new user
      data.users = [...data.users, { ...req.body, id }];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send({ ...req.body, id });
      });
    }, true);
  });

  // UPDATE
  //   app.put("/users/:id", (req, res) => {
  //     readFile((data) => {
  //       // add the new user
  //       const userId = req.params["id"];
  //       data[userId] = req.body;

  //       writeFile(JSON.stringify(data, null, 2), () => {
  //         res.status(200).send(`users id:${userId} updated`);
  //       });
  //     }, true);
  //   });

  // DELETE
  //   app.delete("/users/:id", (req, res) => {
  //     readFile((data) => {
  //       // delete the user
  //       const userId = req.params["id"];
  //       delete data[userId];

  //       writeFile(JSON.stringify(data, null, 2), () => {
  //         res.status(200).send(`users id:${userId} removed`);
  //       });
  //     }, true);
  //   });
};

module.exports = userRoutes;
