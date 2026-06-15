import { useState, useEffect } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { Header } from '../Layout/Header';
import { CurrentWeather } from '../Weather/CurrentWeather';
import { ForecastList } from '../Weather/ForecastList';
import { RecommendationCard } from '../Recommendations/RecommendationCard';
import { RiskIndicator } from '../Recommendations/RiskIndicator';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { ErrorMessage } from '../UI/ErrorMessage';

export const Dashboard = () => {
  const { weatherData, loading, error, fetchWeather, clearError } = useWeather();
  const [searchParams, setSearchParams] = useState({ city: 'Nairobi', crop: 'maize' });

  useEffect(() => {
    // Load default weather on mount
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
      
      <div className="px-margin-mobile md:px-margin-desktop mt-6 max-w-max-width mx-auto space-y-8">
        {loading && !weatherData ? (
          <LoadingSpinner />
        ) : weatherData ? (
          <>
            {/* Hero Section: Current Weather + AI Recommendation */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <CurrentWeather data={weatherData} />
              </div>
              <div className="lg:col-span-5">
                <RecommendationCard data={weatherData} crop={weatherData.crop} />
              </div>
            </section>

            {/* Risk & Market Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RiskIndicator risk={weatherData.risk_indicator} />
              <div className="bg-surface-container-lowest rounded-xl p-6 border-l-4 border-l-tertiary">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Market Trend</p>
                    <h4 className="font-headline-sm text-headline-sm">Price Surge Alert</h4>
                  </div>
                  <span className="material-symbols-outlined text-tertiary text-3xl">trending_up</span>
                </div>
                <p className="font-body-md text-on-surface-variant mb-4">
                  {weatherData.crop === 'maize' 
                    ? 'Maize futures are up 4.2% due to regional supply constraints. Consider securing harvest storage now.'
                    : 'Crop prices show positive momentum. Check local market rates before selling.'}
                </p>
                <a href="#" className="text-primary font-label-md flex items-center gap-1 hover:underline">
                  View Market Report
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              </div>
            </section>

            {/* 7-Day Forecast Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headline-md text-headline-md text-primary">7-Day Forecast Summary</h2>
                <button className="text-on-surface-variant font-label-md flex items-center gap-1">
                  Full View <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
              <ForecastList forecast={weatherData.forecast} />
            </section>

            {/* AI Summary Section */}
            {weatherData.ai_summary && (
              <section className="bg-surface-container-low rounded-xl p-6 border border-outline-variant">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary">summarize</span>
                  <h3 className="font-headline-sm text-headline-sm">AI Weather Summary</h3>
                </div>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {weatherData.ai_summary}
                </p>
              </section>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};