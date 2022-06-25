const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (request, response) => {
  const { email, password } = request.body;

  if (email === "" || password === "") {
    response.status(400).json("All fields are required!");
  }

  try {
    let user;

    try {
      user = await User.findOne({ email });

      const validatedUser = await bcrypt.compare(password, user.password);

      !validatedUser &&
        response.status(403).json("Wrong pasword. Please type again!");

      const token = jwt.sign({ name: user.name }, "verySecretValue", {
        expiresIn: "5s",
      });

      response.status(200).json({ message: "You are logged in!", token });
    } catch (error) {
      response.status(404).json("User Not Found!");
    }
  } catch (error) {
    response.status(500).json("Something Else Went Wrong!");
  }
};

module.exports = { handleLogin };
