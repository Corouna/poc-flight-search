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
  const isFiltered = currentMax < maxPrice;

  return (
    <div>
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
          aria-label="Maximum price filter"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Min: ${minPrice}</span>
          <span className={`text-lg font-bold ${isFiltered ? 'text-blue-600 bg-blue-50 px-2 py-1 rounded' : 'text-gray-700'}`}>
            Max: ${currentMax}
          </span>
        </div>
      </div>
    </div>
  );
};
