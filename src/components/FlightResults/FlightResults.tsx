import { FlightCard } from './FlightCard';
import type { FlightOffer } from '../../types/flight';

interface FlightResultsProps {
  flights: FlightOffer[];
  loading: boolean;
  error: string | null;
  sortBy: 'price' | 'duration' | 'departure';
  onSortChange: (sort: 'price' | 'duration' | 'departure') => void;
}

// Professional Skeleton Card Component
const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
    {/* Header: Airline + Route */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-3 bg-gray-100 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Flight Times + Duration */}
    <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
      <div className="text-center space-y-2">
        <div className="h-5 bg-gray-200 rounded w-12 mx-auto animate-pulse"></div>
        <div className="h-3 bg-gray-100 rounded w-16 mx-auto animate-pulse"></div>
      </div>
      <div className="flex items-center justify-center">
        <div className="h-3 bg-gray-100 rounded w-20 animate-pulse"></div>
      </div>
      <div className="text-center space-y-2">
        <div className="h-5 bg-gray-200 rounded w-12 mx-auto animate-pulse"></div>
        <div className="h-3 bg-gray-100 rounded w-16 mx-auto animate-pulse"></div>
      </div>
    </div>

    {/* Stops + Price */}
    <div className="flex items-center justify-between">
      <div className="h-4 bg-gray-100 rounded w-24 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
    </div>
  </div>
);

export const FlightResults = ({
  flights,
  loading,
  error,
  sortBy,
  onSortChange,
}: FlightResultsProps) => {
  if (loading) {
    return (
      <div aria-live="polite" aria-busy="true">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm flex items-center gap-2">
            <span className="animate-spin">⟳</span>
            <span>Searching for flights...</span>
          </p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }, () => crypto.randomUUID()).map((id) => (
            <SkeletonCard key={id} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-8 text-center" role="alert">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-red-800 font-semibold text-lg mb-2">No flights available</p>
        <p className="text-red-700 text-sm">{error}</p>
        <p className="text-red-600 text-xs mt-3">Try adjusting your search criteria or dates</p>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-8 text-center">
        <div className="text-5xl mb-3">🔍</div>
        <p className="text-blue-800 font-semibold text-lg mb-2">Ready to search?</p>
        <p className="text-blue-700 text-sm mb-4">
          Enter your departure airport, destination, and preferred date above to find the best flights
        </p>
        <div className="bg-white bg-opacity-60 rounded p-3 text-xs text-blue-600 mt-4">
          💡 Try: JFK → LAX, or CDG → LHR
        </div>
      </div>
    );
  }

  return (
    <section aria-label="Flight search results">
      {/* Sort Options */}
      <div className="mb-8 flex flex-wrap gap-2 items-center">
        <p className="text-sm font-semibold text-gray-700 w-full">Sort by</p>
        {(['price', 'duration', 'departure'] as const).map((option) => (
          <button
            key={option}
            onClick={() => onSortChange(option)}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
              sortBy === option
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={sortBy === option}
          >
            {option === 'price' && '💰 Price'}
            {option === 'duration' && '⏱️ Duration'}
            {option === 'departure' && '🕒 Departure'}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600 mb-5 font-medium">
        Showing {flights.length} flight{flights.length === 1 ? '' : 's'}
      </p>

      {/* Flight Cards */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </section>
  );
};
