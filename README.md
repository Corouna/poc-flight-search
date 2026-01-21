# ✈️ Flight Search Engine - POC

A modern, responsive React-based flight search application that integrates with the Amadeus Flight Search API. Built with TypeScript, Tailwind CSS, Recharts, and clean state management.

## Features

- 🔍 **Flight Search** - Search one-way flights using IATA airport codes
- 🎯 **Advanced Filters** - Filter by price range, number of stops, and airline
- 📊 **Price Distribution Chart** - Visualize flight pricing patterns with Recharts
- 💱 **Responsive Design** - Mobile-first, works on all screen sizes
- 🎨 **Clean UI** - Built with Tailwind CSS for a modern look
- ⚡ **Fast Performance** - Client-side filtering for instant feedback
- 🔄 **Real-time Updates** - Graph and results update instantly when filters change
- 📱 **Tabbed Interface** - Switch between flight list and price chart views

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **State Management**: React Context API + useReducer
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
src/
├── components/
│   ├── SearchForm/          # Flight search input form
│   ├── FlightResults/       # Flight list and card components
│   ├── Filters/             # Price, stops, and airline filters
│   └── PriceGraph/          # Price distribution chart
├── hooks/
│   ├── useFlightSearch.ts   # API integration and flight fetching
│   └── useFlightFilters.ts  # Filter state management
├── services/
│   └── amadeus.ts           # Amadeus API client
├── types/
│   └── flight.ts            # TypeScript types and interfaces
├── utils/
│   ├── filterHelpers.ts     # Filtering and sorting logic
│   └── formatHelpers.ts     # Date/time formatting utilities
└── App.tsx                  # Main app component
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
   - Add your Amadeus API key to `.env.local`:
     ```
     VITE_AMADEUS_API_KEY=your_api_key_here
     ```

### Getting an Amadeus API Key

1. Go to [Amadeus Developer Portal](https://developers.amadeus.com/)
2. Sign up for a free account
3. Create a new application in the test environment
4. Copy your API key
5. Use the API key in your `.env.local` file

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

2. **Apply Filters**
   - **Price Range**: Drag the slider to set maximum price
   - **Stops**: Select nonstop, 1 stop, or 2+ stops
   - **Airlines**: Check specific airlines to filter by carrier

3. **Sort Results**
   - Sort by Price, Duration, or Departure time
   - Results update instantly

4. **View Price Distribution**
   - Click the "Price Chart" tab to see price distribution
   - Hover over bars for detailed information
   - Chart updates dynamically as you apply filters

## API Configuration

The app uses the Amadeus `shopping/flight-offers` endpoint:

```
GET https://test.api.amadeus.com/v2/shopping/flight-offers
```

**Required Parameters:**
- `originLocationCode`: IATA code of departure airport
- `destinationLocationCode`: IATA code of arrival airport
- `departureDate`: Date in YYYY-MM-DD format
- `adults`: Number of adult passengers (default: 1)

## State Management

The app uses React Context API with custom hooks for clean state separation:

- **useFlightSearch**: Handles API calls and flight data
- **useFlightFilters**: Manages all filter states and computed results

This approach avoids Redux while maintaining scalability and separation of concerns.

## Performance Considerations

- ✅ Filtering happens client-side for instant feedback
- ✅ Memoized selectors prevent unnecessary re-renders
- ✅ Lazy-loaded components for split code
- ✅ Tailwind CSS keeps bundle size small (~50KB)
- ✅ Responsive images and optimized assets

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

## Error Handling

The app gracefully handles:
- Invalid airport codes
- API rate limiting
- Network errors
- No results found
- Missing API key

## Future Enhancements

- Round-trip flights support
- Multiple passenger selection
- Seat selection and booking
- User flight history/saved searches
- Email notifications
- Dark mode
- Internationalization (i18n)
- Advanced filtering (departure time windows, duration ranges)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_AMADEUS_API_KEY` | Amadeus API Key | `xxxxxxxxxxxxx` |

## Troubleshooting

### "API key not configured" error
- Ensure `.env.local` file exists in the project root
- Verify `VITE_AMADEUS_API_KEY` is set correctly
- Vite needs a restart after `.env` changes

### No flights found
- Check airport codes are valid IATA codes
- Try different dates (some routes have limited options)
- Make sure the date is not in the past

### Chart not showing
- Ensure flights are loaded first
- Try clicking the "Price Chart" tab again
- Check browser console for errors

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the [Amadeus API Documentation](https://developers.amadeus.com/self-service)
- Review TypeScript/React documentation
- Check browser console for error messages
