const dbInstance = require("../../get-db-instance").getDbInstance();
const { DataTypes } = require("sequelize");
const Content = require("./content");

const Kpi = dbInstance.define(
  "Kpi",
  {
    kpi_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    kpi_name: { type: DataTypes.STRING, allowNull: false }, //1 kpi có nhiều detail_name
    content_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Content,
        key: "content_id",
      },
    },
  },
  {
    tableName: "kpi",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Kpi;
