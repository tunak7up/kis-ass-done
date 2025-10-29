// services/routesServices.js
const Region = require('../api/sequelize/models/location/region');
const Area = require('../api/sequelize/models/location/area');
const Npp = require('../api/sequelize/models/location/npp');
const Route = require('../api/sequelize/models/location/route');
const Detail = require('../api/sequelize/models/table/detail');
const { Op } = require('sequelize');

class RoutesService {
  static async getRegions() {
    return await Region.findAll({
      attributes: ['region_id', 'region_name'],
      order: [['region_name', 'ASC']]
    });
  }

  static async getAreas(regionId) {
    return await Area.findAll({
      where: { region_id: regionId },
      attributes: ['area_id', 'area_name'],
      order: [['area_name', 'ASC']]
    });
  }

  static async getNpps(areaId) {
    return await Npp.findAll({
      where: { area_id: areaId },
      attributes: ['npp_id', 'npp_name'],
      order: [['npp_name', 'ASC']]
    });
  }

  static async getRoutes(nppId) {
    return await Route.findAll({
      where: { npp_id: nppId },
      attributes: ['route_id', 'route_name'],
      order: [['route_name', 'ASC']]
    });
  }

  // ✅ THIẾU - Logic lấy dữ liệu cho bảng
  static async getTableData(routeId, year, month) {
    // Tạo khoảng thời gian cho tháng
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Lấy số ngày trong tháng
    const daysInMonth = new Date(year, month, 0).getDate();

    // Fetch dữ liệu từ bảng Detail
    const details = await Detail.findAll({
      where: {
        route_id: routeId,
        detail_date: {
          [Op.between]: [startDate, endDate]
        }
      },
      attributes: ['detail_id', 'detail_date', 'detail_value', 'totalDetail_id'],
      order: [['detail_date', 'ASC']]
    });

    // Group data theo totalDetail_id
    return this.formatTableData(details, daysInMonth);
  }

  static formatTableData(details, daysInMonth) {
    // Tạo map để group theo totalDetail_id
    const grouped = {};

    details.forEach(detail => {
      const key = detail.totalDetail_id;
      
      if (!grouped[key]) {
        // Khởi tạo mảng days với giá trị mặc định
        grouped[key] = {
          totalDetail_id: key,
          days: Array(daysInMonth).fill(null).map(() => ({
            dateKey: null,
            metrics: { value: 0 }
          }))
        };
      }

      // Lấy ngày trong tháng (1-31)
      const dayIndex = new Date(detail.detail_date).getDate() - 1;
      
      // Gán giá trị vào đúng ngày
      grouped[key].days[dayIndex] = {
        dateKey: detail.detail_date,
        metrics: { value: detail.detail_value }
      };
    });

    // Convert object thành array
    return Object.values(grouped);
  }
}

module.exports = RoutesService;