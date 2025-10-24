const { TableData } = require('../api/sequelize/index');

exports.getTableData = async (req, res) => {
  try {
    const { routeId, year, month } = req.query;
    if (!routeId || !year || !month) {
      return res.status(400).json({ error: 'Thiếu routeId, year hoặc month' });
    }

    const records = await TableData.findAll({ where: { route_id: routeId, year, month } });

    // giả sử 5 dòng mỗi ngày
    const rows = Array.from({ length: 5 }, () => ({
      days: records.map(r => ({
        dateKey: `${year}-${month}-${r.day}`,
        metrics: { value: r.value },
      }))
    }));

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu bảng' });
  }
};
