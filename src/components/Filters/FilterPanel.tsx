import { PriceFilter } from './PriceFilter';
import { StopsFilter } from './StopsFilter';
import { AirlineFilter } from './AirlineFilter';
import type { FilterState } from '../../types/flight';

interface FilterPanelProps {
  filters: FilterState;
  priceRange: { min: number; max: number };
  airlines: Array<{ code: string; name: string; count: number }>;
  onAirlineChange: (airline: string, checked: boolean) => void;
  onStopsChange: (stops: string, checked: boolean) => void;
  onPriceChange: (price: number) => void;
  onReset: () => void;
}

export const FilterPanel = ({
  filters,
  priceRange,
  airlines,
  onAirlineChange,
  onStopsChange,
  onPriceChange,
  onReset,
}: FilterPanelProps) => {
  const hasActiveFilters =
    filters.selectedAirlines.length > 0 ||
    filters.selectedStops.length > 0 ||
    filters.maxPrice < priceRange.max;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6 divide-y divide-gray-200">
        <div>
          <PriceFilter
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
            currentMax={filters.maxPrice}
            onChange={onPriceChange}
          />
        </div>

        <div className="pt-6">
          <StopsFilter
            selectedStops={filters.selectedStops}
            onChange={onStopsChange}
          />
        </div>

        <div className="pt-6">
          <AirlineFilter
            airlines={airlines}
            selectedAirlines={filters.selectedAirlines}
            onChange={onAirlineChange}
          />
        </div>
      </div>
    </div>
  );
};
