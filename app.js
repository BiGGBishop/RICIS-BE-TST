const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Logging middleware
app.use(morgan("combined"));

// Middleware for parsing JSON & URL-encoded data (limit increased for large payloads)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Load routes dynamically
require("./operations/routes")(app);

// Handle 404 errors (route not found)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;