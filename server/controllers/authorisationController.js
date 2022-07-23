const Subscriber = require("../model/Subscriber");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const foundSubscriber = await Subscriber.findOne({ email }).exec();

  if (!foundSubscriber) {
    return res.sendStatus(401); //Unauthorized
  }

  const isMatch = await foundSubscriber.isValidPassword(password);

  if (isMatch) {
    const roles = Object.values(foundSubscriber.roles);

    // create JWTs
    const accessToken = jwt.sign(
      {
        name: foundSubscriber.name,
        email: foundSubscriber?.email,
        roles: roles,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    const refreshToken = jwt.sign(
      { email: foundSubscriber?.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    foundSubscriber.refreshToken = refreshToken;
    await foundSubscriber.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // one day max age of the cookie
    });

    res.json({
      name: foundSubscriber.name,
      accessToken,
      roles,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
