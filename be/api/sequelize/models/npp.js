const sequelize = require('../../../config/database');
const { DataTypes, Model } = require('sequelize');
const {Area} = require('./area');

const Npp = sequelize.define('Npp', {
  npp_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  npp_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Area,
      key: 'area_id'
    },
  },
}, {
  tableName: 'npp',
  timestamps: false,
});

module.exports = {Npp};
