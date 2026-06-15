import { useState, useCallback } from 'react';
import { getWeather } from '../services/api';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearch, setLastSearch] = useState(null);

  const fetchWeather = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(params);
      setWeatherData(data);
      setLastSearch(params);
      return data;
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = () => setError(null);

  return {
    weatherData,
    loading,
    error,
    lastSearch,
    fetchWeather,
    clearError,
  };
};