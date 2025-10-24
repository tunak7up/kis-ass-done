const sequelize = require('../../../../config/database');
const { DataTypes } = require('sequelize');

const Region = sequelize.define('Region', {
  region_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  region_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'region',
  timestamps: false,
});

module.exports = {Region};