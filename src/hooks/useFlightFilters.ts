import { useState, useMemo, useCallback, useEffect } from 'react';
import type { FlightOffer, FilterState } from '../types/flight';
import {
  filterFlights,
  getUniqueAirlines,
  getPriceRange,
  sortFlights,
} from '../utils/filterHelpers';

type SortOption = 'price' | 'duration' | 'departure';

interface UseFlightFiltersResult {
  filters: FilterState;
  filteredFlights: FlightOffer[];
  availableAirlines: Array<{ code: string; name: string; count: number }>;
  priceRange: { min: number; max: number };
  sortBy: SortOption;
  updateAirlineFilter: (airline: string, checked: boolean) => void;
  updateStopsFilter: (stops: string, checked: boolean) => void;
  updatePriceFilter: (maxPrice: number) => void;
  updateSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

export const useFlightFilters = (flights: FlightOffer[]): UseFlightFiltersResult => {
  const priceRange = useMemo(() => getPriceRange(flights), [flights]);
  
  const [filters, setFilters] = useState<FilterState>({
    selectedAirlines: [],
    maxPrice: priceRange.max,
    selectedStops: [],
  });

  const [sortBy, setSortBy] = useState<SortOption>('price');

  // Update max price when flights change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: priceRange.max,
    }));
  }, [priceRange.max]);

  const availableAirlines = useMemo(
    () => getUniqueAirlines(flights),
    [flights]
  );

  const filteredFlights = useMemo(() => {
    let result = filterFlights(flights, filters);
    result = sortFlights(result, sortBy);
    return result;
  }, [flights, filters, sortBy]);

  const updateAirlineFilter = useCallback((airline: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      selectedAirlines: checked
        ? [...prev.selectedAirlines, airline]
        : prev.selectedAirlines.filter((a) => a !== airline),
    }));
  }, []);

  const updateStopsFilter = useCallback((stops: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      selectedStops: checked
        ? [...prev.selectedStops, stops]
        : prev.selectedStops.filter((s) => s !== stops),
    }));
  }, []);

  const updatePriceFilter = useCallback((maxPrice: number) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice,
    }));
  }, []);

  const updateSortBy = useCallback(
    (sort: 'price' | 'duration' | 'departure') => {
      setSortBy(sort);
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      selectedAirlines: [],
      maxPrice: priceRange.max,
      selectedStops: [],
    });
    setSortBy('price');
  }, [priceRange.max]);

  return {
    filters,
    filteredFlights,
    availableAirlines,
    priceRange,
    sortBy,
    updateAirlineFilter,
    updateStopsFilter,
    updatePriceFilter,
    updateSortBy,
    resetFilters,
  };
};
