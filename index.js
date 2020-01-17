// const UserModel = require("./models/user");
// const ScheduleModel = require("./models/schedule");

// let User = new UserModel();

// User.name = "feri";
// User.email = "pista";
// User.code = 121;
// User.password = "pista";

// User.save(err => {
//   console.log(err);
// });

// let User2 = new UserModel();

// User2.name = "joska";
// User2.email = "mari";
// User2.code = 122;
// User2.password = "mari";

// User2.save(err => {
//   console.log(err);
// });

// let Schedule = new ScheduleModel();

// Schedule.date = "2017-11-01";
// Schedule.bTime = "8:00";
// Schedule.eTime = "16:00";
// Schedule.employeeNames = [User.name, User2.name];
// Schedule.employees = [User, User2];
// Schedule.save(err => {
//   console.log(err);
// });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(express.static(__dirname + "/static"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require("./routes/index")(app);

app.use((err, req, res, next) => {
  console.log(err);
  res.end("Problem...");
});

app.listen(3000, function() {
  console.log("Server started on port: 3000");
});
