const dbInstance = require("./api/sequelize/get-db-instance").getDbInstance();
const {sequelize} = require('./api/sequelize/index');
const {Kpi, TotalDetail} = require('./api/sequelize/index');

async function test() {
  await sequelize.sync({ alter: true });
  try {
      await TotalDetail.bulkCreate([
      {
        totalDetail_name: "Kế hoạch VT tháng",
        formula: "SUM(detail_value WHERE MONTH(detail_date)=MONTH(CURRENT_DATE()) AND kpi_id = this.kpi_id)",
        kpi_id: 3,
      },
      {
        totalDetail_name: "Viếng thăm thực tế tháng",
        formula: "SUM(detail_value WHERE MONTH(detail_date)=MONTH(CURRENT_DATE()) AND kpi_id = this.kpi_id)",
        kpi_id: 4,
      },
      {
        totalDetail_name: "% VT/KH",
        formula: "(value(totalDetail_name='Viếng thăm thực tế tháng') / value(totalDetail_name='Kế hoạch VT tháng')) * 100",
        kpi_id: 5,
      },
    ]);

    console.log("✅ Thêm KPI thành công");
  } catch (err) {
    console.error("❌ Lỗi:", err);
    process.exit(1);
  }
}
test();
