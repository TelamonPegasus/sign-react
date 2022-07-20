const Subscriber = require("../model/Subscriber");
const bcrypt = require("bcrypt");

const handleRegisterNewSubscriber = async (request, response, next) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({ message: "All fields are required" });
  }

  // check for duplicate Subscribernames in the db
  const duplicate = await Subscriber.findOne({ email }).exec();

  if (duplicate) {
    return response
      .status(409)
      .json({ message: "This email already exist. Please log in!" }); // Subscriber already exist!
  }

  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);

  try {
    await Subscriber.create({
      name,
      email,
      password: securePassword,
      roles: {
        User: 2001,
      },
    });

    response
      .status(201)
      .json({ message: "You are now registered. Please log in!" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { handleRegisterNewSubscriber };
