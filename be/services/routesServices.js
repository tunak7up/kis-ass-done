const { Region, Area, Npp, Route } = require('../api/sequelize');

class RoutesService {
  // Lấy danh sách Regions
  static async getRegions() {
    try {
      const regions = await Region.findAll({
        order: [['region_id', 'ASC']],
      });
      return regions;
    } catch (error) {
      throw new Error(`Lỗi khi lấy regions: ${error.message}`);
    }
  }

  // Lấy danh sách Areas theo Region ID
  static async getAreas(regionId) {

    if(!regionId || isNaN(Number(regionId))) {
      throw new Error('regionId không được để trống');
    }

    try {
      const areas = await Area.findAll({
        where: { region_id: regionId },
        order: [['area_id', 'ASC']],
      });
      return areas;
    } catch (error) {
      throw new Error(`Lỗi khi lấy areas: ${error.message}`);
    }
  }

  // Lấy danh sách Npps theo Area ID
  static async getNpps(areaId ) {

    if(!areaId || isNaN(Number(areaId))) {
      throw new Error('areaId không được để trống');
    }

    try {
      const npps = await Npp.findAll({
        where: { area_id: areaId },
        order: [['npp_id', 'ASC']],
      });
      return npps;
    } catch (error) {
      throw new Error(`Lỗi khi lấy npps: ${error.message}`);
    }
  }

  // Lấy danh sách Routes theo NPP ID
  static async getRoutes(nppId) {
    if(!nppId || isNaN(Number(nppId))) {
      throw new Error('nppId không được để trống');
    }
    try {
      const routes = await Route.findAll({
        where: { npp_id: nppId },
        order: [['route_id', 'ASC']],
      });
      return routes;
    } catch (error) {
      throw new Error(`Lỗi khi lấy routes: ${error.message}`);
    }
  }
}

module.exports = RoutesService;