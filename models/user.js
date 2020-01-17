const Schema = require("mongoose").Schema;
const db = require("../config/db");

const User = db.model("User", {
  name: String,
  userName: String,
  email: String,
  code: String,
  password: String
});

module.exports = User;
