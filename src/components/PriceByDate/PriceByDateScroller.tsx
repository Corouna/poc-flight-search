import { useMemo, useRef } from 'react';
import type { FlightOffer } from '../../types/flight';

interface PriceByDateScrollerProps {
  flights: FlightOffer[];
  selectedDate: string;
}

export const PriceByDateScroller = ({ flights, selectedDate }: PriceByDateScrollerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Extract unique dates from flights and calculate min price per date
  const datesPrices = useMemo(() => {
    const dateMap = new Map<string, { price: number; count: number }>();

    flights.forEach((flight) => {
      // Get departure date from first segment's departure time
      if (flight.itineraries[0]?.segments[0]?.departure.at) {
        const dateStr = flight.itineraries[0].segments[0].departure.at.split('T')[0];
        const price = Number.parseFloat(flight.price.total);

        const existing = dateMap.get(dateStr);
        if (existing) {
          dateMap.set(dateStr, {
            price: Math.min(existing.price, price),
            count: existing.count + 1,
          });
        } else {
          dateMap.set(dateStr, { price, count: 1 });
        }
      }
    });

    // Sort dates and format them
    const sorted = Array.from(dateMap.entries())
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, { price, count }]) => {
        const dateObj = new Date(date + 'T00:00:00');
        const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return {
          date,
          formattedDate,
          dayOfWeek,
          minPrice: price,
          flightCount: count,
        };
      });

    // Return a window of dates around the selected date (±3-4 days)
    const selectedIndex = sorted.findIndex((d) => d.date === selectedDate);
    const startIndex = Math.max(0, selectedIndex - 3);
    const endIndex = Math.min(sorted.length, selectedIndex + 4);

    return sorted.slice(startIndex, endIndex);
  }, [flights, selectedDate]);

  if (datesPrices.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 -mx-4 px-4">
      <div className="flex items-center gap-3 mb-3">
        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Prices by date</p>
        <span className="text-xs text-gray-500">Cheapest available</span>
      </div>

      {/* Horizontal Scroller */}
      <section
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-hide"
        aria-label="Prices for nearby dates"
      >
        {datesPrices.map((datePrice) => {
          const isSelected = datePrice.date === selectedDate;

          return (
            <div
              key={datePrice.date}
              className={`shrink-0 p-4 rounded-lg border transition-all cursor-default ${
                isSelected
                  ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="text-xs font-semibold text-gray-700 mb-1">{datePrice.dayOfWeek}</div>
              <div className="text-sm font-medium text-gray-900 mb-2">{datePrice.formattedDate}</div>
              <div className="text-lg font-bold text-blue-600">${datePrice.minPrice.toFixed(0)}</div>
              <div className="text-xs text-gray-500 mt-1">{datePrice.flightCount} flights</div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
