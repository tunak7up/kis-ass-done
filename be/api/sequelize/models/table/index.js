const Kpi = require("./kpi");
const Detail = require("./detail");
const Content = require("./content");
const TotalDetail = require('./totalDetail');

Content.hasMany(Kpi, {  foreignKey: "content_id" });
Kpi.belongsTo(Content, { foreignKey: "content_id" });

Kpi.hasMany(TotalDetail, { foreignKey: "kpi_id" });
TotalDetail.belongsTo(Kpi, { foreignKey: "kpi_id" });

TotalDetail.hasMany(Detail, { foreignKey: "totalDetail_id" });
Detail.belongsTo(TotalDetail, { foreignKey: "totalDetail_id" });

module.exports = {
  Kpi,
  Detail,
  Content,
  TotalDetail,
};
