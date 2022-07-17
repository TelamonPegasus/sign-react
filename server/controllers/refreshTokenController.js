const Subscriber = require("../model/Subscriber");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  const foundSubscriber = await Subscriber.findOne({ refreshToken }).exec();

  if (!foundSubscriber) return res.sendStatus(403); //Forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundSubscriber.email !== decoded.email) {
      return res.sendStatus(403);
    }

    const roles = Object.values(foundSubscriber.roles);

    const accessToken = jwt.sign(
      {
        name: decoded.name,
        roles: roles,
      },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ name: foundSubscriber.name, roles, accessToken });
  });
};

module.exports = { handleRefreshToken };
