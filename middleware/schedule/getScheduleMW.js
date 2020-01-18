const requireOption = require("../requireOption");

module.exports = objectRepository => {
  const ScheduleModel = requireOption(objectRepository, "ScheduleModel");

  return (req, res, next) => {
    ScheduleModel.findOne({ _id: req.params.id }, (err, schedule) => {
      if (err) {
        return next(err);
      }

      if (!schedule) return res.redirect("/schedule");

      res.locals.schedule = schedule;

      return next();
    });
  };
};
