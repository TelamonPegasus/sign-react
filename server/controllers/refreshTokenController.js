// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  // const foundUser = usersDB.users.find(
  //   (person) => person.refreshToken === refreshToken
  // );

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403); //Forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) {
      return res.sendStatus(403);
    }

    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          name: decoded.name,
          email: decoded.email,
          roles: roles,
        },
      },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );

    res.json({ name: foundUser.name, roles, accessToken });
  });
};

module.exports = { handleRefreshToken };
