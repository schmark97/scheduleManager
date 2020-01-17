const requireOption = require("../requireOption");

module.exports = function(objectrepository) {
  return function(req, res, next) {
    if (typeof res.locals.schedule === "undefined") {
      return next();
    }

    res.locals.schedule.remove(err => {
      if (err) {
        return next(err);
      }

      return res.redirect("/schedule");
    });
  };
};
