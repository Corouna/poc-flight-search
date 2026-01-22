import { FlightCard } from './FlightCard';
import { PriceByDateScroller } from '../PriceByDate/PriceByDateScroller';
import type { FlightOffer } from '../../types/flight';

interface FlightResultsProps {
  flights: FlightOffer[];
  loading: boolean;
  error: string | null;
  sortBy: 'price' | 'duration' | 'departure';
  onSortChange: (sort: 'price' | 'duration' | 'departure') => void;
  selectedDate?: string;
}

// Professional Skeleton Card Component - matches FlightCard layout exactly
const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
      {/* Airline (col 1) */}
      <div className="md:col-span-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        <div className="h-3 bg-gray-100 rounded w-24 animate-pulse"></div>
      </div>

      {/* Departure (col 2) */}
      <div className="md:col-span-1 space-y-2">
        <div className="h-6 bg-gray-200 rounded w-20 mx-auto md:mx-0 animate-pulse"></div>
        <div className="h-3 bg-gray-100 rounded w-12 mx-auto md:mx-0 animate-pulse"></div>
      </div>

      {/* Duration & Stops (col 3) - centered */}
      <div className="md:col-span-1 text-center space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
        <div className="h-0.5 bg-gray-300 my-2"></div>
        <div className="h-3 bg-gray-100 rounded w-20 mx-auto animate-pulse"></div>
      </div>

      {/* Arrival (col 4) */}
      <div className="md:col-span-1 space-y-2">
        <div className="h-6 bg-gray-200 rounded w-20 mx-auto md:mx-0 animate-pulse"></div>
        <div className="h-3 bg-gray-100 rounded w-12 mx-auto md:mx-0 animate-pulse"></div>
      </div>

      {/* Price & Button (col 5) - right aligned */}
      <div className="md:col-span-1 text-right space-y-2">
        <div className="h-8 bg-gray-200 rounded w-24 ml-auto animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>

    {/* Details section - matches FlightCard structure */}
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
    </div>
  </div>
);

export const FlightResults = ({
  flights,
  loading,
  error,
  sortBy,
  onSortChange,
  selectedDate = '',
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
    <section aria-label="Flight search results" className="flex flex-col">
      {/* Price by Date Scroller */}
      {selectedDate && (
        <PriceByDateScroller flights={flights} selectedDate={selectedDate} />
      )}

      {/* Sticky Control Bar */}
      <div className="sticky top-18 z-20 bg-white border-b border-gray-200 py-3 -mx-4 px-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Sort by:</p>
            <div className="flex gap-2">
              {(['price', 'duration', 'departure'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => onSortChange(option)}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 ${
                    sortBy === option
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                  }`}
                  aria-pressed={sortBy === option}
                >
                  {option === 'price' && '💰'}
                  {option === 'duration' && '⏱️'}
                  {option === 'departure' && '🕒'}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-xs text-gray-600 font-medium whitespace-nowrap">
            {flights.length} flight{flights.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </section>
  );
};
