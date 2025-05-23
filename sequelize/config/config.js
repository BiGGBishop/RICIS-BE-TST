module.exports = {

  development: {
    // url: 'postgresql://neondb_owner:N7JjrKpB9swo@ep-round-base-a8cgesqx.eastus2.azure.neon.tech/neondb?sslmode=require',
    url: 'postgresql://ricis_user:ricisDBpass@localhost:5432/ricis_db',
    dialect: "postgres",
    dialectOptions:
        {
            ssl: {
              rejectUnauthorized: false,
            },
          }
  }, 
};
