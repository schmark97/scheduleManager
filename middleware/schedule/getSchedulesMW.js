const requireOption = require("../requireOption");

module.exports = objectRepository => {
  const ScheduleModel = requireOption(objectRepository, "ScheduleModel");

  return (req, res, next) => {
    ScheduleModel.find({}, (err, schedules) => {
      if (err) {
        next(err);
      }

      res.locals.schedules = schedules;

      return next();
    });
  };
};
