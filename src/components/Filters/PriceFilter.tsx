interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMax: number;
  onChange: (price: number) => void;
}

export const PriceFilter = ({
  minPrice,
  maxPrice,
  currentMax,
  onChange,
}: PriceFilterProps) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">💰 Price Range</h3>
      <div className="space-y-3">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={currentMax}
          onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${
              ((currentMax - minPrice) / (maxPrice - minPrice)) * 100
            }%, #d1d5db ${((currentMax - minPrice) / (maxPrice - minPrice)) * 100}%, #d1d5db 100%)`,
          }}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Min: ${minPrice}</span>
          <span className="text-lg font-bold text-blue-600">
            Max: ${currentMax}
          </span>
        </div>
      </div>
    </div>
  );
};
