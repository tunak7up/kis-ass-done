const sequelize = require('../../../../config/database');
const { DataTypes } = require('sequelize');

const Route = sequelize.define('Route', {
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
  },
}, {
  tableName: 'route',
  timestamps: false,
});

module.exports = {Route};