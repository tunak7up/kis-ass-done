const RoutesService = require('../services/routesServices');
const { Region, Area, Npp, Route } = require('../api/sequelize');
const { mockRegions, mockAreas, mockNpps, mockRoutes } = require('../api/mock-data');

jest.mock('../api/sequelize', () => ({
  Region: { 
    findAll: jest.fn() 
  },
  Area: { 
    findAll: jest.fn() 
  },
  Npp: { 
    findAll: jest.fn() 
  },
  Route: { 
    findAll: jest.fn() 
  },
  sequelize: {},
}));

describe('RoutesService - Complete Unit Tests', () => { 
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRegions()', () => {
    
    describe('Happy Path', () => {
      test('nên trả về danh sách tất cả regions', async () => {
        Region.findAll.mockResolvedValue(mockRegions);

        const result = await RoutesService.getRegions();

        expect(result).toEqual(mockRegions);
        expect(result).toHaveLength(3);
        expect(Region.findAll).toHaveBeenCalledWith({
          order: [['region_id', 'ASC']],
        });
      });

      test('nên trả về mảng rỗng khi không có regions', async () => {
        Region.findAll.mockResolvedValue([]);

        const result = await RoutesService.getRegions();

        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
      });

      test('nên trả về regions có cấu trúc đúng', async () => {
        // Arrange
        Region.findAll.mockResolvedValue(mockRegions);

        // Act
        const result = await RoutesService.getRegions();

        // Assert
        result.forEach((region) => {
          expect(region).toHaveProperty('region_id');
          expect(region).toHaveProperty('region_name');
        });
      });
    });

    describe('Exception Handling - Test try-catch block', () => {
      test('nên throw error khi database connection thất bại', async () => {
        // Arrange
        const dbError = new Error('Database connection failed');
        jest.spyOn(Region, 'findAll').mockRejectedValue(dbError);

        // Act & Assert
        await expect(RoutesService.getRegions()).rejects.toThrow(
          'Lỗi khi lấy regions: Database connection failed'
        );
      });

      test('nên throw error khi query timeout', async () => {
        // Arrange
        const timeoutError = new Error('Query timeout');
        jest.spyOn(Region, 'findAll').mockRejectedValue(timeoutError);

        // Act & Assert
        await expect(RoutesService.getRegions()).rejects.toThrow(
          'Lỗi khi lấy regions: Query timeout'
        );
      });

      test('nên throw error với message cụ thể', async () => {
        // Arrange
        const error = new Error('Specific error message');
        jest.spyOn(Region, 'findAll').mockRejectedValue(error);

        // Act & Assert
        await expect(RoutesService.getRegions()).rejects.toThrow(Error);
        await expect(RoutesService.getRegions()).rejects.toThrow(
          /Lỗi khi lấy regions/
        );
      });

      test('nên throw error khi ORM throw string thay vì Error', async () => {
        // Arrange
        jest.spyOn(Region, 'findAll').mockRejectedValue('Lỗi không xác định');

        // Act & Assert
        await expect(RoutesService.getRegions()).rejects.toThrow(Error);
        await expect(RoutesService.getRegions()).rejects.toThrow(
          "Lỗi khi lấy regions: undefined"
        );
      });
    });
  });

  // ================================================================
  // TEST getAreas(regionId)
  // ================================================================
  describe('getAreas(regionId)', () => {
    
    describe('Happy Path', () => {
      test('nên trả về danh sách areas theo regionId = 1', async () => {
        // Arrange
        const regionId = 1;
        const expectedAreas = mockAreas.filter(a => a.region_id === regionId);
        Area.findAll.mockResolvedValue(expectedAreas);

        // Act
        const result = await RoutesService.getAreas(regionId);

        // Assert
        expect(result).toEqual(expectedAreas);
        expect(result).toHaveLength(3);
      });

      test('nên trả về danh sách areas theo regionId = 2', async () => {
        // Arrange
        const regionId = 2;
        const expectedAreas = mockAreas.filter(a => a.region_id === regionId);
        Area.findAll.mockResolvedValue(expectedAreas);

        // Act
        const result = await RoutesService.getAreas(regionId);

        // Assert
        expect(result).toEqual(expectedAreas);
        expect(result).toHaveLength(1);
      });

      test('nên trả về mảng rỗng khi regionId không có areas', async () => {
        // Arrange
        Area.findAll.mockResolvedValue([]);

        // Act
        const result = await RoutesService.getAreas(999);

        // Assert
        expect(result).toEqual([]);
      });

      test('nên trả về mảng rỗng khi regionId quá lớn', async () => {
        // Arrange
        Area.findAll.mockResolvedValue([]);

        // Act
        const result = await RoutesService.getAreas(999999999);

        // Assert
        expect(result).toEqual([]);
      });

      test('nên gọi findAll với where và order đúng', async () => {
        // Arrange
        const regionId = 1;
        Area.findAll.mockResolvedValue([]);

        // Act
        await RoutesService.getAreas(regionId);

        // Assert
        expect(Area.findAll).toHaveBeenCalledWith({
          where: { region_id: regionId },
          order: [['area_id', 'ASC']],
        });
      });
    });

    describe('Validation - Test if-else blocks', () => {
      test('nên throw error khi regionId là null', async () => {
        // Act & Assert
        await expect(RoutesService.getAreas(null)).rejects.toThrow(
          'regionId không được để trống'
        );
      });

      test('nên throw error khi regionId là undefined', async () => {
        // Act & Assert
        await expect(RoutesService.getAreas(undefined)).rejects.toThrow(
          'regionId không được để trống'
        );
      });

      test('nên throw error khi regionId là chuỗi rỗng', async () => {
        // Act & Assert
        await expect(RoutesService.getAreas('')).rejects.toThrow(
          'regionId không được để trống'
        );
      });

      test('nên throw error khi regionId là 0', async () => {
        // Act & Assert
        await expect(RoutesService.getAreas(0)).rejects.toThrow(
          'regionId không được để trống'
        );
      });

      test('nên throw error khi regionId là chuỗi không phải số', async () => {
        // Act & Assert
        await expect(RoutesService.getAreas('abc')).rejects.toThrow(
          'regionId không được để trống'
        );
      });
    });

    describe('Exception Handling - Test try-catch block', () => {
      test('nên throw error khi database connection thất bại', async () => {
        // Arrange
        const dbError = new Error('Connection refused');
        jest.spyOn(Area, 'findAll').mockRejectedValue(dbError);

        // Act & Assert
        await expect(RoutesService.getAreas(1)).rejects.toThrow(
          'Lỗi khi lấy areas: Connection refused'
        );
      });

      test('nên throw error khi query bị lỗi syntax', async () => {
        // Arrange
        const syntaxError = new Error('SQL syntax error');
        jest.spyOn(Area, 'findAll').mockRejectedValue(syntaxError);

        // Act & Assert
        await expect(RoutesService.getAreas(1)).rejects.toThrow(
          'Lỗi khi lấy areas: SQL syntax error'
        );
      });

      test('nên throw error khi foreign key constraint fails', async () => {
        // Arrange
        const fkError = new Error('Foreign key constraint fails');
        jest.spyOn(Area, 'findAll').mockRejectedValue(fkError);

        // Act & Assert
        await expect(RoutesService.getAreas(1)).rejects.toThrow(
          'Lỗi khi lấy areas: Foreign key constraint fails'
        );
      });
    });
  });

  // ================================================================
  // TEST getNpps(areaId)
  // ================================================================
  describe('getNpps(areaId)', () => {
    
    describe('Happy Path', () => {
      test('nên trả về danh sách npps theo areaId = 1', async () => {
        // Arrange
        const areaId = 1;
        const expectedNpps = mockNpps.filter(n => n.area_id === areaId);
        Npp.findAll.mockResolvedValue(expectedNpps);

        // Act
        const result = await RoutesService.getNpps(areaId);

        // Assert
        expect(result).toEqual(expectedNpps);
        expect(result).toHaveLength(2);
      });

      test('nên trả về danh sách npps theo areaId = 2', async () => {
        // Arrange
        const areaId = 2;
        const expectedNpps = mockNpps.filter(n => n.area_id === areaId);
        Npp.findAll.mockResolvedValue(expectedNpps);

        // Act
        const result = await RoutesService.getNpps(areaId);

        // Assert
        expect(result).toEqual(expectedNpps);
        expect(result).toHaveLength(1);
      });

      test('nên trả về mảng rỗng khi areaId không có npps', async () => {
        // Arrange
        Npp.findAll.mockResolvedValue([]);

        // Act
        const result = await RoutesService.getNpps(999);

        // Assert
        expect(result).toEqual([]);
      });

      test('nên gọi findAll với where và order đúng', async () => {
        // Arrange
        const areaId = 5;
        Npp.findAll.mockResolvedValue([]);

        // Act
        await RoutesService.getNpps(areaId);

        // Assert
        expect(Npp.findAll).toHaveBeenCalledWith({
          where: { area_id: areaId },
          order: [['npp_id', 'ASC']],
        });
      });
    });

    describe('Validation - Test if-else blocks', () => {
      test('nên throw error khi areaId là null', async () => {
        // Act & Assert
        await expect(RoutesService.getNpps(null)).rejects.toThrow(
          'areaId không được để trống'
        );
      });

      test('nên throw error khi areaId là undefined', async () => {
        // Act & Assert
        await expect(RoutesService.getNpps(undefined)).rejects.toThrow(
          'areaId không được để trống'
        );
      });

      test('nên throw error khi areaId là chuỗi rỗng', async () => {
        // Act & Assert
        await expect(RoutesService.getNpps('')).rejects.toThrow(
          'areaId không được để trống'
        );
      });

      test('nên throw error khi areaId là chuỗi không phải số', async () => {
        // Act & Assert
        await expect(RoutesService.getNpps('abc')).rejects.toThrow(
          'areaId không được để trống'
        );
      });

      test('nên throw error khi areaId là 0', async () => {
        // Act & Assert
        await expect(RoutesService.getNpps(0)).rejects.toThrow(
          'areaId không được để trống'
        );
      });
    });

    describe('Exception Handling - Test try-catch block', () => {
      test('nên throw error khi database connection thất bại', async () => {
        // Arrange
        const dbError = new Error('Database unavailable');
        jest.spyOn(Npp, 'findAll').mockRejectedValue(dbError);

        // Act & Assert
        await expect(RoutesService.getNpps(1)).rejects.toThrow(
          'Lỗi khi lấy npps: Database unavailable'
        );
      });

      test('nên throw error khi query timeout', async () => {
        // Arrange
        const timeoutError = new Error('Statement timeout');
        jest.spyOn(Npp, 'findAll').mockRejectedValue(timeoutError);

        // Act & Assert
        await expect(RoutesService.getNpps(1)).rejects.toThrow(
          'Lỗi khi lấy npps: Statement timeout'
        );
      });

      test('nên throw error khi permission denied', async () => {
        // Arrange
        const permissionError = new Error('Access denied');
        jest.spyOn(Npp, 'findAll').mockRejectedValue(permissionError);

        // Act & Assert
        await expect(RoutesService.getNpps(1)).rejects.toThrow(
          'Lỗi khi lấy npps: Access denied'
        );
      });
    });
  });

  // ================================================================
  // TEST getRoutes(nppId)
  // ================================================================
  describe('getRoutes(nppId)', () => {
    
    describe('Happy Path', () => {
      test('nên trả về danh sách routes theo nppId = 1', async () => {
        // Arrange
        const nppId = 1;
        const expectedRoutes = mockRoutes.filter(r => r.npp_id === nppId);
        Route.findAll.mockResolvedValue(expectedRoutes);

        // Act
        const result = await RoutesService.getRoutes(nppId);

        // Assert
        expect(result).toEqual(expectedRoutes);
        expect(result).toHaveLength(2);
      });

      test('nên trả về danh sách routes theo nppId = 4', async () => {
        // Arrange
        const nppId = 4;
        const expectedRoutes = mockRoutes.filter(r => r.npp_id === nppId);
        Route.findAll.mockResolvedValue(expectedRoutes);

        // Act
        const result = await RoutesService.getRoutes(nppId);

        // Assert
        expect(result).toEqual(expectedRoutes);
        expect(result).toHaveLength(0);
      });

      test('nên trả về mảng rỗng khi nppId không có routes', async () => {
        // Arrange
        Route.findAll.mockResolvedValue([]);

        // Act
        const result = await RoutesService.getRoutes(999);

        // Assert
        expect(result).toEqual([]);
      });

      test('nên gọi findAll với where và order đúng', async () => {
        // Arrange
        const nppId = 7;
        Route.findAll.mockResolvedValue([]);

        // Act
        await RoutesService.getRoutes(nppId);

        // Assert
        expect(Route.findAll).toHaveBeenCalledWith({
          where: { npp_id: nppId },
          order: [['route_id', 'ASC']],
        });
      });
    });

    describe('Validation - Test if-else blocks', () => {  
      test('nên throw error khi nppId là null', async () => {
        // Act & Assert
        await expect(RoutesService.getRoutes(null)).rejects.toThrow(
          'nppId không được để trống'
        );
      });

      test('nên throw error khi nppId là undefined', async () => {
        // Act & Assert
        await expect(RoutesService.getRoutes(undefined)).rejects.toThrow(
          'nppId không được để trống'
        );
      });

      test('nên throw error khi nppId là chuỗi rỗng', async () => {
        // Act & Assert
        await expect(RoutesService.getRoutes('')).rejects.toThrow(
          'nppId không được để trống'
        );
      });

      test('nên throw error khi nppId là chuỗi không phải số', async () => {
        // Act & Assert
        await expect(RoutesService.getRoutes('abc')).rejects.toThrow(
          'nppId không được để trống'
        );
      });

      test('nên throw error khi nppId là 0', async () => {
        // Act & Assert
        await expect(RoutesService.getRoutes(0)).rejects.toThrow(
          'nppId không được để trống'
        );
      });

    });

    describe('Exception Handling - Test try-catch block', () => {
      test('nên throw error khi database connection thất bại', async () => {
        // Arrange
        const dbError = new Error('Connection timeout');
        jest.spyOn(Route, 'findAll').mockRejectedValue(dbError);

        // Act & Assert
        await expect(RoutesService.getRoutes(1)).rejects.toThrow(
          'Lỗi khi lấy routes: Connection timeout'
        );
      });

      test('nên throw error khi query execution failed', async () => {
        // Arrange
        const execError = new Error('Query execution failed');
        jest.spyOn(Route, 'findAll').mockRejectedValue(execError);

        // Act & Assert
        await expect(RoutesService.getRoutes(1)).rejects.toThrow(
          'Lỗi khi lấy routes: Query execution failed'
        );
      });

      test('nên throw error khi table không tồn tại', async () => {
        // Arrange
        const tableError = new Error("Table 'route' doesn't exist");
        jest.spyOn(Route, 'findAll').mockRejectedValue(tableError);

        // Act & Assert
        await expect(RoutesService.getRoutes(1)).rejects.toThrow(
          "Lỗi khi lấy routes: Table 'route' doesn't exist"
        );
      });
    });
  });

});