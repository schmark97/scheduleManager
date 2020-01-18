const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requireOption = require("../requireOption");

module.exports = objectRepository => {
  const UserModel = requireOption(objectRepository, "UserModel");

  return (req, res, next) => {
    if (
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined"
    )
      return next();
    UserModel.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) return res.redirect("/schedule");

      bcrypt.compare(req.body.password, user.password, function(err, valid) {
        if (err) return next(err);

        if (valid) {
          //create and asign token
          const token = jwt.sign({ _id: user._id }, "secret", {
            expiresIn: "1h"
          });
          try {
            res.locals.user = user._id;

            return res
              .cookie("token", token, { httpOnly: true })
              .redirect("/schedule");
          } catch (err) {
            return res.status(400).send(err);
          }
        } else return res.redirect("/schedule");
      });
    });
  };
};
