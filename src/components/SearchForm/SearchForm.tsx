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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-950 tracking-tight mb-3">Find flights</h1>
        <p className="text-base text-gray-600 font-normal">Search for the best flights for your trip</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg" role="alert">
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Origin */}
        <div>
          <label htmlFor="origin" className="block text-sm font-semibold text-gray-700 mb-3">
            From <span className="text-red-500">*</span>
          </label>
          <input
            id="origin"
            type="text"
            placeholder="JFK"
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            disabled={loading}
            maxLength={3}
            required
            aria-required="true"
            aria-label="Departure airport code"
            className="w-full h-12 px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors placeholder:text-gray-400"
          />
          <p className="text-xs text-gray-500 mt-2 font-medium">Airport code</p>
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-3">
            To <span className="text-red-500">*</span>
          </label>
          <input
            id="destination"
            type="text"
            placeholder="LAX"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
            disabled={loading}
            maxLength={3}
            required
            aria-required="true"
            aria-label="Destination airport code"
            className="w-full h-12 px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors placeholder:text-gray-400"
          />
          <p className="text-xs text-gray-500 mt-2 font-medium">Airport code</p>
        </div>

        {/* Departure Date */}
        <div>
          <label htmlFor="departure" className="block text-sm font-semibold text-gray-700 mb-3">
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
            className="w-full h-12 px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
          />
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-end">
          <label className="block text-sm font-semibold text-gray-700 mb-3 invisible">Search</label>
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full h-12 bg-blue-600 text-white font-semibold text-base rounded-lg hover:bg-blue-700 hover:shadow-md active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-6 font-medium">
        💡 Use IATA codes: JFK, LAX, LHR, CDG, NRT, SFO
      </p>
    </form>
  );
};
