const dbInstance = require("../../get-db-instance").getDbInstance();
const { DataTypes } = require('sequelize');
const Npp = require('./npp')

const Route = dbInstance.define("Route", {
  route_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  route_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  npp_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Npp, 
      key: 'npp_id'
    },
  },
}, {
  tableName: 'route',
  timestamps: false,
});

module.exports = Route;