const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleRegisterNewUser = async (request, response, next) => {
  const { name, surname, email, password } = request.body;

  if (!name || !surname || !email || !password) {
    return response.status(400).json({ message: "All fields are required" });
  }

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) {
    return response
      .status(409)
      .json({ message: "This email already exist. Please log in!" }); // User already exist!
  }

  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);

  try {
    await User.create({
      name,
      surname,
      email,
      password: securePassword,
    });

    response
      .status(201)
      .json({ message: "You are now registered. Please log in!" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { handleRegisterNewUser };
