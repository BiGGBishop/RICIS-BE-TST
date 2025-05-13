const {
  SQLDB_URL,
  ENVIRONMENT,
  
} = require("../../config/envConfig");


console.log({
  ENVIRONMENT,
  SQLDB_URL, 
  
})

module.exports = {

  development: {
    // url: SQLDB_URL,
    url: 'postgresql://neondb_owner:N7JjrKpB9swo@ep-round-base-a8cgesqx.eastus2.azure.neon.tech/neondb?sslmode=require',
    // url: 'postgresql://neondb_owner:npg_BMR2afy0IcrV@ep-sparkling-mode-a4zbnqga-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
    dialect: "postgres",
    dialectOptions:
      // ENVIRONMENT === "production" || ENVIRONMENT === "staging"
        // ? 
        {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        // : {},
  }, 
  // test: {
  //   username: "root",
  //   password: null,
  //   database: "database_test",
  //   host: "127.0.0.1",
  //   dialect: "postgres",
  // },
  // production: {
  //   url: "127.0.0.1",
  //   dialect: "postgres",
  // },
};
