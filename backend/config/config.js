const dotenv = require("dotenv");
dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  PRODUCTION_DB_HOST,
  DEVELOPMENT_DB_HOST
} = process.env;

console.log(DB_NAME, DB_USER, DB_PASSWORD, PRODUCTION_DB_HOST, DEVELOPMENT_DB_HOST);

const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DEVELOPMENT_DB_HOST,
    dialect: "postgres"
  },

  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: PRODUCTION_DB_HOST,
    dialect: "postgres"
  }
};

module.exports = config;
