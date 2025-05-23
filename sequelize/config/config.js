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
    url: 'postgresql://ricis_user:ricisDBpass@localhost:5432/ricis_db',
    // url: 'postgresql://neondb_owner:N7JjrKpB9swo@ep-round-base-a8cgesqx.eastus2.azure.neon.tech/neondb?sslmode=require',
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
};
