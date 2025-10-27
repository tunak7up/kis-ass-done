const Region  = require("./region");
const Area = require("./area");
const  Npp  = require("./npp");
const  Route  = require("./route");

// Define relationships
Area.belongsTo(Region, { foreignKey: "region_id" });
Region.hasMany(Area, { foreignKey: "region_id" });

Npp.belongsTo(Area, { foreignKey: "area_id" });
Area.hasMany(Npp, { foreignKey: "area_id" });

Route.belongsTo(Npp, { foreignKey: "npp_id" });
Npp.hasMany(Route, { foreignKey: "npp_id" });

module.exports = {
  Region,
  Area,
  Npp,
  Route,
};
