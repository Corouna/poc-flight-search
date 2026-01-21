# 🚀 Quick Setup Guide

## ⚡ Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Amadeus API Key
1. Visit: https://developers.amadeus.com/
2. Sign up for free
3. Create a new app in Test environment
4. Copy your API Key

### 3. Configure Environment
```bash
# Create .env.local (or edit if exists)
echo "VITE_AMADEUS_API_KEY=your_api_key_here" > .env.local
```

### 4. Start Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser 🎉

---

## 📁 Project Architecture Overview

### Directory Structure
```
src/
├── components/        # React UI components
├── hooks/            # Custom React hooks (state management)
├── services/         # API integration (Amadeus)
├── types/            # TypeScript interfaces
├── utils/            # Utility functions
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

### Data Flow
```
User Input (SearchForm)
    ↓
useFlightSearch Hook (API Call)
    ↓
Flights Data
    ↓
useFlightFilters Hook (Client-side filtering)
    ↓
FlightResults + PriceChart (Display)
```

---

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app layout & state management |
| `src/services/amadeus.ts` | API calls to Amadeus |
| `src/hooks/useFlightSearch.ts` | Flight data fetching |
| `src/hooks/useFlightFilters.ts` | Filter state management |
| `src/utils/filterHelpers.ts` | Filtering & sorting logic |
| `src/components/SearchForm/` | Search input form |
| `src/components/FlightResults/` | Flight list display |
| `src/components/Filters/` | Filter panels (price, stops, airline) |
| `src/components/PriceGraph/` | Price distribution chart |

---

## 🔧 Available Commands

```bash
npm run dev      # Start development server (with hot reload)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## 🧪 Testing the App

### Sample Search
- **From**: JFK (New York)
- **To**: CDG (Paris)
- **Date**: Pick any future date
- **Click**: Search

### Try These Airport Codes
- **USA**: JFK, LAX, ORD, ATL, MIA
- **Europe**: CDG, LHR, FCO, MAD, AMS
- **Asia**: HND, PEK, SIN, ICN, BKK

---

## ⚙️ Environment Variables

```
VITE_AMADEUS_API_KEY = Your Amadeus API Key
```

**Note**: Changes to `.env.local` require restarting the dev server

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| API key error | Check `.env.local` has correct key, restart dev server |
| No flights found | Try different airports/dates, check airport codes |
| Page won't load | Run `npm install`, then `npm run dev` |
| Build fails | Delete `node_modules`, run `npm install` again |

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org/en-US)
- [Amadeus API Docs](https://developers.amadeus.com/self-service)

---

## 💡 Development Tips

### Hot Module Replacement (HMR)
- Edit files and see changes instantly
- No need to refresh the page manually

### Console Logs
- Check browser DevTools (F12) for debugging
- API errors show in console

### Performance
- Filters are client-side for instant feedback
- Chart updates in real-time as you filter

---

## 🎨 Customization Ideas

- Change primary color in `tailwind.config.js` (currently blue)
- Add more filters in `src/components/Filters/`
- Customize chart in `src/components/PriceGraph/PriceChart.tsx`
- Add more sorting options in `src/utils/filterHelpers.ts`

---

Happy coding! 🚀
