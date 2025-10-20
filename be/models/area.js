const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Area = sequelize.define('Area', {
  area_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  area_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'area',
  timestamps: false,
});

module.exports = {Area};