import type { FlightOffer, FilterState } from '../types/flight';

export const getUniqueAirlines = (flights: FlightOffer[]) => {
  const airlines = new Map<string, number>();
  
  flights.forEach((flight) => {
    flight.validatingAirlineCodes.forEach((code) => {
      airlines.set(code, (airlines.get(code) || 0) + 1);
    });
  });

  return Array.from(airlines.entries())
    .map(([code, count]) => ({ code, name: code, count }))
    .sort((a, b) => b.count - a.count);
};

export const getPriceRange = (flights: FlightOffer[]) => {
  if (flights.length === 0) return { min: 0, max: 0 };
  
  const prices = flights.map((f) => Number.parseFloat(f.price.grandTotal));
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
};

export const getNumberOfStops = (flight: FlightOffer): number => {
  return flight.itineraries[0]?.segments.reduce((sum, segment) => {
    return sum + (segment.numberOfStops || 0);
  }, flight.itineraries[0]?.segments.length - 1 || 0) || 0;
};

export const filterFlights = (
  flights: FlightOffer[],
  filters: FilterState
): FlightOffer[] => {
  return flights.filter((flight) => {
    const price = Number.parseFloat(flight.price.grandTotal);
    const stops = getNumberOfStops(flight);
    const airline = flight.validatingAirlineCodes[0];

    // Price filter
    if (price > filters.maxPrice) return false;

    // Stops filter
    if (filters.selectedStops.length > 0) {
      const stopsMatch = filters.selectedStops.some((stopFilter) => {
        if (stopFilter === '0') return stops === 0;
        if (stopFilter === '1') return stops === 1;
        if (stopFilter === '2+') return stops >= 2;
        return false;
      });
      if (!stopsMatch) return false;
    }

    // Airline filter
    if (
      filters.selectedAirlines.length > 0 &&
      !filters.selectedAirlines.includes(airline)
    ) {
      return false;
    }

    return true;
  });
};

export const getPriceDistribution = (flights: FlightOffer[]) => {
  const distribution: Record<number, number> = {};

  flights.forEach((flight) => {
    const price = Math.floor(Number.parseFloat(flight.price.grandTotal) / 100) * 100;
    distribution[price] = (distribution[price] || 0) + 1;
  });

  return Object.entries(distribution)
    .map(([price, count]) => ({ price: Number.parseInt(price, 10), count }))
    .sort((a, b) => a.price - b.price);
};

export const sortFlights = (
  flights: FlightOffer[],
  sortBy: 'price' | 'duration' | 'departure'
): FlightOffer[] => {
  const sorted = [...flights];

  if (sortBy === 'price') {
    return sorted.sort(
      (a, b) =>
        Number.parseFloat(a.price.grandTotal) - Number.parseFloat(b.price.grandTotal)
    );
  }

  if (sortBy === 'duration') {
    return sorted.sort((a, b) => {
      const durationA = parseDuration(a.itineraries[0]?.duration || 'PT0H');
      const durationB = parseDuration(b.itineraries[0]?.duration || 'PT0H');
      return durationA - durationB;
    });
  }

  if (sortBy === 'departure') {
    return sorted.sort((a, b) => {
      const timeA = a.itineraries[0]?.segments[0]?.departure?.at || '';
      const timeB = b.itineraries[0]?.segments[0]?.departure?.at || '';
      return new Date(timeA).getTime() - new Date(timeB).getTime();
    });
  }

  return sorted;
};

const parseDuration = (duration: string): number => {
  // Parse ISO 8601 duration (e.g., "PT2H30M")
  const durationRegex = /PT(\d+)H?(\d+)?M?/;
  const match = durationRegex.exec(duration);
  if (!match) return 0;
  const hours = Number.parseInt(match[1], 10) || 0;
  const minutes = Number.parseInt(match[2] || '0', 10) || 0;
  return hours * 60 + minutes;
};
