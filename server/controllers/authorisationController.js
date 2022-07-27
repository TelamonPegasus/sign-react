const Subscriber = require("../model/Subscriber");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const foundSubscriber = await Subscriber.findOne({ email }).exec();

  if (!foundSubscriber) {
    return res
      .status(401) //Unauthorized
      .json({ message: "Subscriber does not exist. Please register yourself" });
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
      { expiresIn: "600s" }
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
    res.status(401).json({ message: "Password incorrect" });
  }
};

module.exports = { handleLogin };
