const sequelize = require('../../../../config/database');
const {DataTypes, Model} = require('sequelize'); 
const {KPI} = require('./kpi');
const {Route} = require('../../models/location/route');
class Detail extends Model {}
Detail.init({
    detail_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    detail_name: { type: DataTypes.STRING, allowNull: false },
    detail_date: { type: DataTypes.DATE, allowNull: false },
    kpi_id: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: KPI,
            key: 'kpi_id'
        },
    },
    route_id: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: Route,
            key: 'route_id'
        },
    },
    detail_value: { type: DataTypes.FLOAT, allowNull: false },
}, {
    sequelize,
    tableName: 'detail',
    timestamps: true,
    freezeTableName: true,
});
module.exports = Detail;