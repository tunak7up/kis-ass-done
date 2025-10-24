const sequelize = require('../../../../config/database');
const {DataTypes, Model} = require('sequelize'); 
const {Content} = require('./content')

class Kpi extends Model {}

Kpi.init({
    kpi_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    kpi_name: { type: DataTypes.STRING, allowNull: false },
    monthly_cumulative_calculation_type: { type: DataTypes.TEXT, allowNull: false },
    content_id: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: Content,
            key: 'content_id'
        },
    },
}, {
    sequelize,
    tableName: 'kpi',
    timestamps: true,
    freezeTableName: true,
});

module.exports = Kpi;
