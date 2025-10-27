const dbInstance = require("../../get-db-instance").getDbInstance();
const { DataTypes } = require("sequelize");

const Content = dbInstance.define(
  "Content",
  {
    content_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content_name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "content",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Content;
