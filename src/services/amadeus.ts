import axios from 'axios';
import type { FlightOffer } from '../types/flight';

const AMADEUS_API_BASE = 'https://test.api.amadeus.com/v2';
const AMADEUS_AUTH_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';
const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

// Token cache
let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

/**
 * Get a valid OAuth2 access token from Amadeus
 * Tokens are cached and reused until expiration
 */
const getAccessToken = async (): Promise<string> => {
  // Return cached token if still valid
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  try {
    const response = await axios.post(
      AMADEUS_AUTH_URL,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: API_KEY,
        client_secret: API_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, expires_in } = response.data;

    // Cache token with 60 second buffer before expiration
    cachedToken = access_token;
    tokenExpiresAt = Date.now() + (expires_in * 1000) - 60000;

    return access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Authentication failed: ${error.response?.data?.error_description || error.message}`
      );
    }
    throw new Error('Failed to authenticate with Amadeus API');
  }
};

export const searchFlights = async (
  origin: string,
  destination: string,
  departureDate: string
): Promise<FlightOffer[]> => {
  try {
    const token = await getAccessToken();

    const response = await axios.get(`${AMADEUS_API_BASE}/shopping/flight-offers`, {
      params: {
        originLocationCode: origin.toUpperCase(),
        destinationLocationCode: destination.toUpperCase(),
        departureDate,
        adults: '1',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    });

    return response.data.data || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorDetail = error.response?.data?.errors?.[0]?.detail || 
                         error.response?.data?.errors?.[0]?.title ||
                         error.message;
      throw new Error(`Flight search failed: ${errorDetail}`);
    }
    throw error;
  }
};

export const getAirlineInfo = async (carrierCode: string): Promise<string> => {
  try {
    const token = await getAccessToken();

    const response = await axios.get(
      `${AMADEUS_API_BASE}/reference-data/airlines`,
      {
        params: {
          airlineCodes: carrierCode,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data?.[0]?.businessName || carrierCode;
  } catch (error) {
    console.error('Failed to fetch airline info:', error);
    return carrierCode;
  }
};
