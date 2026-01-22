import { useState, useEffect } from 'react';
import { useUrlState } from '../../hooks/useUrlState';

interface SearchFormProps {
  onSearch: (origin: string, destination: string, departureDate: string) => Promise<void>;
  loading: boolean;
  onUrlStateLoaded?: (origin: string, destination: string, departureDate: string) => void;
}

export const SearchForm = ({ onSearch, loading, onUrlStateLoaded }: SearchFormProps) => {
  const { loadFromUrl, saveToUrl } = useUrlState();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [error, setError] = useState('');

  // Load from URL on mount
  useEffect(() => {
    const state = loadFromUrl();
    if (state.origin && state.destination && state.departureDate) {
      setOrigin(state.origin);
      setDestination(state.destination);
      setDepartureDate(state.departureDate);
      if (onUrlStateLoaded) {
        onUrlStateLoaded(state.origin, state.destination, state.departureDate);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!origin || !destination || !departureDate) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await onSearch(origin, destination, departureDate);
      // Save to URL after successful search
      saveToUrl({
        origin,
        destination,
        departureDate,
        filters: { selectedAirlines: [], selectedStops: [], maxPrice: Number.POSITIVE_INFINITY },
        sortBy: 'price',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
    }
  };

  // Get today's date for minimum date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Flight Search</h1>
      <p className="text-sm text-gray-600 mb-6">Find the best flights for your trip</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded" role="alert">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Origin */}
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
            From <span className="text-red-500">*</span>
          </label>
          <input
            id="origin"
            type="text"
            placeholder="e.g., JFK"
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            disabled={loading}
            maxLength={3}
            required
            aria-required="true"
            aria-label="Departure airport code"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <p className="text-xs text-gray-500 mt-1">Airport code</p>
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
            To <span className="text-red-500">*</span>
          </label>
          <input
            id="destination"
            type="text"
            placeholder="e.g., LAX"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
            disabled={loading}
            maxLength={3}
            required
            aria-required="true"
            aria-label="Destination airport code"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <p className="text-xs text-gray-500 mt-1">Airport code</p>
        </div>

        {/* Departure Date */}
        <div>
          <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-2">
            Departure <span className="text-red-500">*</span>
          </label>
          <input
            id="departure"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            disabled={loading}
            min={today}
            required
            aria-required="true"
            aria-label="Departure date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        💡 Tip: Use real IATA airport codes (e.g., NYC, LAX, LHR, CDG)
      </p>
    </form>
  );
};
