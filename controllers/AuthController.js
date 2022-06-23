const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerNewUser = async (request, response, next) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);

  const newUserData = new User({
    name: request.body.name,
    surname: request.body.surname,
    email: request.body.email,
    password: securePassword,
  });

  try {
    const newUser = await newUserData.save();

    response.status(200).json(newUser);
  } catch (error) {
    response.status(500).json(error);
  }
};

const logIn = async (request, response) => {
  if (request.body.email === "" || request.body.password === "") {
    response.status(400).json("All fields are required!");
  }

  try {
    let user;

    try {
      user = await User.findOne({ email: request.body.email });

      const validatedUser = await bcrypt.compare(
        request.body.password,
        user.password
      );

      !validatedUser &&
        response.status(403).json("Wrong pasword. Please type again!");

      const token = jwt.sign({ name: user.name }, "verySecretValue", {
        expiresIn: "1h",
      });

      response.status(200).json({ message: "You are logged in!", token });
    } catch (error) {
      response.status(404).json("User Not Found!");
    }
  } catch (error) {
    response.status(500).json("Something Else Went Wrong!");
  }
};

module.exports = { registerNewUser, logIn };

// const logIn = (request, response, next) => {
//   const name = request.body.name;
//   const password = request.body.password;

//   User.findOne({ $or: [{ email: name }] }).then((user) => {
//     if (user) {
//       bcrypt.compare(password, user.password, (error, result) => {
//         if (error) {
//           response.json({ message: error });
//         }

//         if (result) {
//           let token = jwt.sign({ name: user.name }, "verySecretValue", {
//             expiresIn: "1h",
//           });

//           response.json({ message: "You are logged in!", token });
//         } else {
//           response.json({
//             message: "Password does not matched!",
//           });
//         }
//       });
//     } else {
//       response.json({ message: "User has not been registered" });
//     }
//   });
// };
