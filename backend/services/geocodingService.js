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
            console.error('Geocoding error:', error.message);
            
            // Use fallback coordinates for common cities if geocoding fails
            const fallbackCoords = this.getFallbackCoordinates(city);
            if (fallbackCoords) {
                console.warn(`Using fallback coordinates for ${city}`);
                return fallbackCoords;
            }
            
            if (error.response) {
                throw new Error(`Geocoding service error: ${error.response.status} - ${error.response.statusText}`);
            } else if (error.request) {
                throw new Error('Geocoding service unavailable. Please check your internet connection.');
            } else {
                throw new Error(`Geocoding failed: ${error.message}`);
            }
        }
    }
    
    getFallbackCoordinates(city) {
        // Fallback coordinates for common Kenyan cities when geocoding fails
        const cityLower = city.toLowerCase();
        const fallbackMap = {
            'nairobi': { lat: -1.2921, lon: 36.8219, display_name: 'Nairobi, Kenya', city: 'Nairobi', country: 'Kenya' },
            'mombasa': { lat: -4.0435, lon: 39.6682, display_name: 'Mombasa, Kenya', city: 'Mombasa', country: 'Kenya' },
            'kisumu': { lat: -0.0917, lon: 34.7679, display_name: 'Kisumu, Kenya', city: 'Kisumu', country: 'Kenya' },
            'nakuru': { lat: -0.3031, lon: 36.0674, display_name: 'Nakuru, Kenya', city: 'Nakuru', country: 'Kenya' },
            'eldoret': { lat: 0.5143, lon: 35.2698, display_name: 'Eldoret, Kenya', city: 'Eldoret', country: 'Kenya' },
            'meru': { lat: 0.0475, lon: 37.6493, display_name: 'Meru, Kenya', city: 'Meru', country: 'Kenya' },
            'naivasha': { lat: -0.7138, lon: 36.4315, display_name: 'Naivasha, Kenya', city: 'Naivasha', country: 'Kenya' },
            'thika': { lat: -1.0333, lon: 37.0667, display_name: 'Thika, Kenya', city: 'Thika', country: 'Kenya' },
            'karatina': { lat: -0.4833, lon: 37.1167, display_name: 'Karatina, Kenya', city: 'Karatina', country: 'Kenya' },
            'nyeri': { lat: -0.4167, lon: 36.9333, display_name: 'Nyeri, Kenya', city: 'Nyeri', country: 'Kenya' },
            'kitale': { lat: 1.0167, lon: 35.0000, display_name: 'Kitale, Kenya', city: 'Kitale', country: 'Kenya' },
            'kakamega': { lat: 0.2833, lon: 34.7500, display_name: 'Kakamega, Kenya', city: 'Kakamega', country: 'Kenya' },
            'bomet': { lat: -0.7833, lon: 35.3500, display_name: 'Bomet, Kenya', city: 'Bomet', country: 'Kenya' },
            'kericho': { lat: -0.3667, lon: 35.2833, display_name: 'Kericho, Kenya', city: 'Kericho', country: 'Kenya' },
            'nanyuki': { lat: 0.0167, lon: 37.0667, display_name: 'Nanyuki, Kenya', city: 'Nanyuki', country: 'Kenya' },
            'machakos': { lat: -1.5167, lon: 37.2667, display_name: 'Machakos, Kenya', city: 'Machakos', country: 'Kenya' },
            'garissa': { lat: -0.4533, lon: 39.6467, display_name: 'Garissa, Kenya', city: 'Garissa', country: 'Kenya' },
            'lamu': { lat: -2.2667, lon: 40.9000, display_name: 'Lamu, Kenya', city: 'Lamu', country: 'Kenya' },
            'malindi': { lat: -3.2167, lon: 40.1167, display_name: 'Malindi, Kenya', city: 'Malindi', country: 'Kenya' },
            'voi': { lat: -3.4000, lon: 38.5500, display_name: 'Voi, Kenya', city: 'Voi', country: 'Kenya' },
            'embu': { lat: -0.5333, lon: 37.4500, display_name: 'Embu, Kenya', city: 'Embu', country: 'Kenya' },
            'chuka': { lat: -0.3167, lon: 37.5333, display_name: 'Chuka, Kenya', city: 'Chuka', country: 'Kenya' },
            'muranga': { lat: -0.8333, lon: 37.1500, display_name: 'Murang\'a, Kenya', city: 'Murang\'a', country: 'Kenya' },
            'kiambu': { lat: -1.1667, lon: 36.8333, display_name: 'Kiambu, Kenya', city: 'Kiambu', country: 'Kenya' },
            'juja': { lat: -1.1000, lon: 37.0000, display_name: 'Juja, Kenya', city: 'Juja', country: 'Kenya' },
            'ruiru': { lat: -1.1500, lon: 36.9500, display_name: 'Ruiru, Kenya', city: 'Ruiru', country: 'Kenya' },
            'kikuyu': { lat: -1.2500, lon: 36.6833, display_name: 'Kikuyu, Kenya', city: 'Kikuyu', country: 'Kenya' },
            'limuru': { lat: -1.2500, lon: 36.6500, display_name: 'Limuru, Kenya', city: 'Limuru', country: 'Kenya' },
            'nairobi cbd': { lat: -1.2864, lon: 36.8172, display_name: 'Nairobi CBD, Kenya', city: 'Nairobi', country: 'Kenya' },
            'westlands': { lat: -1.2667, lon: 36.8000, display_name: 'Westlands, Nairobi, Kenya', city: 'Nairobi', country: 'Kenya' },
            'eastleigh': { lat: -1.2500, lon: 36.8667, display_name: 'Eastleigh, Nairobi, Kenya', city: 'Nairobi', country: 'Kenya' },
            'karen': { lat: -1.3167, lon: 36.7667, display_name: 'Karen, Nairobi, Kenya', city: 'Nairobi', country: 'Kenya' },
        };
        
        // Try to find a match (case-insensitive)
        for (const [key, value] of Object.entries(fallbackMap)) {
            if (cityLower.includes(key)) {
                return value;
            }
        }
        
        // Default to Nairobi if no match found
        console.warn(`No fallback coordinates for ${city}, using Nairobi as default`);
        return fallbackMap['nairobi'];
    }
}

module.exports = new GeocodingService();