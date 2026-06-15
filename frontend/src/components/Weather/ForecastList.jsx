import { ForecastCard } from './ForecastCard';

export const ForecastList = ({ forecast }) => {
  return (
    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
      {forecast.map((day, idx) => (
        <ForecastCard key={idx} day={day} index={idx} />
      ))}
    </div>
  );
};