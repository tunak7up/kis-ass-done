// Mock data cho database
const mockRegions = [
  { region_id: 1, region_name: 'Miền Bắc' },
  { region_id: 2, region_name: 'Miền Trung' },
  { region_id: 3, region_name: 'Miền Nam' },
];

const mockAreas = [
  { area_id: 1, area_name: 'Bắc Từ Liêm', region_id: 1 },
  { area_id: 2, area_name: 'Cầu Giấy', region_id: 1 },
  { area_id: 3, area_name: 'Hoàng Mai', region_id: 1 },
  { area_id: 6, area_name: 'Đà Nẵng', region_id: 2 },
];

const mockNpps = [
  { npp_id: 1, npp_name: 'NPP Hà Nội A', area_id: 1 },
  { npp_id: 2, npp_name: 'NPP Hà Nội B', area_id: 1 },
  { npp_id: 3, npp_name: 'NPP Cầu Giấy A', area_id: 2 },
  { npp_id: 7, npp_name: 'NPP Đà Nẵng A', area_id: 6 },
];

const mockRoutes = [
  { route_id: 16, route_name: 'Route HN-BT-01', npp_id: 1 },
  { route_id: 17, route_name: 'Route HN-BT-02', npp_id: 1 },
  { route_id: 18, route_name: 'Route HN-BT-03', npp_id: 2 },
  { route_id: 24, route_name: 'Route DN-01', npp_id: 7 },
];

module.exports = {
  mockRegions,
  mockAreas,
  mockNpps,
  mockRoutes,
};