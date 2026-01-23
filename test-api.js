import axios from 'axios';

const AMADEUS_API_BASE = 'https://test.api.amadeus.com/v2';
const AMADEUS_AUTH_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';
const API_KEY = 'NqHtOIhmE0gDtFqBjnS6huDnSbkliuaw';
const API_SECRET = '2HWOV9IraeVl8kGq';

async function testSearch() {
  try {
    // Get token
    console.log('Getting access token...');
    const authResponse = await axios.post(
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

    const token = authResponse.data.access_token;
    console.log('✓ Got access token');

    // Search flights
    console.log('Searching flights from NYC to LAX on 2025-02-15...');
    const response = await axios.get(`${AMADEUS_API_BASE}/shopping/flight-offers`, {
      params: {
        originLocationCode: 'NYC',
        destinationLocationCode: 'LAX',
        departureDate: '2025-02-15',
        adults: '1',
        currencyCode: 'USD',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('✓ Search successful!');
    console.log('Results:', response.data.data?.length || 0, 'flights found');
    if (response.data.data?.length > 0) {
      console.log('First flight:', response.data.data[0]);
    }
  } catch (error) {
    console.error('✗ Error:');
    if (axios.isAxiosError(error)) {
      console.error('Status:', error.response?.status);
      console.error('Message:', error.response?.data || error.message);
    } else {
      console.error(error);
    }
  }
}

testSearch();
