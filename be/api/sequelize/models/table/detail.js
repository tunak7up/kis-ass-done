const dbInstance = require("../../get-db-instance").getDbInstance();
const { DataTypes } = require("sequelize");
const TotalDetail = require("./totalDetail");
const Route = require("../../models/location/route");

const Detail = dbInstance.define(
  "Detail",
  {
    detail_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    detail_date: { type: DataTypes.DATE, allowNull: false },
    totalDetail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TotalDetail,
        key: "totalDetail_id",
      },
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Route,
        key: "route_id",
      },
    },
    detail_value: { type: DataTypes.FLOAT, allowNull: false },

    formula: {
      // lưu công thức tính detail_value dạng text, công thức có thể là chính value nhập vào hoặc value của kpi khác trong cùng 1 ngày cộng hoặc chia nhau
      type: DataTypes.TEXT,
      allowNull: true,
      comment:
        "Ví dụ: value(kpi_id=2, date='2025-10-01') / value(kpi_id=3, date='2025-10-01')",
    },
  },
  {
    tableName: "detail",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Detail;
