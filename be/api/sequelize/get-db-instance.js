const { Sequelize } = require("sequelize");
const { getDbConfig } = require("../../config");

let sequelizeDatabase;

const getDbInstance = () => {
  if (sequelizeDatabase) return sequelizeDatabase;
  //
  const dbConfig = getDbConfig();
  sequelizeDatabase = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: "mysql",
      logging: false,
    }
  );
  return sequelizeDatabase;
};

module.exports = {
  getDbInstance,
};
