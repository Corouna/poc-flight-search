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
    <fieldset className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4 border-0">
      <legend className="sr-only">Flight filters</legend>
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <p className="text-xs text-blue-600 mt-1">
              {filters.selectedAirlines.length + filters.selectedStops.length + (filters.maxPrice < priceRange.max ? 1 : 0)} active
            </p>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="px-3 py-1.5 text-sm bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded border border-red-200 transition-colors"
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        )}
      </div>

      {!hasActiveFilters && (
        <p className="text-xs text-gray-400 mb-4 italic">No filters applied</p>
      )}

      <div className="space-y-6 divide-y divide-gray-200">
        <fieldset className="border-0">
          <legend className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Price</legend>
          <PriceFilter
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
            currentMax={filters.maxPrice}
            onChange={onPriceChange}
          />
        </fieldset>

        <fieldset className="pt-6 border-0">
          <legend className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
            Stops
            {filters.selectedStops.length > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {filters.selectedStops.length}
              </span>
            )}
          </legend>
          <StopsFilter
            selectedStops={filters.selectedStops}
            onChange={onStopsChange}
          />
        </fieldset>

        <fieldset className="pt-6 border-0">
          <legend className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
            Airlines
            {filters.selectedAirlines.length > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {filters.selectedAirlines.length}
              </span>
            )}
          </legend>
          <AirlineFilter
            airlines={airlines}
            selectedAirlines={filters.selectedAirlines}
            onChange={onAirlineChange}
          />
        </fieldset>
      </div>
    </fieldset>
  );
};
