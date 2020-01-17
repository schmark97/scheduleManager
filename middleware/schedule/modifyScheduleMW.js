const requireOption = require("../requireOption");

module.exports = function(objectrepository) {
  const ScheduleModel = requireOption(objectrepository, "ScheduleModel");

  return function(req, res, next) {
    if (
      typeof req.body.date === "undefined" ||
      typeof req.body.btime === "undefined" ||
      typeof req.body.etime === "undefined" ||
      typeof req.body.emp1 === "undefined" ||
      typeof req.body.emp2 === "undefined"
    ) {
      return next();
    }

    if (typeof res.locals.schedule === "undefined") {
      res.locals.schedule = new ScheduleModel();
    }

    res.locals.schedule.date = req.body.date;
    res.locals.schedule.bTime = req.body.btime;
    res.locals.schedule.eTime = req.body.etime;
    //mivel a req.body.emp1 es req.body.emp2 string-kent jon vissza
    //es JSON.parse() sem tudja atkonvertalni
    res.locals.schedule.employeeNames = [
      req.body.emp1
        .split(",")[1]
        .split(":")[1]
        .substr(1)
        .replace("'", "")
        .slice(0, -1),
      req.body.emp2
        .split(",")[1]
        .split(":")[1]
        .substr(1)
        .replace("'", "")
        .slice(0, -1)
    ];
    res.locals.schedule.employees = [
      req.body.emp1
        .split("\n")[0]
        .split(":")[1]
        .slice(0, -2)
        .replace(" ", ""),
      req.body.emp2
        .split("\n")[0]
        .split(":")[1]
        .slice(0, -2)
        .replace(" ", "")
    ];

    res.locals.schedule.save(err => {
      if (err) return next(err);
      return res.redirect("/schedule");
    });
  };
};
