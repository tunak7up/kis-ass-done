const { Region, Area, Npp, Route } = require("./models/location");
const { Kpi, Detail, Content, TotalDetail } = require("./models/table");
const dbInstance = require("./get-db-instance").getDbInstance();

module.exports = {
  sequelize: dbInstance,
  Region,
  Area,
  Npp,
  Route,
  Kpi,
  Detail,
  Content,
  TotalDetail
};
