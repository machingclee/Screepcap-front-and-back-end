import Sequelize from "sequelize";
import dotnev from "dotenv";
dotnev.config();

const {
  NODE_ENV,
  DEVELOPMENT_DB_HOST,
  PRODUCTION_DB_HOST,
  DB_USER,
  DB_PASSWORD
} = process.env;
const DB_HOST = NODE_ENV == "development" ? DEVELOPMENT_DB_HOST : PRODUCTION_DB_HOST;

console.log(`NODE_ENV=${NODE_ENV}, DB_HOST is set to ${DB_HOST}`);
console.log("DB_USER=", DB_USER, "DB_PASSWORD", DB_PASSWORD);

export const sequelize = new Sequelize("screencapdb", DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: "5432",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export async function query(string) {
  const result = sequelize.query(string.replace(/\n\s*/g, " "), {
    type: sequelize.QueryTypes.SELECT
  });

  return result;
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export const db = {
  sequelize,
  query
};
