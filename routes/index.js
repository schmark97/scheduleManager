const renderMW = require("../middleware/renderMW");
const UserModel = require("../models/user");
const ScheduleModel = require("../models/schedule");
const getScheduleMW = require("../middleware/schedule/getScheduleMW");
const getSchedulesMW = require("../middleware/schedule/getSchedulesMW");
const getUsersMW = require("../middleware/user/getUsersMW");
const modifyScheduleMW = require("../middleware/schedule/modifyScheduleMW");
const deleteScheduleMW = require("../middleware/schedule/deleteScheduleMW");
const getScheduleByMonth = require("../middleware/schedule/getScheduleByMonth");
const registrationMW = require("../middleware/user/registrationMW");
const logInMW = require("../middleware/user/logInMW");
const getUserSchedule = require("../middleware/schedule/getUserSchedule");
const authMW = require("../middleware/user/authMW");
const logOutMW = require("../middleware/user/logOutMW");
const sortScheduleMW = require("../middleware/schedule/sortScheduleMW");
module.exports = app => {
  let objectRepository = {
    UserModel: UserModel,
    ScheduleModel: ScheduleModel
  };

  app.get("/logout", authMW, logOutMW());

  app.use(
    "/register",
    registrationMW(objectRepository),
    renderMW(objectRepository, "register")
  );

  app.get("/home", authMW, renderMW(objectRepository, "home"));

  app.use(
    "/schedule/edit/:id",
    authMW,
    getScheduleMW(objectRepository),
    getUsersMW(objectRepository),
    modifyScheduleMW(objectRepository),
    renderMW(objectRepository, "schdmodify")
  );

  app.get(
    "/schedule/month/:month",
    authMW,
    getUsersMW(objectRepository),
    getScheduleByMonth(objectRepository),
    sortScheduleMW(),
    renderMW(objectRepository, "schedule")
  );
  app.use(
    "/schedule/new",
    authMW,
    getUsersMW(objectRepository),
    modifyScheduleMW(objectRepository),
    renderMW(objectRepository, "schdmodify")
  );

  app.use(
    "/schedule/del/:id",
    authMW,
    getScheduleMW(objectRepository),
    getUsersMW(objectRepository),
    deleteScheduleMW(objectRepository),
    renderMW(objectRepository, "schdmodify")
  );

  app.get(
    "/schedule/user/:id",
    authMW,
    getUserSchedule(objectRepository),
    sortScheduleMW(),
    renderMW(objectRepository, "schedule")
  );

  app.get(
    "/schedule",
    authMW,
    getSchedulesMW(objectRepository),
    sortScheduleMW(),
    renderMW(objectRepository, "schedule")
  );

  app.use("/", logInMW(objectRepository), renderMW(objectRepository, "index"));
};
