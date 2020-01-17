const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Schedule = db.model("Schedule", {
  date: String,
  bTime: String,
  eTime: String,
  employeeNames: [String],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = Schedule;
