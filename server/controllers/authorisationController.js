const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const foundUser = usersDB.users.find((person) => person.email === email);

  if (!foundUser) {
    return response.sendStatus(401); //Unauthorized
  }

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);

    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5s" } // change it
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" } // change it
    );

    // Saving refreshToken with current user
    const otherUsers = usersDB.users.filter(
      (person) => person.email !== foundUser.email
    );

    const currentUser = { ...foundUser, refreshToken };

    console.log("current", currentUser);

    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    response.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("accessToken", accessToken);
    response.json({ accessToken, roles });
  } else {
    response.sendStatus(401);
  }
};

module.exports = { handleLogin };
