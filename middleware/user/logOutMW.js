const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    return res.clearCookie("token").redirect("/");
  };
};
