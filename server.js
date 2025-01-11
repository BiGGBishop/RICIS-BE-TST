const app = require("./app");
const { sequelize } = require("./sequelize/models");
const { PORT } = require("./config/envConfig");
const {job}  = require("./cron/cron");



const connectDb = async () => {
  console.log("checking db connection .....");
  try {
    await sequelize.authenticate();
    console.log("db connection established...");
  } catch (e) {
    console.log("db connection failed", e);
    process.exit(1);
  }
};

(async () => {
  await connectDb(); 
  job.start();
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
})();
