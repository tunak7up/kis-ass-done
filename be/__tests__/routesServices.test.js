const RoutesService = require('../services/routesServices');
const { Region, Area, Npp, Route } = require('../models');
const { mockRegions, mockAreas, mockNpps, mockRoutes } = require('./setup');

// Mock models
jest.mock('../models', () => ({
  Region: { findAll: jest.fn() },
  Area: { findAll: jest.fn() },
  Npp: { findAll: jest.fn() },
  Route: { findAll: jest.fn() },
  sequelize: {},
}));

describe('RoutesService', () => {
  
  // ===== REGIONS TESTS =====
  describe('getRegions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('phải trả về danh sách regions thành công', async () => {
      Region.findAll.mockResolvedValue(mockRegions);

      const result = await RoutesService.getRegions();

      expect(result).toEqual(mockRegions);
      expect(result).toHaveLength(3);
      expect(Region.findAll).toHaveBeenCalledWith({
        order: [['region_id', 'ASC']],
      });
    });

    test('phải có region_id và region_name', async () => {
      Region.findAll.mockResolvedValue(mockRegions);

      const result = await RoutesService.getRegions();

      result.forEach((region) => {
        expect(region).toHaveProperty('region_id');
        expect(region).toHaveProperty('region_name');
        expect(typeof region.region_id).toBe('number');
        expect(typeof region.region_name).toBe('string');
      });
    });

    test('phải throw lỗi khi database lỗi', async () => {
      const error = new Error('Database connection failed');
      Region.findAll.mockRejectedValue(error);

      await expect(RoutesService.getRegions()).rejects.toThrow(
        'Lỗi khi lấy regions: Database connection failed'
      );
    });

    test('phải trả về mảng rỗng nếu không có regions', async () => {
      Region.findAll.mockResolvedValue([]);

      const result = await RoutesService.getRegions();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  // ===== AREAS TESTS =====
  describe('getAreas', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('phải trả về danh sách areas theo regionId', async () => {
      const regionId = 1;
      const expectedAreas = mockAreas.filter(a => a.region_id === regionId);
      Area.findAll.mockResolvedValue(expectedAreas);

      const result = await RoutesService.getAreas(regionId);

      expect(result).toEqual(expectedAreas);
      expect(result).toHaveLength(3);
      expect(Area.findAll).toHaveBeenCalledWith({
        where: { region_id: regionId },
        order: [['area_id', 'ASC']],
      });
    });

    test('phải có area_id, area_name, region_id', async () => {
      Area.findAll.mockResolvedValue(mockAreas);

      const result = await RoutesService.getAreas(1);

      result.forEach((area) => {
        expect(area).toHaveProperty('area_id');
        expect(area).toHaveProperty('area_name');
        expect(area).toHaveProperty('region_id');
        expect(typeof area.area_id).toBe('number');
        expect(typeof area.area_name).toBe('string');
      });
    });

    test('phải trả về mảng rỗng nếu không có areas cho regionId', async () => {
      Area.findAll.mockResolvedValue([]);

      const result = await RoutesService.getAreas(999);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    test('phải throw lỗi khi database lỗi', async () => {
      const error = new Error('Query failed');
      Area.findAll.mockRejectedValue(error);

      await expect(RoutesService.getAreas(1)).rejects.toThrow(
        'Lỗi khi lấy areas: Query failed'
      );
    });

    test('phải gọi findAll với regionId chính xác', async () => {
      Area.findAll.mockResolvedValue([]);

      await RoutesService.getAreas(2);

      expect(Area.findAll).toHaveBeenCalledWith({
        where: { region_id: 2 },
        order: [['area_id', 'ASC']],
      });
    });
  });

  // ===== NPPS TESTS =====
  describe('getNpps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('phải trả về danh sách npps theo areaId', async () => {
      const areaId = 1;
      const expectedNpps = mockNpps.filter(n => n.area_id === areaId);
      Npp.findAll.mockResolvedValue(expectedNpps);

      const result = await RoutesService.getNpps(areaId);

      expect(result).toEqual(expectedNpps);
      expect(result).toHaveLength(2);
      expect(Npp.findAll).toHaveBeenCalledWith({
        where: { area_id: areaId },
        order: [['npp_id', 'ASC']],
      });
    });

    test('phải có npp_id, npp_name, area_id', async () => {
      Npp.findAll.mockResolvedValue(mockNpps);

      const result = await RoutesService.getNpps(1);

      result.forEach((npp) => {
        expect(npp).toHaveProperty('npp_id');
        expect(npp).toHaveProperty('npp_name');
        expect(npp).toHaveProperty('area_id');
        expect(typeof npp.npp_id).toBe('number');
        expect(typeof npp.npp_name).toBe('string');
      });
    });

    test('phải trả về mảng rỗng nếu không có npps cho areaId', async () => {
      Npp.findAll.mockResolvedValue([]);

      const result = await RoutesService.getNpps(999);

      expect(result).toEqual([]);
    });

    test('phải throw lỗi khi database lỗi', async () => {
      const error = new Error('Database error');
      Npp.findAll.mockRejectedValue(error);

      await expect(RoutesService.getNpps(1)).rejects.toThrow(
        'Lỗi khi lấy npps: Database error'
      );
    });
  });

  // ===== ROUTES TESTS =====
  describe('getRoutes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('phải trả về danh sách routes theo nppId', async () => {
      const nppId = 1;
      const expectedRoutes = mockRoutes.filter(r => r.npp_id === nppId);
      Route.findAll.mockResolvedValue(expectedRoutes);

      const result = await RoutesService.getRoutes(nppId);

      expect(result).toEqual(expectedRoutes);
      expect(result).toHaveLength(2);
      expect(Route.findAll).toHaveBeenCalledWith({
        where: { npp_id: nppId },
        order: [['route_id', 'ASC']],
      });
    });

    test('phải có route_id, route_name, npp_id', async () => {
      Route.findAll.mockResolvedValue(mockRoutes);

      const result = await RoutesService.getRoutes(1);

      result.forEach((route) => {
        expect(route).toHaveProperty('route_id');
        expect(route).toHaveProperty('route_name');
        expect(route).toHaveProperty('npp_id');
        expect(typeof route.route_id).toBe('number');
        expect(typeof route.route_name).toBe('string');
      });
    });

    test('phải trả về mảng rỗng nếu không có routes cho nppId', async () => {
      Route.findAll.mockResolvedValue([]);

      const result = await RoutesService.getRoutes(999);

      expect(result).toEqual([]);
    });

    test('phải throw lỗi khi database lỗi', async () => {
      const error = new Error('Connection timeout');
      Route.findAll.mockRejectedValue(error);

      await expect(RoutesService.getRoutes(1)).rejects.toThrow(
        'Lỗi khi lấy routes: Connection timeout'
      );
    });

    test('phải gọi findAll với nppId chính xác', async () => {
      Route.findAll.mockResolvedValue([]);

      await RoutesService.getRoutes(5);

      expect(Route.findAll).toHaveBeenCalledWith({
        where: { npp_id: 5 },
        order: [['route_id', 'ASC']],
      });
    });
  });

});