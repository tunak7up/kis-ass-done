const dbInstance = require("../../get-db-instance").getDbInstance();
const { DataTypes } = require("sequelize");
const Region = require("./region");

const Area = dbInstance.define(
  "Area",
  {
    area_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    area_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Region,
        key: "region_id",
      },
    },
  },
  {
    tableName: "area",
    timestamps: false,
  }
);

module.exports = Area;
