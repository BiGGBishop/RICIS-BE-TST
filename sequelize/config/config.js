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
    url: 'postgresql://ricis_v3_user:bksTFv5kmHJvjLHo6j8fcfk0ZYwtkXGo@dpg-ctglqualqhvc739mmc80-a.oregon-postgres.render.com/ricis_v3',
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
