const app = require("./app");
const { sequelize } = require("./sequelize/models");
const { PORT } = require("./config/envConfig");



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

  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
})();
