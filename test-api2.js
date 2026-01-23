import axios from 'axios';

const AMADEUS_API_BASE = 'https://test.api.amadeus.com/v2';
const AMADEUS_AUTH_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';
const API_KEY = 'NqHtOIhmE0gDtFqBjnS6huDnSbkliuaw';
const API_SECRET = '2HWOV9IraeVl8kGq';

async function testSearch() {
  try {
    // Get token
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

    // Test with different dates and endpoints
    const testCases = [
      { origin: 'NYC', dest: 'LAX', date: '2025-02-15', label: 'Standard format' },
      { origin: 'JFK', dest: 'LAX', date: '2025-02-20', label: 'JFK instead of NYC' },
    ];

    for (const test of testCases) {
      try {
        console.log(`\n Testing: ${test.label}`);
        const response = await axios.get(`${AMADEUS_API_BASE}/shopping/flight-offers`, {
          params: {
            originLocationCode: test.origin,
            destinationLocationCode: test.dest,
            departureDate: test.date,
            adults: '1',
            currencyCode: 'USD',
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(`✓ Success! Found ${response.data.data?.length || 0} flights`);
      } catch (e) {
        console.log(`✗ Failed: ${e.response?.status} - ${e.response?.data?.errors?.[0]?.title}`);
      }
    }

    // Try the v1 API endpoint instead
    console.log(`\n\nTrying v1 endpoint...`);
    try {
      const response = await axios.get(`https://test.api.amadeus.com/v1/shopping/flight-offers`, {
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

      console.log(`✓ V1 Success! Found ${response.data.data?.length || 0} flights`);
    } catch (e) {
      console.log(`✗ V1 Failed: ${e.response?.status}`);
    }
  } catch (error) {
    console.error('Authentication error:', error.message);
  }
}

testSearch();
