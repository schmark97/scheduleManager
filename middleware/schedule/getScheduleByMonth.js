const requireOption = require("../requireOption");

module.exports = objectRepository => {
  const ScheduleModel = requireOption(objectRepository, "ScheduleModel");

  return (req, res, next) => {
    let month = req.params.month;

    ScheduleModel.find(
      { date: { $regex: ".*-" + month + "-.*" } },
      (err, schedules) => {
        if (err || !schedules) {
          next(err);
        }

        res.locals.schedules = schedules;

        return next();
      }
    );
  };
};
