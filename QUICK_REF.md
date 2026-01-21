# ⚡ Quick Reference Card

## 🚀 Launch in 60 Seconds

```bash
# 1. Set API key in .env.local
VITE_AMADEUS_API_KEY=your_key_here

# 2. Run dev server
npm run dev

# 3. Open browser
http://localhost:5173
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env.local` | Add API key here |
| `src/App.tsx` | Main app logic |
| `src/services/amadeus.ts` | API calls |
| `src/hooks/useFlightSearch.ts` | Fetch flights |
| `src/hooks/useFlightFilters.ts` | Filter state |

---

## 🛠️ Commands

```bash
npm run dev       # Start dev server (with hot reload)
npm run build     # Build for production
npm run lint      # Check code quality
npm run preview   # Preview production build
```

---

## 🧪 Test Data

Try these airport codes:
- **JFK** → **CDG** (New York → Paris)
- **LAX** → **LHR** (LA → London)
- **ORD** → **CDG** (Chicago → Paris)

---

## 🔧 Environment Variables

```
VITE_AMADEUS_API_KEY=your_amadeus_api_key
```

**Get key from:** https://developers.amadeus.com/

---

## 📊 Project Structure

```
src/
├── components/      → UI components
├── hooks/          → State management
├── services/       → API client
├── types/          → TypeScript types
├── utils/          → Helper functions
└── App.tsx         → Main component
```

---

## 🎯 Key Features

- ✅ Flight search (IATA airport codes)
- ✅ Advanced filters (price, stops, airline)
- ✅ Real-time price chart
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| API key error | Check `.env.local`, restart dev server |
| No flights | Verify airport codes, try different dates |
| Page not loading | Run `npm install` then `npm run dev` |
| Chart not showing | Wait for flights to load first |

---

## 📱 Test Checklist

- [ ] Search for flights
- [ ] Apply filters
- [ ] View price chart
- [ ] Sort results
- [ ] Check on mobile
- [ ] Try error cases

---

## 💡 Pro Tips

1. **Hot Reload** - Edit files, see changes instantly
2. **DevTools** - Press F12 to debug
3. **Console** - Check console for errors
4. **Responsive** - Resize browser to test mobile
5. **Performance** - All filtering is instant (client-side)

---

## 📚 Documentation

- **README.md** - Full documentation
- **SETUP.md** - Setup guide
- **PROJECT_SUMMARY.md** - Completion details
- **CHECKLIST.md** - Launch checklist
- **OVERVIEW.md** - Visual overview

---

## 🚀 Next Steps

1. ✅ Get Amadeus API key
2. ✅ Add key to `.env.local`
3. ✅ Run `npm run dev`
4. ✅ Test all features
5. ✅ Deploy (optional)

---

## 🎉 You're Ready!

Everything is set up. Just add your API key and run `npm run dev`!

```bash
npm run dev
```

Open: **http://localhost:5173**

---

**Built with:** React, TypeScript, Tailwind, Recharts
**Status:** ✅ Production Ready
**Next:** Add API key and launch!
