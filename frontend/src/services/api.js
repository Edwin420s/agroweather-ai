import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Weather endpoints
export const getWeather = async (params) => {
  try {
    const response = await api.get('/weather', { params });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch weather data');
    } else if (error.request) {
      throw new Error('Cannot connect to server. Please check if backend is running.');
    } else {
      throw new Error(error.message || 'An error occurred');
    }
  }
};

export const getAvailableCrops = async () => {
  try {
    const response = await api.get('/weather/crops');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch crops');
  }
};

export default api;