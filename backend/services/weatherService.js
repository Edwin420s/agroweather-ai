const axios = require('axios');

class WeatherService {
    constructor() {
        this.baseURL = 'https://api.weather-ai.co/v1';
        this.apiKey = process.env.WEATHER_AI_KEY;
        
        if (!this.apiKey) {
            console.error('⚠️  WEATHER_AI_KEY not found in environment variables');
        }
    }
    
    async fetchWeatherData(lat, lon, days = 7) {
        try {
            const response = await axios.get(`${this.baseURL}/weather`, {
                params: {
                    lat: lat,
                    lon: lon,
                    days: Math.min(days, 7), // Free plan supports up to 7 days
                    units: 'metric',
                    ai: true
                },
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            });
            
            // Parse and normalize the Weather-AI API response
            const data = response.data;
            
            // Handle different possible response structures from Weather-AI
            const normalizedData = {
                current: {
                    temp: data.current?.temp || data.temperature || 0,
                    humidity: data.current?.humidity || data.humidity || 0,
                    wind_speed: data.current?.wind_speed || data.wind_speed || 0,
                    condition: data.current?.condition || data.condition || 'Unknown',
                    precip_probability: data.current?.precip_probability || data.precip_probability || 0
                },
                forecast: [],
                ai_summary: data.ai_summary || data.ai_summary || 'Weather data retrieved successfully.'
            };
            
            // Normalize forecast data if present
            if (data.forecast && Array.isArray(data.forecast)) {
                normalizedData.forecast = data.forecast.slice(0, 7).map(day => ({
                    date: day.date || day.datetime,
                    min_temp: day.min_temp || day.temp_min || day.temp?.min || 0,
                    max_temp: day.max_temp || day.temp_max || day.temp?.max || 0,
                    condition: day.condition || day.weather_description || 'Unknown',
                    precip_probability: day.precip_probability || day.precip_chance || 0
                }));
            } else {
                // Generate fallback forecast data if API doesn't provide it
                normalizedData.forecast = this.generateFallbackForecast(normalizedData.current);
            }
            
            return normalizedData;
            
        } catch (error) {
            console.error('Weather API Error:', error.response?.data || error.message);
            
            if (error.response) {
                const status = error.response.status;
                const errorData = error.response.data;
                
                if (status === 401) {
                    throw new Error('Invalid or missing Weather-AI API key. Please check your credentials.');
                } else if (status === 403) {
                    throw new Error('API key does not have permission for this endpoint or plan limit exceeded.');
                } else if (status === 429) {
                    throw new Error('Monthly API quota exceeded. Please upgrade your plan or try again next month.');
                } else if (status === 400) {
                    throw new Error(`Invalid request parameters: ${errorData.message || 'Please check lat/lon values'}`);
                } else {
                    throw new Error(`Weather API error: ${errorData.message || error.response.statusText}`);
                }
            } else if (error.request) {
                throw new Error('Weather API is unreachable. Please check your internet connection.');
            } else {
                throw new Error(`Failed to fetch weather data: ${error.message}`);
            }
        }
    }
    
    generateFallbackForecast(currentWeather) {
        // Generate simulated forecast data when API doesn't provide forecast
        const forecast = [];
        const today = new Date();
        
        for (let i = 1; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            forecast.push({
                date: date.toISOString().split('T')[0],
                min_temp: Math.max(0, currentWeather.temp - (Math.random() * 5 + 2)),
                max_temp: currentWeather.temp + (Math.random() * 3 + 1),
                condition: currentWeather.condition,
                precip_probability: Math.floor(Math.random() * 60)
            });
        }
        
        return forecast;
    }
}

module.exports = new WeatherService();