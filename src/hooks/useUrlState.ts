import type { FilterState } from '../types/flight';

interface SearchState {
  origin: string;
  destination: string;
  departureDate: string;
  filters: FilterState;
  sortBy: 'price' | 'duration' | 'departure';
}

/**
 * Hook to persist and restore search + filter state from URL query params
 * Updates URL when search params change
 * Restores state from URL on mount if params exist
 */
export const useUrlState = () => {
  /**
   * Save search and filter state to URL query params
   */
  const saveToUrl = (state: SearchState) => {
    const params = new URLSearchParams();

    if (state.origin) params.set('from', state.origin);
    if (state.destination) params.set('to', state.destination);
    if (state.departureDate) params.set('date', state.departureDate);

    if (state.filters.selectedAirlines.length > 0) {
      params.set('airlines', state.filters.selectedAirlines.join(','));
    }

    if (state.filters.selectedStops.length > 0) {
      params.set('stops', state.filters.selectedStops.join(','));
    }

    if (state.filters.maxPrice < Number.POSITIVE_INFINITY) {
      params.set('maxPrice', state.filters.maxPrice.toString());
    }

    if (state.sortBy !== 'price') {
      params.set('sort', state.sortBy);
    }

    // Update URL without page reload
    const newUrl = params.toString()
      ? `${globalThis.location.pathname}?${params.toString()}`
      : globalThis.location.pathname;

    globalThis.history.replaceState(null, '', newUrl);
  };

  /**
   * Load search and filter state from URL query params
   */
  const loadFromUrl = (): Partial<SearchState> => {
    const params = new URLSearchParams(globalThis.location.search);

    return {
      origin: params.get('from') || '',
      destination: params.get('to') || '',
      departureDate: params.get('date') || '',
      filters: {
        selectedAirlines: params.get('airlines')?.split(',').filter(Boolean) || [],
        selectedStops: params.get('stops')?.split(',').filter(Boolean) || [],
        maxPrice: params.get('maxPrice') ? Number.parseInt(params.get('maxPrice')!, 10) : Number.POSITIVE_INFINITY,
      },
      sortBy: (params.get('sort') as 'price' | 'duration' | 'departure') || 'price',
    };
  };

  /**
   * Clear URL params
   */
  const clearUrl = () => {
    globalThis.history.replaceState(null, '', globalThis.location.pathname);
  };

  return {
    saveToUrl,
    loadFromUrl,
    clearUrl,
  };
};
