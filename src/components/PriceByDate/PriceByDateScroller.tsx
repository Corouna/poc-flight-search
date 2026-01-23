import { useMemo, useEffect, useRef } from 'react';
import type { CachedDatePrice } from '../../hooks/useDatePriceCache';

interface PriceByDateScrollerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  priceCache: Map<string, CachedDatePrice>;
  onFetchDate: (date: string) => void;
}

export const PriceByDateScroller = ({
  selectedDate,
  onDateSelect,
  priceCache,
  onFetchDate,
}: PriceByDateScrollerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Generate future dates only (today to 14 days after selected date)
  const dateRange = useMemo(() => {
    const dates: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    // Start from today or selected date, whichever is later
    const startDate = new Date(Math.max(today.getTime(), selected.getTime()));

    // Generate from start date to 14 days after selected date
    const endDate = new Date(selected);
    endDate.setDate(endDate.getDate() + 14);

    let current = new Date(startDate);
    while (current <= endDate) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }, [selectedDate]);

  // Fetch prices for dates that don't have cached data
  useEffect(() => {
    dateRange.forEach((date) => {
      const cached = priceCache.get(date);
      if (!cached) {
        onFetchDate(date);
      }
    });
  }, [dateRange, priceCache, onFetchDate]);

  const renderDateCard = (date: string) => {
    const isSelected = date === selectedDate;
    const cached = priceCache.get(date);
    const dateObj = new Date(date + 'T00:00:00');
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return (
      <button
        key={date}
        onClick={() => onDateSelect(date)}
        disabled={cached?.loading}
        className={`shrink-0 p-3 rounded-lg border transition-all cursor-pointer disabled:cursor-not-allowed
          ${
            isSelected
              ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200 shadow-sm'
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm hover:bg-gray-50'
          }`}
      >
        <div className="text-xs font-semibold text-gray-700 mb-1">{dayOfWeek}</div>
        <div className="text-sm font-medium text-gray-900 mb-2">{formattedDate}</div>

        {/* Price or loading/error */}
        {cached?.loading && <div className="text-xs text-gray-400">Loading...</div>}
        {cached?.error && <div className="text-xs text-red-500">Error</div>}
        {cached && !cached.loading && !cached.error && cached.minPrice !== null && (
          <>
            <div className="text-lg font-bold text-blue-600">${cached.minPrice.toFixed(0)}</div>
            <div className="text-xs text-gray-500">{cached.flightCount} flights</div>
          </>
        )}
        {cached && !cached.loading && !cached.error && cached.minPrice === null && (
          <div className="text-xs text-gray-400">No flights</div>
        )}
        {!cached && <div className="text-xs text-gray-400">Loading...</div>}
      </button>
    );
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Prices by date</p>
        <span className="text-xs text-gray-500">Future dates only • Cheapest available</span>
      </div>

      {/* Container with navigation buttons */}
      <div className="flex items-center gap-2">
        {/* Left Button */}
        <button
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
              });
            }
          }}
          className="shrink-0 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
          aria-label="Scroll left"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto scrollbar-hide"
        >
          <section
            className="inline-flex gap-2 pb-2"
            aria-label="Prices for nearby dates"
          >
            {dateRange.map((date) => renderDateCard(date))}
          </section>
        </div>

        {/* Right Button */}
        <button
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
              });
            }
          }}
          className="shrink-0 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
          aria-label="Scroll right"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
