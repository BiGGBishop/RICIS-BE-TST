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
    url: 'postgresql://ricisdatabase_user:xdiQecXhYXdQ3Dy8HAnRI8NZpt42VhAb@dpg-cu4g42jtq21c73cqmrog-a.oregon-postgres.render.com/ricisdatabase',
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
