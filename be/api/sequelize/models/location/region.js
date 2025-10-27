const dbInstance = require("../../get-db-instance").getDbInstance();
const { DataTypes } = require("sequelize");

const Region = dbInstance.define(
  "Region",
  {
    region_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    region_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "region",
    timestamps: false,
  }
);

module.exports = Region;
