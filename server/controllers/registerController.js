const Subscriber = require("../model/Subscriber");

const handleRegisterNewSubscriber = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({ message: "All fields are required" });
  }

  // check for duplicate Subscribernames in the db
  const isSubscriberExist = await Subscriber.findOne({ email }).exec();

  if (isSubscriberExist) {
    return response
      .status(409)
      .json({ message: "This email already exist. Please log in!" }); // Subscriber already exist!
  }

  try {
    const subscriber = new Subscriber(request.body);
    await subscriber.save();

    response
      .status(201)
      .json({ message: "You are now registered. Please log in!" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { handleRegisterNewSubscriber };
