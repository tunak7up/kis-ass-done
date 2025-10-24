const sequelize = require('../../config/database');
const {Region} = require('./models/location/region');
const {Area} = require('./models/location/area');
const {Npp} = require('./models/location/npp');
const {Route} = require('./models/location/route');
const {TableData} = require('./models/tableData')

// Define relationships
Area.belongsTo(Region, { foreignKey: 'region_id' });
Region.hasMany(Area, { foreignKey: 'region_id' });

Npp.belongsTo(Area, { foreignKey: 'area_id' });
Area.hasMany(Npp, { foreignKey: 'area_id' });

Route.belongsTo(Npp, { foreignKey: 'npp_id' });
Npp.hasMany(Route, { foreignKey: 'npp_id' });

TableData.belongsTo(Route, { foreignKey: 'route_id' });
Route.hasMany(TableData, { foreignKey: 'route_id' });

module.exports = {
  sequelize,
  Region,
  Area,
  Npp,
  Route,
  TableData
};