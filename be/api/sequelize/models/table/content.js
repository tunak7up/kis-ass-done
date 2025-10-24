const sequelize = require('../../../../config/database');
const {DataTypes, Model} = require('sequelize'); 

class Content extends Model {}

Content.init({
    content_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content_name: { type: DataTypes.STRING, allowNull: false },
}, {
    sequelize,
    tableName: 'content',
    timestamps: true,
    freezeTableName: true,
});

module.exports = Content;