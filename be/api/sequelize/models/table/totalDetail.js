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
    totalDetail_name: { type: DataTypes.STRING, allowNull: false },
    total_formula: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Công thức tổng hợp tháng hoặc route",
    },
    day_formula: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Công thức tính giá trị mỗi ngày",
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
