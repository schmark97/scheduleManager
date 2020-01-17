const requireOption = require("../requireOption");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = objectRepository => {
  const UserModel = requireOption(objectRepository, "UserModel");

  return (req, res, next) => {
    if (typeof req.body.password === "undefined") return next();
    bcrypt
      .hash(req.body.password, 10)
      .then(hash => {
        const user = new UserModel();
        user.name = req.body.name;
        user.email = req.body.email;
        user.code = req.body.code;
        user.password = hash;

        user.save(err => {
          if (err) return next(err);
          return res.redirect("/");
        });
      })
      .catch(err => {
        return next(err);
      });
  };
};
