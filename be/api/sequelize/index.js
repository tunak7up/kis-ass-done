const sequelize = require('../../config/database');
// const { DataTypes } = require('sequelize');
const {Region} = require('./models/region');
const {Area} = require('./models/area');
const {Npp} = require('./models/npp');
const {Route} = require('./models/route');

// Define relationships
Area.belongsTo(Region, { foreignKey: 'region_id' });
Region.hasMany(Area, { foreignKey: 'region_id' });

Npp.belongsTo(Area, { foreignKey: 'area_id' });
Area.hasMany(Npp, { foreignKey: 'area_id' });

Route.belongsTo(Npp, { foreignKey: 'npp_id' });
Npp.hasMany(Route, { foreignKey: 'npp_id' });

module.exports = {
  sequelize,
  Region,
  Area,
  Npp,
  Route,
};