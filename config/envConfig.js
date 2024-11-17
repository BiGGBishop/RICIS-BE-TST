require("dotenv").config();


const PORT =  process.env.PORT || 3026
const VERSION =  process.env.VERSION 
const PASSMAILER =  process.env.PASSMAILER 
const MAIL_FROM =  process.env.MAIL_FROM 
const SERVICE =  process.env.SERVICE 
const JWT_SECRET =  process.env.JWT_SECRET 
const MONGODB_URI =  process.env.MONGODB_URI 
const SQLDB_URL =  process.env.SQLDB_URL 
const DIALECT = process.env.DIALECT
const RICISCRYPTOSECRETKEY = process.env.RICISCRYPTOSECRETKEY
const ENVIRONMENT = process.env.ENVIRONMENT
const DATABASE = process.env.DATABASE 
const DB_USERNAME = process.env.DB_USERNAME 
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST 
const DB_PORT = process.env.DB_PORT 



module.exports = {
    PORT,
    VERSION,
    PASSMAILER,
    MAIL_FROM,
    SERVICE,
    JWT_SECRET,
    MONGODB_URI,
    SQLDB_URL,
    DIALECT,
    RICISCRYPTOSECRETKEY,
    ENVIRONMENT,
    DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
    DB_HOST,
}