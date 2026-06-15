const axios = require('axios');

class GeocodingService {
    constructor() {
        this.baseURL = 'https://nominatim.openstreetmap.org/search';
    }
    
    async getCoordinates(city) {
        try {
            const response = await axios.get(this.baseURL, {
                params: {
                    q: city,
                    format: 'json',
                    limit: 1,
                    addressdetails: 1
                },
                headers: {
                    'User-Agent': 'AgroWeather-AI-Assistant/1.0 (contact@agroweather.com)'
                },
                timeout: 5000
            });
            
            if (!response.data || response.data.length === 0) {
                throw new Error(`Location "${city}" not found. Please check the city name or use coordinates.`);
            }
            
            const location = response.data[0];
            
            return {
                lat: parseFloat(location.lat),
                lon: parseFloat(location.lon),
                display_name: location.display_name,
                city: location.address?.city || location.address?.town || location.address?.village || city,
                country: location.address?.country
            };
            
        } catch (error) {
            if (error.response) {
                throw new Error(`Geocoding service error: ${error.response.status} - ${error.response.statusText}`);
            } else if (error.request) {
                throw new Error('Geocoding service unavailable. Please check your internet connection.');
            } else {
                throw new Error(`Geocoding failed: ${error.message}`);
            }
        }
    }
}

module.exports = new GeocodingService();