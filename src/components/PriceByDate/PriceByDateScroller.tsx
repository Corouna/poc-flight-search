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
  
  // Get today's date in YYYY-MM-DD format (timezone-safe)
  const getTodayString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };
  
  // Generate date range: 
  // - Past: from today to selected date (max 14 days back, but not before today)
  // - Future: from selected date to 14 days after selected date
  const dateRange = useMemo(() => {
    const dates: string[] = [];
    const todayString = getTodayString();
    
    const today = new Date(todayString + 'T00:00:00');
    today.setHours(0, 0, 0, 0);
    
    const selected = new Date(selectedDate + 'T00:00:00');
    selected.setHours(0, 0, 0, 0);

    // Start from today (never go to past dates)
    const startDate = new Date(today);

    // End 14 days after selected date
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

  // Scroll to center the selected date card
  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedButton = scrollContainerRef.current.querySelector(
        `button[data-date="${selectedDate}"]`
      ) as HTMLButtonElement;
      
      if (selectedButton) {
        // Calculate offset to center the selected date
        const containerWidth = scrollContainerRef.current.clientWidth;
        const buttonWidth = selectedButton.offsetWidth;
        const buttonLeft = selectedButton.offsetLeft;
        
        // Scroll to position the button in the middle
        const scrollPosition = buttonLeft - (containerWidth - buttonWidth) / 2;
        
        scrollContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedDate]);

  const renderDateCard = (date: string) => {
    const isSelected = date === selectedDate;
    const cached = priceCache.get(date);
    const dateObj = new Date(date + 'T00:00:00');
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return (
      <button
        key={date}
        data-date={date}
        onClick={() => onDateSelect(date)}
        disabled={cached?.loading || isSelected}
        className={`shrink-0 px-2 py-1.5 rounded-lg border transition-all cursor-pointer disabled:cursor-not-allowed w-16 flex flex-col items-center justify-center
          ${
            isSelected
              ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200 shadow-sm'
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm hover:bg-gray-50'
          }`}
      >
        <div className="text-xs font-semibold text-gray-700">{dayOfWeek}</div>
        <div className="text-xs font-medium text-gray-900">{formattedDate}</div>

        {/* Price or loading/error */}
        {cached?.loading && <div className="text-xs text-gray-400 mt-1">Loading</div>}
        {cached?.error && <div className="text-xs text-red-500 mt-1">Error</div>}
        {cached && !cached.loading && !cached.error && cached.minPrice !== null && (
          <div className="text-sm font-bold text-blue-600 mt-1">${cached.minPrice.toFixed(0)}</div>
        )}
        {cached && !cached.loading && !cached.error && cached.minPrice === null && (
          <div className="text-xs text-gray-400 mt-1">-</div>
        )}
        {!cached && <div className="text-xs text-gray-400 mt-1">-</div>}
      </button>
    );
  };

  return (
    <div>
      {/* Container with navigation buttons */}
      <div className="flex items-center gap-2">
        {/* Left Button */}
        <button
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'auto',
              });
            }
          }}
          className="shrink-0 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
          aria-label="Scroll left"
        >
          <svg
            className="w-4 h-4 text-gray-600"
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
          className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{ scrollBehavior: 'auto' }}
        >
          <section
            className="inline-flex gap-1 will-change-transform"
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
                behavior: 'auto',
              });
            }
          }}
          className="shrink-0 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
          aria-label="Scroll right"
        >
          <svg
            className="w-4 h-4 text-gray-600"
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
