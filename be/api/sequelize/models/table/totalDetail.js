const dbInstance = require("../../get-db-instance").getDbInstance();
const { DataTypes } = require("sequelize");
const Kpi = require("./kpi");

const TotalDetail = dbInstance.define(
  "totalDetail",
  {
    totalDetail_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalDetail_name: { type: DataTypes.STRING, allowNull: false }, //1 kpi có nhiều detail_name
    formula: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kpi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kpi,
        key: "kpi_id",
      },
    },
  },
  {
    tableName: "totalDetail",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = TotalDetail;
