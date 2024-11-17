const {
  // SQLDB_URL,
  ENVIRONMENT,
  
} = require("../../config/envConfig");


console.log({
  ENVIRONMENT,
  // SQLDB_URL, 
  
})

module.exports = {

  development: {
    url:"postgresql://barron:bkgCKKHn4lwDQm2bHNn7EVzStlVyybQu@dpg-csoukh8gph6c73as2bf0-a.oregon-postgres.render.com/ricisdb_8177",
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
