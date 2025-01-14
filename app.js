const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser")

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json())

require("./operations/routes")(app);
// require("./operations/db")(app);

module.exports = app;
