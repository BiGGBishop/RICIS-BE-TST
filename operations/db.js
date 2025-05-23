const winston = require("winston");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI } = require("../config/envConfig");
const db = MONGODB_URI;

mongoose.set("strictQuery", false);

module.exports = function () {
  mongoose
    .connect(db)
    .then(() => winston.info(`RICIS Db REConnected Successfully!...`));
};
