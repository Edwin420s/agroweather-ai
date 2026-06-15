const { CROP_RECOMMENDATIONS } = require('../config/constants');

class RecommendationEngine {
    generateRecommendations(weatherData, crop) {
        const recommendations = [];
        const current = weatherData.current;
        const forecast = weatherData.forecast;
        
        // Check for rain in forecast
        const hasRainInForecast = forecast.some(day => 
            day.condition?.toLowerCase().includes('rain') || 
            (day.precip_probability && day.precip_probability > 60)
        );
        
        const rainProbability = current.precip_probability || 0;
        const isRaining = current.condition?.toLowerCase().includes('rain');
        const windSpeed = current.wind_speed || 0;
        const temperature = current.temp || 0;
        
        // General recommendations based on weather conditions
        if (hasRainInForecast || rainProbability > 50 || isRaining) {
            recommendations.push({
                type: 'weather_alert',
                title: '🌧️ Rain Expected',
                description: 'Rain is expected in the next 48 hours. Take necessary precautions.',
                action: isRaining ? 'Avoid field work until rain subsides.' : 'Prepare drainage systems and delay fertilizer application.'
            });
        }
        
        if (windSpeed > 30) {
            recommendations.push({
                type: 'weather_alert',
                title: '💨 Strong Winds Detected',
                description: `Wind speeds reaching ${windSpeed} km/h can damage crops.`,
                action: 'Avoid pesticide spraying. Consider windbreaks if winds persist.'
            });
        }
        
        if (temperature > 30) {
            recommendations.push({
                type: 'weather_alert',
                title: '🌡️ High Temperature Alert',
                description: `Temperatures at ${temperature}°C may cause heat stress.`,
                action: 'Increase irrigation frequency. Provide shade for sensitive crops.'
            });
        }
        
        if (temperature < 10) {
            recommendations.push({
                type: 'weather_alert',
                title: '❄️ Low Temperature Alert',
                description: `Cold temperatures (${temperature}°C) may affect crop growth.`,
                action: 'Delay planting sensitive crops. Use mulch to protect soil warmth.'
            });
        }
        
        // Crop-specific recommendations
        if (crop !== 'general' && CROP_RECOMMENDATIONS[crop]) {
            const cropRecs = CROP_RECOMMENDATIONS[crop];
            
            // Planting conditions
            if (hasRainInForecast || rainProbability > 40) {
                if (cropRecs.ideal_conditions.requires_rain) {
                    recommendations.push({
                        type: 'crop_recommendation',
                        title: `🌱 ${cropRecs.name}: Good Planting Conditions`,
                        description: `Rain expected in the coming days creates favorable conditions for ${cropRecs.name} planting.`,
                        action: cropRecs.recommendations.planting_good
                    });
                }
            } else if (temperature > 25 && !hasRainInForecast) {
                recommendations.push({
                    type: 'crop_recommendation',
                    title: `💧 ${cropRecs.name}: Irrigation Needed`,
                    description: `Dry and warm conditions require active irrigation for ${cropRecs.name}.`,
                    action: cropRecs.recommendations.irrigation_needed
                });
            }
            
            // Pest and disease risk
            if (rainProbability > 60 || (hasRainInForecast && temperature > 20)) {
                recommendations.push({
                    type: 'pest_alert',
                    title: `🐛 ${cropRecs.name}: Disease Risk Alert`,
                    description: `Humid conditions may promote fungal diseases in ${cropRecs.name}.`,
                    action: cropRecs.recommendations.disease_risk
                });
            }
            
            // General care
            recommendations.push({
                type: 'general_care',
                title: `📋 ${cropRecs.name} Care Tips`,
                description: cropRecs.general_care,
                action: cropRecs.recommendations.general
            });
        } else {
            // General farming recommendations when no specific crop is selected
            if (hasRainInForecast || rainProbability > 40) {
                recommendations.push({
                    type: 'general_recommendation',
                    title: '🌾 General Farming Advice',
                    description: 'Rainy conditions are favorable for most crops.',
                    action: 'Consider planting moisture-loving crops. Prepare soil before rains intensify.'
                });
            }
            
            if (windSpeed > 20) {
                recommendations.push({
                    type: 'general_recommendation',
                    title: '🌬️ Wind Advisory',
                    description: 'Windy conditions may affect crop stability.',
                    action: 'Avoid spraying operations. Check stakes and supports for climbing crops.'
                });
            }
        }
        
        // If no specific recommendations, provide a default
        if (recommendations.length === 0) {
            recommendations.push({
                type: 'general_info',
                title: '📊 Weather Update',
                description: 'Current conditions are normal for agricultural activities.',
                action: 'Continue with regular farming operations. Monitor forecast for changes.'
            });
        }
        
        return recommendations;
    }
    
    calculateRiskIndicator(weatherData) {
        const current = weatherData.current;
        const forecast = weatherData.forecast;
        
        // Check for heavy rain conditions
        const hasHeavyRain = forecast.some(day => 
            day.condition?.toLowerCase().includes('heavy') || 
            day.condition?.toLowerCase().includes('storm') ||
            (day.precip_probability && day.precip_probability > 80)
        ) || current.condition?.toLowerCase().includes('heavy');
        
        // Check for strong wind
        const hasStrongWind = (current.wind_speed || 0) > 30;
        
        // Check for extreme temperatures
        const hasExtremeTemp = (current.temp || 0) > 35 || (current.temp || 0) < 5;
        
        // Determine risk level
        if (hasHeavyRain) {
            return {
                level: 'High',
                color: '#ef4444',
                message: 'Heavy rain expected. High risk of flooding and crop damage.',
                icon: '⚠️'
            };
        } else if (hasStrongWind) {
            return {
                level: 'Medium',
                color: '#f59e0b',
                message: 'Strong winds detected. Moderate risk to crops and spraying operations.',
                icon: '🌬️'
            };
        } else if (hasExtremeTemp) {
            return {
                level: 'Medium',
                color: '#f59e0b',
                message: 'Extreme temperatures may affect crop growth.',
                icon: '🌡️'
            };
        } else {
            return {
                level: 'Low',
                color: '#10b981',
                message: 'Normal weather conditions. Low risk for agricultural activities.',
                icon: '✅'
            };
        }
    }
}

module.exports = new RecommendationEngine();