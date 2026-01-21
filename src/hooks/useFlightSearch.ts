import { useState, useCallback } from 'react';
import type { FlightOffer } from '../types/flight';
import { searchFlights as searchFlightsAPI } from '../services/amadeus';

interface UseFlightSearchResult {
  flights: FlightOffer[];
  loading: boolean;
  error: string | null;
  search: (origin: string, destination: string, departureDate: string) => Promise<void>;
  reset: () => void;
}

export const useFlightSearch = (): UseFlightSearchResult => {
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async (origin: string, destination: string, departureDate: string) => {
      setLoading(true);
      setError(null);
      setFlights([]);

      try {
        // Validate inputs
        if (!origin || !destination || !departureDate) {
          throw new Error('Please fill in all search fields');
        }

        // Check API key
        if (!import.meta.env.VITE_AMADEUS_API_KEY) {
          throw new Error('Amadeus API key not configured. Please add VITE_AMADEUS_API_KEY to .env');
        }

        const results = await searchFlightsAPI(origin, destination, departureDate);
        
        if (results.length === 0) {
          setError('No flights found for this route. Try different dates or airports.');
          setFlights([]);
        } else {
          setFlights(results);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        setFlights([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setFlights([]);
    setError(null);
    setLoading(false);
  }, []);

  return { flights, loading, error, search, reset };
};
