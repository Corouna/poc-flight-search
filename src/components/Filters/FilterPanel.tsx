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
    <fieldset className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-4 max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden">
      <legend className="sr-only">Flight filters</legend>
      
      {/* Fixed Header */}
      <div className="shrink-0 border-b border-gray-200 bg-white rounded-t-xl p-6">
        <div className="flex items-center justify-between mb-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            {hasActiveFilters && (
              <p className="text-xs text-gray-600 mt-1.5 font-medium">
                {filters.selectedAirlines.length + filters.selectedStops.length + (filters.maxPrice < priceRange.max ? 1 : 0)} active
              </p>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="px-3 py-1.5 text-xs bg-red-100 text-red-700 hover:bg-red-200 font-semibold rounded-md transition-colors"
              aria-label="Reset all filters"
            >
              Reset
            </button>
          )}
        </div>

        {!hasActiveFilters && (
          <p className="text-xs text-gray-500 mt-4 font-medium">No filters applied</p>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="space-y-5 divide-y divide-gray-200">
          <fieldset className="border-0">
            <legend className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">Price</legend>
            <PriceFilter
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
              currentMax={filters.maxPrice}
              onChange={onPriceChange}
            />
          </fieldset>

          <fieldset className="pt-5 border-0">
            <legend className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider flex items-center gap-2">
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

          <fieldset className="pt-5 border-0">
            <legend className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider flex items-center gap-2">
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
      </div>
    </fieldset>
  );
};
