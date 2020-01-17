const requireOption = require("../requireOption");

module.exports = objectRepository => {
  const ScheduleModel = requireOption(objectRepository, "ScheduleModel");

  return (req, res, next) => {
    ScheduleModel.find({ employees: res.locals.user }, (err, schedules) => {
      if (err || !schedules) {
        next(err);
      }

      res.locals.schedules = schedules;

      return next();
    });
  };
};
