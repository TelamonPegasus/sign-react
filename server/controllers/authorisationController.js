const Subscriber = require("../model/Subscriber");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const foundSubscriber = await Subscriber.findOne({ email }).exec();

  if (!foundSubscriber) {
    return res.sendStatus(401); //Unauthorized
  }

  // evaluate password
  const match = await bcrypt.compare(password, foundSubscriber.password);

  if (match) {
    const roles = Object.values(foundSubscriber.roles);

    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          name: foundSubscriber.name,
          email: foundSubscriber.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    const refreshToken = jwt.sign(
      { email: foundSubscriber.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    foundSubscriber.refreshToken = refreshToken;
    foundSubscriber.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // one day max age of the cookie
    });

    res.json({ accessToken, roles, name: foundSubscriber.name });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
