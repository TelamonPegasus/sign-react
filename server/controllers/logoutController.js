const Subscriber = require("../model/Subscriber");

const handleLogout = async (req, res) => {
  // On client side we have to also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content to send back
  }

  const refreshToken = cookies.jwt;

  // Is refreshToken in db?

  const foundSubscriber = await Subscriber.findOne({ refreshToken }).exec();
  if (!foundSubscriber) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); // Forbidden
  }

  foundSubscriber.refreshToken = "";
  await foundSubscriber.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
