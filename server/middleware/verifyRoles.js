const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(req);
    if (!req.body?.roles) {
      return res.sendStatus(401);
    }

    const rolesArray = [...allowedRoles];

    const result = req.body?.roles
      .map((role) => {
        return rolesArray.includes(role);
      })
      .find((val) => val === true);

    if (!result) {
      return res.sendStatus(401);
    }

    next();
  };
};

module.exports = verifyRoles;
