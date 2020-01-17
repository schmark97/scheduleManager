const requireOption = require("../requireOption");

module.exports = objectRepository => {
  const UserModel = requireOption(objectRepository, "UserModel");

  return (req, res, next) => {
    UserModel.find({}, (err, users) => {
      if (err) {
        next(err);
      }

      res.locals.users = users;

      return next();
    });
  };
};
