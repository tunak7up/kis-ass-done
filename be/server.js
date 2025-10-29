const { Detail } = require("../api/sequelize/index");
const dbInstance = require("../api/sequelize/get-db-instance").getDbInstance();

async function dropTable() {
  await dbInstance.query("SET FOREIGN_KEY_CHECKS = 0");
await dbInstance.query("TRUNCATE TABLE detail");
await dbInstance.query("SET FOREIGN_KEY_CHECKS = 1");

}
dropTable();