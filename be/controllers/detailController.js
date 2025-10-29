// routes/detailRoutes.js hoặc controllers/detailController.js
const express = require('express');
const router = express.Router();
const Detail = require('../api/sequelize/models/table/detail');
const Route = require('../api/sequelize/models/location/route');
const TotalDetail = require('../api/sequelize/models/table/totalDetail');

// API endpoint để lấy dữ liệu cho bảng
router.get('/api/table-data', async (req, res) => {
  try {
    const { routeId, year, month } = req.query;
    
    // Tạo khoảng thời gian cho tháng được chọn
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    
    // Truy vấn dữ liệu từ bảng detail
    const details = await Detail.findAll({
      where: {
        route_id: routeId,
        detail_date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [
        {
          model: Route,
          attributes: ['route_id', 'route_name'] // Lấy thêm thông tin route nếu cần
        },
        {
          model: TotalDetail,
          attributes: ['totalDetail_id'] // Lấy thêm thông tin totalDetail nếu cần
        }
      ],
      order: [['detail_date', 'ASC']]
    });
    
    // Chuyển đổi dữ liệu sang format phù hợp với component
    const formattedData = formatDataForTable(details, year, month);
    
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching detail data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Hàm format dữ liệu
function formatDataForTable(details, year, month) {
  // Tạo map để nhóm dữ liệu theo ngày
  const dataMap = new Map();
  
  details.forEach(detail => {
    const date = new Date(detail.detail_date);
    const day = date.getDate();
    
    if (!dataMap.has(day)) {
      dataMap.set(day, []);
    }
    
    dataMap.get(day).push({
      dateKey: detail.detail_date,
      metrics: {
        value: detail.detail_value
      }
    });
  });
  
  // Tạo mảng days cho mỗi hàng
  const daysInMonth = new Date(year, month, 0).getDate();
  const rows = [];
  
  // Giả sử bạn muốn group theo một tiêu chí nào đó
  // Ví dụ đơn giản: mỗi row là một bản ghi
  const groupedData = groupDetailsByRow(details, daysInMonth);
  
  return groupedData;
}

function groupDetailsByRow(details, daysInMonth) {
  // Logic để group dữ liệu thành rows
  // Ví dụ: group theo totalDetail_id hoặc một tiêu chí khác
  const grouped = {};
  
  details.forEach(detail => {
    const key = detail.totalDetail_id; // Hoặc tiêu chí group khác
    
    if (!grouped[key]) {
      grouped[key] = {
        days: Array(daysInMonth).fill(null).map((_, i) => ({
          dateKey: null,
          metrics: { value: 0 }
        }))
      };
    }
    
    const day = new Date(detail.detail_date).getDate() - 1;
    grouped[key].days[day] = {
      dateKey: detail.detail_date,
      metrics: { value: detail.detail_value }
    };
  });
  
  return Object.values(grouped);
}

module.exports = router;