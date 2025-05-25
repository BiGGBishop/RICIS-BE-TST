module.exports = {

  development: {
    // url: 'postgresql://neondb_owner:N7JjrKpB9swo@ep-round-base-a8cgesqx.eastus2.azure.neon.tech/neondb?sslmode=require',
    // url: 'postgresql://ricis_user:ricisDBpass@localhost:5432/ricis_db',
    url: 'postgresql://neondb_owner:npg_BMR2afy0IcrV@ep-sparkling-mode-a4zbnqga-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
    dialect: "postgres",
    dialectOptions:
        {
            ssl: {
              rejectUnauthorized: false,
            },
          }
  }, 
};
