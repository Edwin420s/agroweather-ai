export const ForecastCard = ({ day, index }) => {
  const getWeatherIcon = (condition) => {
    const cond = condition?.toLowerCase() || '';
    if (cond.includes('rain') || cond.includes('drizzle')) return 'rainy';
    if (cond.includes('cloud')) return 'cloud';
    if (cond.includes('sun') || cond.includes('clear')) return 'wb_sunny';
    if (cond.includes('storm') || cond.includes('thunder')) return 'thunderstorm';
    return 'partly_cloudy_day';
  };

  const isHighRain = day.rain_chance > 60;
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(day.date);
  const dayName = dayNames[date.getDay()];

  return (
    <div className={`min-w-[140px] flex-shrink-0 bg-surface-container-lowest rounded-xl p-4 border border-outline-variant flex flex-col items-center text-center weather-card-hover relative overflow-hidden ${isHighRain ? 'border-b-error border-b-2' : ''}`}>
      <span className="font-label-md text-on-surface-variant mb-2">{dayName}</span>
      <span className={`material-symbols-outlined text-4xl mb-3 ${isHighRain ? 'text-error' : 'text-primary'}`}>
        {getWeatherIcon(day.condition)}
      </span>
      <div className="flex flex-col gap-1 mb-3">
        <span className="font-headline-sm text-headline-sm">{Math.round(day.max_temp)}°</span>
        <span className="text-label-sm text-on-surface-variant">{Math.round(day.min_temp)}°</span>
      </div>
      <div className="w-full bg-surface-container rounded-full h-1 mb-2">
        <div
          className={`h-1 rounded-full ${isHighRain ? 'bg-error' : 'bg-on-tertiary-container'}`}
          style={{ width: `${Math.min(100, day.rain_chance)}%` }}
        ></div>
      </div>
      <span className={`text-label-sm font-bold ${isHighRain ? 'text-error' : 'text-on-tertiary-container'}`}>
        {day.rain_chance}% Rain
      </span>
    </div>
  );
};