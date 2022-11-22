const mongoose = require("mongoose");

//* CONNECTION WITH DB
const DB = process.env.DATA_BASE_URL;
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection to Database is Established!!");
  })
  .catch((err) => {
    console.log(err);
  });
