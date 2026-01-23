# ✈️ Flight Search Engine - POC

A modern, responsive React-based flight search application that integrates with the Amadeus Flight Search API. Built with TypeScript, Tailwind CSS, Recharts, and clean state management.

## Features

- 🔍 **Flight Search** - Search one-way flights using IATA airport codes
- 📅 **Multi-Date Price Comparison** - View and compare prices across ±14 days from selected date
- 🎯 **Advanced Filters** - Filter by price range, number of stops, and airline
- 📊 **Price Distribution Chart** - Visualize flight pricing patterns with Recharts
- 💱 **Responsive Design** - Mobile-first, works on all screen sizes
- 🎨 **Clean UI** - Built with Tailwind CSS for a modern look
- ⚡ **Fast Performance** - Client-side filtering for instant feedback
- 🔄 **Real-time Updates** - Results and charts update instantly when filters change
- 📱 **Tabbed Interface** - Switch between flight list and price chart views
- 🎯 **Independent Scrolling** - Smooth scrolling for filters and results while keeping price comparison visible

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4 + PostCSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **State Management**: React Hooks + Context API
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
src/
├── components/
│   ├── SearchForm/              # Flight search input form
│   ├── FlightResults/           # Flight list, sort controls, and card components
│   ├── Filters/                 # Price, stops, and airline filters panel
│   ├── PriceGraph/              # Price distribution chart with loading state
│   └── PriceByDate/             # Multi-date price comparison scroller
├── hooks/
│   ├── useFlightSearch.ts       # API integration and flight fetching
│   ├── useFlightFilters.ts      # Filter state management and sorting
│   ├── useUrlState.ts           # URL parameter management for state persistence
│   └── useDatePriceCache.ts     # Price caching for multi-date comparison
├── services/
│   └── amadeus.ts               # Amadeus API client with OAuth2 authentication
├── types/
│   └── flight.ts                # TypeScript types and interfaces
├── utils/
│   ├── filterHelpers.ts         # Filtering, sorting, and price distribution logic
│   └── formatHelpers.ts         # Date/time formatting utilities
└── App.tsx                      # Main app component with layout orchestration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Amadeus Developer Account (free tier available at https://developers.amadeus.com/)

### Installation

1. **Navigate to the project**
   ```bash
   cd poc-flight-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Add your Amadeus API credentials to `.env.local`:
     ```
     VITE_AMADEUS_API_KEY=your_api_key_here
     VITE_AMADEUS_API_SECRET=your_api_secret_here
     ```

### Getting Amadeus API Credentials

1. Go to [Amadeus Developer Portal](https://developers.amadeus.com/)
2. Sign up for a free account
3. Create a new application in the test environment
4. Copy your **API Key** and **API Secret** from your app credentials
5. Add both to your `.env.local` file

### Running the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Search for Flights**
   - Enter departure airport code (e.g., JFK, LAX, LHR)
   - Enter destination airport code (e.g., CDG, ORY, BVA)
   - Select a departure date
   - Click "Search"

2. **Compare Prices by Date**
   - After search results appear, use the date price scroller at the top
   - Click left/right navigation arrows to scroll through dates
   - View cheapest available price for each date
   - Click any date to search flights for that specific date
   - Selected date card centers automatically and highlights in blue

3. **Apply Filters**
   - **Price Range**: Use the slider to set maximum price
   - **Stops**: Select nonstop, 1 stop, or 2+ stops
   - **Airlines**: Check specific airlines to filter by carrier
   - Filters work independently on left panel

4. **Sort Results**
   - Click sort buttons (💰 Price, ⏱️ Duration, 🕒 Departure)
   - Hover for tooltips explaining each sort option
   - Results update instantly
   - Sort controls scroll with flight list

5. **View Price Distribution**
   - Click the "📊" tab to switch to price chart view
   - See price distribution across all flights
   - Chart shows skeleton loader during flight searches (consistent with list view)
   - Hover over bars for detailed information
   - Chart updates dynamically as you apply filters

## API Configuration

The app uses the Amadeus Flight Search API with OAuth2 authentication:

**Authentication Endpoint:**
```
POST https://test.api.amadeus.com/v1/security/oauth2/token
```

**Search Endpoint:**
```
GET https://test.api.amadeus.com/v2/shopping/flight-offers
```

**Required Parameters:**
- `originLocationCode`: IATA code of departure airport
- `destinationLocationCode`: IATA code of arrival airport
- `departureDate`: Date in YYYY-MM-DD format
- `adults`: Number of adult passengers (default: 1)

**Authentication:**
- Uses client credentials flow with API Key and Secret
- Access token cached and reused until expiration
- Automatic token refresh on expiration

## Features Deep Dive

### Multi-Date Price Comparison

The PriceByDateScroller component allows users to:
- See prices for today through selected date + 14 days
- Never display dates before today
- Scroll through compact date cards showing day, date, and lowest price
- Click to search flights for any date in the range
- Automatically center selected date in view
- Cache prices to avoid redundant API calls (5-minute TTL)

### Independent Scrolling Layout

When search results are displayed:
- **Header & Price Scroller**: Fixed at top, always visible
- **Filter Panel**: Independent vertical scroll (left side)
- **Flight Results**: Independent vertical scroll (right side)
- **Page**: No scrolling - scroll only within designated areas
- Mobile: Single column with scrolling enabled

### State Management

The app uses React Hooks for clean state separation:

- **useFlightSearch**: Handles API calls, token management, flight data
- **useFlightFilters**: Manages filter states, sorting, computed results
- **useDatePriceCache**: Caches prices by date with automatic expiration
- **useUrlState**: Persists filters and sort to URL for bookmarkable searches

This approach avoids Redux while maintaining scalability and clear separation of concerns.

## Performance Considerations

- ✅ Filtering happens client-side for instant feedback
- ✅ Price caching prevents redundant API calls (5-minute TTL)
- ✅ Memoized computations prevent unnecessary re-renders
- ✅ Independent scrolling regions prevent layout thrashing
- ✅ Tailwind CSS keeps bundle size small
- ✅ Responsive images and optimized assets
- ✅ Skeleton loaders provide better perceived performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- **One-way flights only** (as per requirements)
- **Single passenger** (hardcoded to 1 adult)
- **Test API only** - Limited requests per minute
- **Data availability** - Some routes may have limited flight options
- **Date range**: Cannot search dates before today

## Error Handling

The app gracefully handles:
- Invalid airport codes
- API authentication failures
- API rate limiting
- Network errors
- No results found
- Missing or invalid API credentials
- Token expiration (automatic refresh)

## Troubleshooting

### "API key not configured" error
- Ensure `.env.local` file exists in the project root
- Verify both `VITE_AMADEUS_API_KEY` and `VITE_AMADEUS_API_SECRET` are set
- Vite needs a restart after `.env` changes

### Authentication errors
- Double-check API Key and Secret are correct
- Ensure they're from the test environment, not production
- Verify credentials are for OAuth2 enabled app

### No flights found
- Check airport codes are valid IATA codes
- Try different dates (some routes have limited options)
- Make sure the date is not in the past

### Chart not showing or loading slowly
- Ensure flights are loaded first
- Try clicking the "Price Chart" tab again
- Check browser console for errors
- Chart shows skeleton loader during active searches

### Prices by date not updating
- Wait for flight search to complete
- Scroll left/right to see more dates
- Check browser console for errors
- Prices are cached for 5 minutes per date

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_AMADEUS_API_KEY` | Amadeus API Key | Yes | `xxxxxxxxxxxxx` |
| `VITE_AMADEUS_API_SECRET` | Amadeus API Secret | Yes | `xxxxxxxxxxxxx` |

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the [Amadeus API Documentation](https://developers.amadeus.com/self-service)
- Review TypeScript/React documentation
- Check browser console for error messages
- Verify environment variables are correctly set

