import { useState, useCallback } from 'react';
import { searchFlights as searchFlightsAPI } from '../services/amadeus';
import type { FlightOffer } from '../types/flight';

export interface CachedDatePrice {
  minPrice: number | null;
  flightCount: number;
  loading: boolean;
  error: string | null;
  fetchedAt: number | null;
}

export const useDatePriceCache = () => {
  const [cache, setCache] = useState<Map<string, CachedDatePrice>>(new Map());

  const getPriceForDate = (date: string): CachedDatePrice | null => {
    return cache.get(date) || null;
  };

  const fetchPriceForDate = useCallback(
    async (origin: string, destination: string, date: string) => {
      // Check if already cached and fresh (< 5 min)
      const cached = cache.get(date);
      if (cached?.fetchedAt && Date.now() - cached.fetchedAt < 5 * 60 * 1000) {
        return cached;
      }

      // Set loading state
      setCache((prev) => {
        const updated = new Map(prev);
        updated.set(date, {
          minPrice: null,
          flightCount: 0,
          loading: true,
          error: null,
          fetchedAt: null,
        });
        return updated;
      });

      try {
        const flights: FlightOffer[] = await searchFlightsAPI(origin, destination, date);

        // Calculate min price
        let minPrice = Number.POSITIVE_INFINITY;
        flights.forEach((flight) => {
          const price = Number.parseFloat(flight.price.total);
          minPrice = Math.min(minPrice, price);
        });

        const result: CachedDatePrice = {
          minPrice: minPrice === Number.POSITIVE_INFINITY ? null : minPrice,
          flightCount: flights.length,
          loading: false,
          error: null,
          fetchedAt: Date.now(),
        };

        setCache((prev) => {
          const updated = new Map(prev);
          updated.set(date, result);
          return updated;
        });

        return result;
      } catch (err) {
        const error = err instanceof Error ? err.message : 'Failed to fetch';
        const result: CachedDatePrice = {
          minPrice: null,
          flightCount: 0,
          loading: false,
          error,
          fetchedAt: Date.now(),
        };

        setCache((prev) => {
          const updated = new Map(prev);
          updated.set(date, result);
          return updated;
        });

        return result;
      }
    },
    [cache]
  );

  return { cache, getPriceForDate, fetchPriceForDate };
};
