const RoutesService = require('../services/routesServices');

class RoutesController {
  // GET /api/regions
  static async getRegions(req, res) {
    try {
      const regions = await RoutesService.getRegions();
      res.status(200).json(regions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        error: error.message,
        message: 'Lỗi khi lấy danh sách regions' 
      });
    }
  }

  // GET /api/areas/:regionId
  static async getAreas(req, res) {
    try {
      const { regionId } = req.params;
      
      if (!regionId) {
        return res.status(400).json({ error: 'regionId là bắt buộc' });
      }

      const areas = await RoutesService.getAreas(regionId);
      res.status(200).json(areas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        error: error.message,
        message: 'Lỗi khi lấy danh sách areas' 
      });
    }
  }

  // GET /api/npps/:areaId
  static async getNpps(req, res) {
    try {
      const { areaId } = req.params;
      
      if (!areaId) {
        return res.status(400).json({ error: 'areaId là bắt buộc' });
      }

      const npps = await RoutesService.getNpps(areaId);
      res.status(200).json(npps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        error: error.message,
        message: 'Lỗi khi lấy danh sách npps' 
      });
    }
  }

  // GET /api/routes/:nppId
  static async getRoutes(req, res) {
    try {
      const { nppId } = req.params;
      
      if (!nppId) {
        return res.status(400).json({ error: 'nppId là bắt buộc' });
      }

      const routes = await RoutesService.getRoutes(nppId);
      res.status(200).json(routes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        error: error.message,
        message: 'Lỗi khi lấy danh sách routes' 
      });
    }
  }
}

module.exports = RoutesController;