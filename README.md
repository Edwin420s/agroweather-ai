# AgroWeather AI Assistant

A full-stack web application that helps farmers make data-driven decisions by combining real-time weather data with AI-generated agricultural recommendations.

## Project Overview

AgroWeather AI Assistant fetches weather data from the Weather-AI API, analyzes it, and generates actionable farming recommendations tailored to specific crops and locations. The application provides current weather conditions, 7-day forecasts, risk assessments, and crop-specific advice to help farmers optimize their agricultural activities.

### Challenge Context

This project was completed as part of a 48-hour technical challenge for Weather-AI, demonstrating:
- API integration with Weather-AI's developer platform
- Full-stack development with React + Node.js
- Clean, responsive UI design following Material Design 3 principles
- Professional deployment workflow
- Comprehensive documentation

## Live Demo

- **Frontend:** https://agroweather-ai.netlify.app
- **Backend API:** https://agroweather-ai.onrender.com
- **API Health Check:** https://agroweather-ai.onrender.com/health
- **GitHub Repository:** https://github.com/Edwin420s/agroweather-ai

## Features

### Core Functionality

1. **Location Search**
   - Search by city name with automatic geocoding
   - Support for direct latitude/longitude input
   - Fallback coordinates for major Kenyan cities
   - Powered by OpenStreetMap Nominatim API

2. **Current Weather Display**
   - Temperature (Celsius)
   - Humidity percentage
   - Wind speed (km/h)
   - Weather condition (Cloudy, Sunny, Rainy, etc.)
   - Rain probability

3. **7-Day Forecast**
   - Daily minimum and maximum temperatures
   - Weather conditions
   - Rain chance percentage with visual indicators
   - Horizontal scrollable card layout

4. **Crop Selection**
   - 7 supported crops: Maize, Beans, Coffee, Tea, Wheat, Tomatoes, Potatoes
   - Crop-specific recommendations based on weather conditions
   - Ideal growing conditions for each crop

5. **AI Farming Recommendations**
   - Weather alerts (rain, wind, temperature extremes)
   - Crop-specific planting advice
   - Pest and disease risk warnings
   - Irrigation guidance
   - Fertilizer application timing

6. **Weather Risk Indicator**
   - Low Risk: Normal conditions for agricultural activities
   - Medium Risk: Strong winds or extreme temperatures
   - High Risk: Heavy rain or storms

### User Interface

- **Material Design 3** color system and components
- **Responsive layout** with mobile-first design
- **Desktop sidebar** navigation
- **Mobile bottom navigation** bar
- **Loading states** and error handling
- **Smooth animations** and hover effects

## Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.18.2 | Web framework |
| Axios | 1.6.2 | HTTP client for API calls |
| CORS | 2.8.5 | Cross-origin resource sharing |
| Helmet | 7.1.0 | Security headers |
| Express Rate Limit | 7.1.5 | API rate limiting |
| Dotenv | 16.3.1 | Environment variable management |
| Nodemon | 3.0.2 | Development auto-reload |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| Vite | 5.0.8 | Build tool and dev server |
| Tailwind CSS | 3.3.6 | Styling framework |
| React Router DOM | 6.20.1 | Client-side routing |
| Axios | 1.6.2 | HTTP client |
| Material Symbols | Google | Icon library |
| Inter Font | Google | Primary typeface |

### External APIs

- **Weather-AI API:** Weather data and AI-powered summaries
- **OpenStreetMap Nominatim:** Free geocoding service (city to coordinates)

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                            │
│                https://agroweather-ai.netlify.app           │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Frontend (React + Vite)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Dashboard  │  │  Forecast   │  │  AI Recommendations │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              API Service (Axios)                        │ │
│  │  GET /api/weather?city=Nairobi&crop=maize              │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                 Backend (Node.js + Express)                 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Weather Controller                         │ │
│  │  /api/weather → Geocode → Fetch Weather → Recommend    │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Geocoding   │  │   Weather    │  │  Recommendation │  │
│  │  Service     │  │   Service    │  │  Engine         │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      External APIs                          │
│  ┌─────────────────┐    ┌─────────────────────────────────┐│
│  │  Weather-AI API │    │  OpenStreetMap Nominatim        ││
│  │  /v1/weather    │    │  Geocoding Service              ││
│  └─────────────────┘    └─────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Weather-AI API key (obtain from https://weather-ai.co)

### 1. Clone the Repository

```bash
git clone https://github.com/Edwin420s/agroweather-ai.git
cd agroweather-ai
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit the `.env` file and add your Weather-AI API key:

```env
WEATHER_AI_KEY=wai_your_api_key_here
PORT=5000
```

Start the backend server:

```bash
npm run dev   # Development mode with auto-reload
# OR
npm start     # Production mode
```

The backend will run at: http://localhost:5000

### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit the `.env` file to point to your backend:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run at: http://localhost:3000

### 4. Test the Application

1. Open http://localhost:3000 in your browser
2. Enter a city (e.g., "Nairobi")
3. Select a crop (e.g., "maize")
4. Click "Check Weather"

## Environment Variables

### Backend (.env)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| WEATHER_AI_KEY | Weather-AI API key | Yes | wai_abc123... |
| PORT | Server port | No | 5000 |

### Frontend (.env)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| VITE_API_URL | Backend API base URL | Yes | http://localhost:5000/api |

## API Endpoints

### Base URL

```
https://agroweather-ai.onrender.com/api
```

### GET /weather

Fetch weather data and farming recommendations.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|-----------|-------------|
| city | string | Yes* | City name (e.g., "Nairobi") |
| lat | number | Yes* | Latitude (if no city) |
| lon | number | Yes* | Longitude (if no city) |
| crop | string | No | Crop type (maize, beans, coffee, tea, wheat, tomatoes, potatoes) |

*Either city OR (lat + lon) is required.

**Example Request:**

```bash
GET /api/weather?city=Nairobi&crop=maize
```

**Example Response:**

```json
{
  "success": true,
  "location": {
    "name": "Nairobi, Kenya",
    "latitude": -1.2921,
    "longitude": 36.8219
  },
  "crop": "maize",
  "current_weather": {
    "temperature": 24,
    "temperature_unit": "°C",
    "humidity": 68,
    "humidity_unit": "%",
    "wind_speed": 12,
    "wind_speed_unit": "km/h",
    "condition": "Partly Cloudy",
    "rain_probability": 45,
    "rain_probability_unit": "%"
  },
  "forecast": [
    {
      "date": "2026-06-17",
      "min_temp": 18,
      "max_temp": 26,
      "condition": "Partly Cloudy",
      "rain_chance": 45
    }
  ],
  "ai_summary": "Rain expected within 48 hours...",
  "recommendations": [
    {
      "type": "weather_alert",
      "title": "Rain Expected",
      "description": "Rain is expected in the next 48 hours.",
      "action": "Prepare drainage systems."
    }
  ],
  "risk_indicator": {
    "level": "Low",
    "color": "#10b981",
    "message": "Normal weather conditions.",
    "icon": "check_circle"
  },
  "timestamp": "2026-06-16T19:48:35.199Z"
}
```

### GET /weather/crops

Get list of available crops.

**Example Request:**

```bash
GET /api/weather/crops
```

**Example Response:**

```json
{
  "crops": ["maize", "beans", "coffee", "tea", "wheat", "tomatoes", "potatoes"],
  "count": 7,
  "description": "Available crops for personalized farming recommendations"
}
```

### GET /health

Health check endpoint.

**Example Request:**

```bash
GET /health
```

**Example Response:**

```json
{
  "status": "OK",
  "message": "AgroWeather AI Backend is running",
  "timestamp": "2026-06-16T19:47:59.671Z"
}
```

## Deployment

### Backend Deployment (Render)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** agroweather-ai
   - **Root Directory:** backend
   - **Build Command:** npm install
   - **Start Command:** npm start
6. Add environment variables:
   - `WEATHER_AI_KEY` = your_api_key
   - `PORT` = 5000
7. Click "Deploy"

### Frontend Deployment (Netlify)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure:
   - **Base directory:** frontend
   - **Build command:** npm run build
   - **Publish directory:** dist
6. Add environment variable:
   - `VITE_API_URL` = https://agroweather-ai.onrender.com/api
7. Click "Deploy"

## Project Structure

```
agroweather-ai/
├── backend/
│   ├── config/
│   │   └── constants.js           # Crop data and recommendations
│   ├── controllers/
│   │   └── weatherController.js   # Weather request handlers
│   ├── middleware/
│   │   └── errorHandler.js        # Global error handling
│   ├── routes/
│   │   └── weatherRoutes.js       # API route definitions
│   ├── services/
│   │   ├── geocodingService.js     # OpenStreetMap geocoding
│   │   └── weatherService.js      # Weather-AI API integration
│   ├── utils/
│   │   └── recommendationEngine.js # AI recommendation logic
│   ├── .env.example               # Environment variables template
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── BottomNav.jsx
│   │   │   ├── Pages/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── ForecastPage.jsx
│   │   │   ├── Recommendations/
│   │   │   │   ├── RecommendationCard.jsx
│   │   │   │   └── RiskIndicator.jsx
│   │   │   ├── Weather/
│   │   │   │   ├── CurrentWeather.jsx
│   │   │   │   ├── ForecastCard.jsx
│   │   │   │   └── ForecastList.jsx
│   │   │   └── UI/
│   │   │       ├── CropSelector.jsx
│   │   │       ├── LoadingSpinner.jsx
│   │   │       └── ErrorMessage.jsx
│   │   ├── hooks/
│   │   │   └── useWeather.js       # Custom weather data hook
│   │   ├── services/
│   │   │   └── api.js              # Axios API client
│   │   ├── App.jsx                 # Main React component
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   ├── .env.example                # Environment variables template
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── vite.config.js              # Vite build configuration
└── README.md                       # This file
```

## Security Features

- **Helmet.js:** Security headers for Express
- **CORS:** Configured for specific origins (localhost and Netlify)
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Environment Variables:** Sensitive data not committed to repository
- **Input Validation:** City and crop parameter validation
- **Error Handling:** Comprehensive error handling with user-friendly messages

## Error Handling

The application includes robust error handling:

- **Geocoding Failures:** Fallback to hardcoded coordinates for major cities
- **API Key Issues:** Automatic fallback to mock data for testing
- **Network Errors:** User-friendly error messages with retry options
- **Invalid Parameters:** Clear validation error responses
- **Service Unavailability:** Graceful degradation with mock data

## Supported Crops

The application provides recommendations for the following crops:

1. **Maize** - Requires well-drained soil, regular weeding, nitrogen-rich fertilizer
2. **Beans** - Needs moderate moisture, avoid waterlogging, support climbing varieties
3. **Coffee** - Requires shade and consistent moisture, regular pruning
4. **Tea** - Needs acidic soil, regular plucking, proper shade levels
5. **Wheat** - Prefers cool conditions, avoid waterlogging
6. **Tomatoes** - Needs staking and consistent watering, avoid overhead irrigation
7. **Potatoes** - Needs well-drained soil, hilling around plants

Each crop has specific ideal conditions, care instructions, and weather-based recommendations.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Acknowledgments

- **Weather-AI** - For providing the API and this technical challenge opportunity
- **Claire L. Montgomery** - For the challenge guidance and support
- **OpenStreetMap** - For the free Nominatim geocoding service
- **Material Design** - For the design system and guidelines

## Contact

- **Developer:** Edwin Mwiti
- **Project Repository:** https://github.com/Edwin420s/agroweather-ai
- **Live Demo:** https://agroweather-ai.netlify.app

## Quick Links

| Resource | Link |
|----------|------|
| Live Demo | https://agroweather-ai.netlify.app |
| Backend API | https://agroweather-ai.onrender.com |
| API Documentation | https://weather-ai.co/docs |
| GitHub Repository | https://github.com/Edwin420s/agroweather-ai |
| Backend Health Check | https://agroweather-ai.onrender.com/health |

---

Built for the Weather-AI Technical Challenge - June 2026
