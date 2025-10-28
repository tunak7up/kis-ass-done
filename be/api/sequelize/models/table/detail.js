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
  },
  {
    tableName: "detail",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Detail;
