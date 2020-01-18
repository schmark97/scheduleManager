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
  res.end("Error...");
});

app.listen(3000, function() {
  console.log("Server started on port: 3000");
});
