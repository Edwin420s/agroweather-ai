const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack || err.message);
    
    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal server error';
    let errorType = err.errorType || 'server_error';
    
    // Handle specific error types
    if (err.message && err.message.includes('location not found')) {
        statusCode = 404;
        errorType = 'location_not_found';
        message = 'Location not found. Please check the city name or provide coordinates.';
    } else if (err.message && err.message.includes('Geocoding service error')) {
        statusCode = 502;
        errorType = 'geocoding_unavailable';
        message = 'Unable to geocode location. Please try again later or provide coordinates directly.';
    } else if (err.message && err.message.includes('Weather API error')) {
        statusCode = 502;
        errorType = 'weather_api_error';
        message = 'Weather service temporarily unavailable. Please try again later.';
    } else if (err.message && err.message.includes('API key')) {
        statusCode = 500;
        errorType = 'configuration_error';
        message = 'Weather service configuration error. Please contact support.';
    }
    
    res.status(statusCode).json({
        success: false,
        error: errorType,
        message: message,
        timestamp: new Date().toISOString()
    });
};

module.exports = errorHandler;