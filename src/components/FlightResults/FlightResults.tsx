import { FlightCard } from './FlightCard';
import type { FlightOffer } from '../../types/flight';

interface FlightResultsProps {
  flights: FlightOffer[];
  loading: boolean;
  error: string | null;
  sortBy: 'price' | 'duration' | 'departure';
  onSortChange: (sort: 'price' | 'duration' | 'departure') => void;
}

export const FlightResults = ({
  flights,
  loading,
  error,
  sortBy,
  onSortChange,
}: FlightResultsProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }, () => crypto.randomUUID()).map((id) => (
          <div
            key={id}
            className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
          >
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">⚠️ No flights available</p>
        <p className="text-red-600 text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p className="text-blue-700 font-semibold">🔍 Search for flights to begin</p>
        <p className="text-blue-600 text-sm mt-2">
          Enter your departure airport, destination, and date above
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Sort Options */}
      <div className="mb-6 flex flex-wrap gap-2">
        <p className="text-sm font-medium text-gray-700 w-full">Sort by:</p>
        {(['price', 'duration', 'departure'] as const).map((option) => (
          <button
            key={option}
            onClick={() => onSortChange(option)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              sortBy === option
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option === 'price' && '💰 Price'}
            {option === 'duration' && '⏱️ Duration'}
            {option === 'departure' && '🕒 Departure'}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600 mb-4">
        Showing {flights.length} flight{flights.length === 1 ? '' : 's'}
      </p>

      {/* Flight Cards */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  );
};
