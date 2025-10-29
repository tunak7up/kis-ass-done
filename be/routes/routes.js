const express = require('express');
const router = express.Router();
const RoutesController = require('../controllers/routesController');
const KpiController = require('../controllers/KpiController');


router.get('/api/regions', RoutesController.getRegions);
router.get('/api/areas/:regionId', RoutesController.getAreas);
router.get('/api/npps/:areaId', RoutesController.getNpps);
router.get('/api/routes/:nppId', RoutesController.getRoutes);

router.get('/api/table-data', RoutesController.getTableData);
router.get('/api/kpi-structure', KpiController.getKpiStructure);

module.exports = router;