const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.redirect("/");
  else {
    try {
      const verified = jwt.verify(token, "secret");
      req.user = verified;
      res.locals.user = verified._id;
      next();
    } catch (err) {
      res.redirect("/");
    }
  }
};

module.exports = auth;
