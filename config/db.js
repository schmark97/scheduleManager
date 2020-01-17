const mongoose = require("mongoose");

//connect to db
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb://localhost:27017/test22",
  { useNewUrlParser: true },
  () => console.log("connected to db!")
);

module.exports = mongoose;
