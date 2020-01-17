const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    res.clearCookie("token").redirect("/");
  };
};
