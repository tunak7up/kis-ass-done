const sequelize = require('../../../config/database');
const { DataTypes } = require('sequelize');
const {Route} = require('./location/route');

const TableData = sequelize.define('TableData', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    route_id: { 
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: Route,
            key: 'id'
        },
    },
    year: { type: DataTypes.INTEGER, allowNull: false },
    month: { type: DataTypes.INTEGER, allowNull: false },
    day: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: false },
    }, {
    tableName: 'table_data',
    timestamps: false,
    freezeTableName: true,
    });
module.exports = TableData;