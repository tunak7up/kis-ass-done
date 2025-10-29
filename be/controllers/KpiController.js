// controllers/KpiController.js
const KpiService = require('../services/kpiService');

class KpiController {
  // GET /api/kpi-structure
  static async getKpiStructure(req, res) {
    try {
      const { routeId, year, month } = req.query;
      
      if (!routeId || !year || !month) {
        return res.status(400).json({ 
          error: 'routeId, year, và month là bắt buộc' 
        });
      }

      const structure = await KpiService.getKpiStructure(
        routeId,
        parseInt(year),
        parseInt(month)
      );
      
      res.status(200).json(structure);
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        error: error.message,
        message: 'Lỗi khi lấy cấu trúc KPI' 
      });
    }
  }
}

module.exports = KpiController;