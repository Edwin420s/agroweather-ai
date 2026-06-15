const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// GET /api/weather - Main weather and recommendations endpoint
router.get('/', weatherController.getWeatherWithRecommendations);

// GET /api/weather/crops - Get available crops list
router.get('/crops', weatherController.getAvailableCrops);

// GET /api/weather/health - Weather API health check
router.get('/health', weatherController.checkWeatherAPIHealth);

module.exports = router;