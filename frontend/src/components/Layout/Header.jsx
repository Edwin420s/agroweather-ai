import { useState } from 'react';
import { CropSelector } from '../UI/CropSelector';

export const Header = ({ onSearch, loading, initialCity = '', initialCrop = '' }) => {
  const [city, setCity] = useState(initialCity);
  const [crop, setCrop] = useState(initialCrop);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch({ city: city.trim(), crop: crop || undefined });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-surface shadow-sm px-margin-mobile md:px-margin-desktop py-4">
      <div className="max-w-max-width mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <form onSubmit={handleSubmit} className="relative flex-1 max-w-2xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search Location & Crop (e.g., Nairobi, Maize)"
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary font-body-md text-body-md"
            disabled={loading}
          />
        </form>

        <div className="flex items-center gap-4">
          <div className="min-w-[180px]">
            <CropSelector selectedCrop={crop} onCropChange={setCrop} />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || !city.trim()}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Check Weather'}
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};