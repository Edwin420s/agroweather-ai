export const CurrentWeather = ({ data }) => {
  const getWeatherIcon = (condition) => {
    const cond = condition?.toLowerCase() || '';
    if (cond.includes('rain') || cond.includes('drizzle')) return 'rainy';
    if (cond.includes('cloud')) return 'cloud';
    if (cond.includes('sun') || cond.includes('clear')) return 'wb_sunny';
    if (cond.includes('storm') || cond.includes('thunder')) return 'thunderstorm';
    if (cond.includes('snow')) return 'cloudy_snowing';
    return 'partly_cloudy_day';
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant relative overflow-hidden">
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-fixed/30 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-1 text-on-surface-variant font-label-md mb-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            location_on
          </span>
          {data.location.name} • Current Weather
        </div>
        <div className="flex items-end gap-4 mb-6">
          <span className="font-headline-xl text-headline-xl text-primary">
            {Math.round(data.current_weather.temperature)}°C
          </span>
          <div className="pb-2">
            <span className="material-symbols-outlined text-5xl text-tertiary">
              {getWeatherIcon(data.current_weather.condition)}
            </span>
            <p className="font-body-md text-on-surface-variant">{data.current_weather.condition}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Humidity
            </span>
            <span className="font-headline-sm text-headline-sm block">
              {data.current_weather.humidity}%
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Wind
            </span>
            <span className="font-headline-sm text-headline-sm block">
              {data.current_weather.wind_speed} km/h
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Rain Chance
            </span>
            <span className="font-headline-sm text-headline-sm block">
              {data.current_weather.rain_probability}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};