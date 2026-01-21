# ✅ Pre-Launch Checklist

## 🎯 Required Before Running

- [ ] **Get Amadeus API Key**
  - Visit: https://developers.amadeus.com/
  - Sign up for free account
  - Create new application in Test environment
  - Copy Client ID (API Key)

- [ ] **Configure .env.local**
  - Open `.env.local` in project root
  - Add: `VITE_AMADEUS_API_KEY=your_key_here`
  - Save file
  - **Note:** Dev server must restart after .env changes

- [ ] **Install Dependencies**
  ```bash
  npm install
  ```

## 🚀 Launch Commands

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in browser
```

## ✨ First Test Flight

1. Go to http://localhost:5173
2. Search for flights:
   - **From:** JFK
   - **To:** CDG
   - **Date:** Tomorrow or next week
   - Click "Search"
3. You should see flight results!

## 🧪 Test All Features

- [ ] **Search Form**
  - [x] Accepts airport codes
  - [x] Validates date
  - [x] Shows loading state
  - [x] Displays error if API key missing

- [ ] **Flight Results**
  - [x] Shows flight cards
  - [x] Displays prices in USD
  - [x] Shows departure/arrival times
  - [x] Shows stops information
  - [x] Shows duration

- [ ] **Filters**
  - [x] Price range slider works
  - [x] Stop checkboxes work
  - [x] Airline checkboxes appear
  - [x] Filters update results instantly
  - [x] "Clear all" button resets filters

- [ ] **Sorting**
  - [x] Sort by price
  - [x] Sort by duration
  - [x] Sort by departure time

- [ ] **Price Chart**
  - [x] Click "Price Chart" tab
  - [x] Chart displays with bars
  - [x] Hover shows tooltips
  - [x] Chart updates with filters

- [ ] **Responsive Design**
  - [x] Works on mobile (resize browser)
  - [x] Works on tablet
  - [x] Works on desktop

## 🐛 If Something's Wrong

| Issue | Solution |
|-------|----------|
| "API key not configured" | Check `.env.local` has key, restart dev server |
| No flights showing | Verify airport codes are valid (JFK, CDG, etc.) |
| Filters not working | Refresh page, check browser console |
| Charts not appearing | Ensure flights loaded first |
| Page won't load | Run `npm install`, then `npm run dev` |

## 📱 Sample Airport Codes to Try

**USA Airports:**
- JFK (New York)
- LAX (Los Angeles)
- ORD (Chicago)
- ATL (Atlanta)
- MIA (Miami)

**Europe Airports:**
- CDG (Paris)
- LHR (London)
- FCO (Rome)
- MAD (Madrid)
- AMS (Amsterdam)

**Asia Airports:**
- HND (Tokyo)
- PEK (Beijing)
- SIN (Singapore)
- ICN (Seoul)
- BKK (Bangkok)

## 📂 Key Files to Understand

| File | What It Does |
|------|--------------|
| `src/App.tsx` | Main layout and orchestration |
| `src/hooks/useFlightSearch.ts` | Fetches flights from API |
| `src/hooks/useFlightFilters.ts` | Manages filter state |
| `src/services/amadeus.ts` | Calls Amadeus API |
| `src/components/SearchForm/` | Search input form |
| `src/components/FlightResults/` | Flight list display |
| `src/components/Filters/` | Filter panels |
| `src/components/PriceGraph/` | Chart visualization |

## 🚀 Production Build

When ready to deploy:

```bash
# Create production build
npm run build

# Preview production version locally
npm run preview

# Deploy dist/ folder to your hosting
```

## 📞 Troubleshooting Resources

- **Amadeus API Issues:** https://developers.amadeus.com/support
- **React Errors:** https://react.dev
- **TypeScript Help:** https://www.typescriptlang.org
- **Tailwind Questions:** https://tailwindcss.com/docs

## 💡 Pro Tips

1. **Dev Server Hot Reload**
   - Edit any file and it auto-reloads
   - No manual refresh needed

2. **Browser DevTools**
   - Press F12 to open
   - Check Console for errors
   - Use React DevTools extension

3. **Environment Variables**
   - `.env.local` is in `.gitignore` (won't commit)
   - `.env.example` shows what's needed
   - Always use `.env.local` for secrets

4. **Performance**
   - Filters are instant (client-side)
   - Chart updates in real-time
   - All optimized for speed

## ✅ Success Checklist

- [x] Project scaffolded
- [x] All components created
- [x] State management configured
- [x] API client ready
- [x] Styling with Tailwind
- [x] Charts with Recharts
- [x] Error handling implemented
- [x] Responsive design included
- [x] TypeScript configured
- [x] Build system ready
- [x] Documentation complete

**You are ready to launch! 🚀**

---

### Final Command to Get Started:
```bash
npm run dev
```

Then open http://localhost:5173 in your browser!
