const express = require("express");
const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const startRouter = require("../routes/startup");
const adminRouter = require("../routes/admin");


const { VERSION } = require("../config/envConfig");
const { notFound, errorHandler } = require("../middlewares/handler");

module.exports = (app) => {
  // set cors
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE");
      return res.status(200).json({});
    }

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "100mb" }));
  app.use((req, res, next) => {
    console.log(`Endpoint hit: ${req.method} ${req.url}`);
    next(); // Move on to the next middleware or route handler
  });

  app.use(`${VERSION}/users`, usersRouter);
  app.use(`${VERSION}/auth`, authRouter);
  app.use(`${VERSION}/startups`, startRouter);
  app.use(`${VERSION}/admin`, adminRouter);

  app.get("/", (req, res) => {
    res.json({ status: true, message: "RICIS-V1 health check passed ✅" });
  });

  app.use(notFound);
  app.use(errorHandler);
};
