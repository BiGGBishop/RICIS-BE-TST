const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

const app = express();
app.use(morgan('combined'))

require("./operations/routes")(app);
// require("./operations/db")(app);

module.exports = app;
