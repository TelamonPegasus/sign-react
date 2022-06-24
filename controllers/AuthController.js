const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const registerNewUser = async (request, response, next) => {
//   const { name, surname, email } = request.body;

//   const saltPassword = await bcrypt.genSalt(10);
//   const securePassword = await bcrypt.hash(request.body.password, saltPassword);

//   try {
//     const newUserData = new User({
//       name,
//       surname,
//       email,
//       password: securePassword,
//     });

//     const newUser = await newUserData.save();

//     response.status(200).json(newUser);
//   } catch (error) {
//     response.json({
//       message: "There is a problem. User has not been registered. Try again!",
//     });
//   }

//   // response.status(400).json({ messahe: "Yous already exist!" });
// };

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
