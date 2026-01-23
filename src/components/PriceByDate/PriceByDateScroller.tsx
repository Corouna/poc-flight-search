import { useMemo, useEffect } from 'react';
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
  // Generate ±14 day date range
  const dateRange = useMemo(() => {
    const dates: string[] = [];
    const selected = new Date(selectedDate);

    // 14 days before
    for (let i = 14; i > 0; i--) {
      const date = new Date(selected);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    // Selected date
    dates.push(selectedDate);

    // 14 days after
    for (let i = 1; i <= 14; i++) {
      const date = new Date(selected);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
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
    <div className="mb-6 -mx-4 px-4">
      <div className="flex items-center gap-3 mb-3">
        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Prices by date</p>
        <span className="text-xs text-gray-500">±14 days • Cheapest available</span>
      </div>

      {/* Horizontal Scroller */}
      <section
        className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide"
        aria-label="Prices for nearby dates"
      >
        {dateRange.map((date) => renderDateCard(date))}
      </section>
    </div>
  );
};
