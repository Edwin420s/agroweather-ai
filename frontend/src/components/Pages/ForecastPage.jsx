import { useState, useEffect } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { Header } from '../Layout/Header';
import { ForecastList } from '../Weather/ForecastList';
import { CurrentWeather } from '../Weather/CurrentWeather';
import { RiskIndicator } from '../Recommendations/RiskIndicator';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { ErrorMessage } from '../UI/ErrorMessage';

export const ForecastPage = () => {
  const { weatherData, loading, error, fetchWeather, clearError } = useWeather();
  const [searchParams, setSearchParams] = useState({ city: 'Nairobi', crop: 'maize' });

  useEffect(() => {
    fetchWeather({ city: 'Nairobi', crop: 'maize' });
  }, []);

  const handleSearch = (params) => {
    setSearchParams(params);
    fetchWeather(params);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} loading={loading} initialCity={searchParams.city} initialCrop={searchParams.crop} />
        <div className="px-margin-mobile md:px-margin-desktop mt-8 max-w-max-width mx-auto">
          <ErrorMessage message={error} onRetry={() => fetchWeather(searchParams)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header onSearch={handleSearch} loading={loading} initialCity={searchParams.city} initialCrop={searchParams.crop} />
      
      <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-max-width mx-auto w-full">
        {loading && !weatherData ? (
          <LoadingSpinner />
        ) : weatherData ? (
          <>
            {/* Forecast Overview */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">query_stats</span>
                  Weekly Outlook
                </h2>
                <div className="flex gap-2">
                  <span className="bg-surface-container-highest px-3 py-1 rounded-full text-label-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Rain Chance
                  </span>
                  <span className="bg-surface-container-highest px-3 py-1 rounded-full text-label-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span> Temp High
                  </span>
                </div>
              </div>
              <ForecastList forecast={weatherData.forecast} />
            </section>

            {/* Deep Insights & Crop Impact */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary-fixed p-2 rounded-lg">
                      <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm">Deep Insights & Analysis</h4>
                      <p className="text-label-sm text-on-surface-variant">AI-Generated for {weatherData.location.name}</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-on-surface-variant">
                    <div className="flex gap-4 p-4 bg-surface-container-low rounded-xl border-l-4 border-primary">
                      <span className="material-symbols-outlined text-primary shrink-0">info</span>
                      <p className="text-body-md">
                        {weatherData.ai_summary || 'Current weather patterns indicate favorable conditions for most agricultural activities.'}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-surface-container-high">
                        <h5 className="font-label-md text-primary mb-2">Field Readiness</h5>
                        <p className="text-label-sm">
                          {weatherData.risk_indicator?.level === 'Low' 
                            ? 'Mechanized operations recommended for the coming days.'
                            : 'Consider delaying heavy machinery due to expected conditions.'}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-container-high">
                        <h5 className="font-label-md text-primary mb-2">Nutrient Management</h5>
                        <p className="text-label-sm">
                          {weatherData.forecast.some(d => d.rain_chance > 50)
                            ? 'Delay fertilizer application until after heavy rains to prevent runoff.'
                            : 'Optimal conditions for surface fertilization.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-[#eef5fc] border-2 border-dashed border-primary/30 p-6 rounded-2xl h-full flex flex-col">
                  <div className="mb-6">
                    <label className="font-label-md text-primary mb-2 block">Current Crop Focus</label>
                    <div className="relative">
                      <select className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 appearance-none focus:ring-primary focus:border-primary text-body-md">
                        <option>{weatherData.crop === 'general' ? 'Maize (Hybrid V-12)' : weatherData.crop.charAt(0).toUpperCase() + weatherData.crop.slice(1)}</option>
                        <option>Soybeans (Early Bloom)</option>
                        <option>Winter Wheat</option>
                        <option>Dry Beans</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-2 rounded-full shadow-sm">
                        <span className="material-symbols-outlined text-primary">psychology</span>
                      </div>
                      <div>
                        <h5 className="font-headline-sm text-headline-sm mb-1">
                          Crop Risk: <span className={`font-bold ${weatherData.risk_indicator?.level === 'High' ? 'text-error' : weatherData.risk_indicator?.level === 'Medium' ? 'text-secondary' : 'text-primary'}`}>
                            {weatherData.risk_indicator?.level || 'Low'}
                          </span>
                        </h5>
                        <p className="text-body-md text-on-surface-variant">
                          {weatherData.risk_indicator?.message || 'Current weather patterns present manageable conditions for most crops.'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl space-y-3 border border-white">
                      <div className="flex justify-between items-center">
                        <span className="text-label-md">Growth Stage</span>
                        <span className="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Optimal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-label-md">Water Stress Index</span>
                        <span className="text-label-sm font-bold">
                          {weatherData.current_weather?.rain_probability > 50 ? 'Low (1.2)' : 'Moderate (2.5)'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-label-md">Heat Accumulation</span>
                        <span className="text-label-sm font-bold">+12 GDD</span>
                      </div>
                    </div>
                    <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-md flex items-center justify-center gap-2 mt-auto shadow-sm">
                      <span className="material-symbols-outlined">assignment</span>
                      Generate Detailed Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};