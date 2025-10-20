const express = require('express');
const router = express.Router();
const RoutesController = require('../controllers/routesController');

// Routes
router.get('/regions', RoutesController.getRegions);
router.get('/areas/:regionId', RoutesController.getAreas);
router.get('/npps/:areaId', RoutesController.getNpps);
router.get('/routes/:nppId', RoutesController.getRoutes);

module.exports = router;