const dbInstance = require("./api/sequelize/get-db-instance").getDbInstance();
const { sequelize } = require('./api/sequelize/index');
const { Content, Kpi, TotalDetail, Detail } = require('./api/sequelize/index');
const { Sequelize, Op} = require('sequelize');

async function test() {
  const contents = await Content.findAndCountAll({
    include: {
      model: Kpi,
      where: {
        [Op.or]: [{kpi_id: 1}, {kpi_id: 2}]
        
      },
      include: {
        model: TotalDetail,
        separate: true,
        limit: 5,
        include: {
          model: Detail,
          limit: 5
        }
      }
    },
  });
  console.log(JSON.stringify(contents, null, 2));
}
test();
