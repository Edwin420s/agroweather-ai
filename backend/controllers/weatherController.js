const geocodingService = require('../services/geocodingService');
const weatherService = require('../services/weatherService');
const recommendationEngine = require('../utils/recommendationEngine');
const { CROPS } = require('../config/constants');

exports.getWeatherWithRecommendations = async (req, res, next) => {
    try {
        const { city, crop, lat, lon } = req.query;
        
        // Validate required parameters
        if (!city && (!lat || !lon)) {
            return res.status(400).json({
                error: 'Missing parameters',
                message: 'Please provide either city name or latitude/longitude coordinates',
                example: '/api/weather?city=Nairobi&crop=maize'
            });
        }
        
        // Validate crop parameter
        if (crop && !CROPS.includes(crop)) {
            return res.status(400).json({
                error: 'Invalid crop',
                message: `Crop must be one of: ${CROPS.join(', ')}`,
                provided: crop
            });
        }
        
        let latitude, longitude;
        let locationName = city || 'Unknown location';
        
        // Get coordinates from city name or use provided lat/lon
        if (city) {
            const geoData = await geocodingService.getCoordinates(city);
            latitude = geoData.lat;
            longitude = geoData.lon;
            locationName = geoData.display_name || city;
        } else {
            latitude = parseFloat(lat);
            longitude = parseFloat(lon);
            
            if (isNaN(latitude) || isNaN(longitude)) {
                return res.status(400).json({
                    error: 'Invalid coordinates',
                    message: 'Latitude and longitude must be valid numbers'
                });
            }
        }
        
        // Fetch weather data from Weather-AI API
        const weatherData = await weatherService.fetchWeatherData(latitude, longitude);
        
        // Generate farming recommendations based on weather and crop
        const recommendations = recommendationEngine.generateRecommendations(
            weatherData,
            crop || 'general'
        );
        
        // Calculate risk indicator
        const riskIndicator = recommendationEngine.calculateRiskIndicator(weatherData);
        
        // Prepare response
        const response = {
            success: true,
            location: {
                name: locationName,
                latitude: latitude,
                longitude: longitude
            },
            crop: crop || 'not specified',
            current_weather: {
                temperature: weatherData.current.temp,
                temperature_unit: '°C',
                humidity: weatherData.current.humidity,
                humidity_unit: '%',
                wind_speed: weatherData.current.wind_speed,
                wind_speed_unit: 'km/h',
                condition: weatherData.current.condition,
                rain_probability: weatherData.current.precip_probability || 0,
                rain_probability_unit: '%'
            },
            forecast: weatherData.forecast.map(day => ({
                date: day.date,
                min_temp: day.min_temp,
                max_temp: day.max_temp,
                condition: day.condition,
                rain_chance: day.precip_probability || 0
            })),
            ai_summary: weatherData.ai_summary,
            recommendations: recommendations,
            risk_indicator: riskIndicator,
            timestamp: new Date().toISOString()
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
};

exports.getAvailableCrops = (req, res) => {
    res.status(200).json({
        crops: CROPS,
        count: CROPS.length,
        description: 'Available crops for personalized farming recommendations'
    });
};

exports.checkWeatherAPIHealth = async (req, res, next) => {
    try {
        // Test with default coordinates (Nairobi)
        const testData = await weatherService.fetchWeatherData(-1.2921, 36.8219);
        res.status(200).json({
            status: 'healthy',
            weather_api: 'connected',
            last_response: 'successful',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            weather_api: 'disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
};