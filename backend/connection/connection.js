const mongoose = require("mongoose");
require("dotenv").config();

url = process.env.DB_URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
