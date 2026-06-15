import { useState, useEffect } from 'react';
import { getAvailableCrops } from '../../services/api';

export const CropSelector = ({ selectedCrop, onCropChange }) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const data = await getAvailableCrops();
        setCrops(data.crops);
      } catch (error) {
        // Fallback crops if API fails
        setCrops(['maize', 'beans', 'coffee', 'tea', 'wheat', 'tomatoes', 'potatoes']);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  return (
    <div className="relative">
      <select
        value={selectedCrop}
        onChange={(e) => onCropChange(e.target.value)}
        className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md"
        disabled={loading}
      >
        <option value="">Select Crop (Optional)</option>
        {crops.map((crop) => (
          <option key={crop} value={crop}>
            {crop.charAt(0).toUpperCase() + crop.slice(1)}
          </option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
        expand_more
      </span>
    </div>
  );
};