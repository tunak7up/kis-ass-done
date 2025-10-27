require("dotenv").config();

const getDbConfig = () => ({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
});

module.exports = {
  getDbConfig,
};
