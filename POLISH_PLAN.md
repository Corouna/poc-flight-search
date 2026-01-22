# Codebase Audit & Incremental Improvement Plan

## Current State Assessment

### ✅ What's Already Working

**State Management:**
- `useFlightSearch` hook: Manages `flights`, `loading`, `error`, search function
- `useFlightFilters` hook: Manages `filters`, `sortBy`, `filteredFlights`, `priceRange`
- App.tsx: Orchestrates both hooks, passes state to child components
- All state is centralized in custom hooks (no Redux needed)

**UI Components:**
- SearchForm: Validates inputs, handles errors locally, disables on loading
- FlightResults: Has basic skeleton loading, error state, empty state
- FilterPanel: Shows filters, has reset button with visibility logic
- Filter subcomponents: PriceFilter, StopsFilter, AirlineFilter (modular)

**Already Present in FlightResults:**
```tsx
if (loading) { /* 3-item skeleton with animate-pulse */ }
if (error) { /* error alert */ }
if (flights.length === 0) { /* empty state */ }
```

### 🎯 Improvement Opportunities (No Ripple Risk)

| Task | Current State | Localized Change | Why It's Safe |
|------|---------------|------------------|---------------|
| **1. Enhance loading/empty/error states** | Minimal UI | Add content/descriptions to existing if branches | Only modifies return JSX in FlightResults |
| **2. Improve skeleton loading** | Generic 3-item skeletons | Better visual structure (mimic FlightCard layout) | Only CSS in FlightResults loading state |
| **3. Clarify filter UX** | Works but subtle | Add section headers, active indicators, visual feedback | Only touches FilterPanel and subcomponents |
| **4. URL persistence** | No URL sync | Create `useUrlState` hook + update search params in useFlightSearch | New hook doesn't modify existing ones |
| **5. Accessibility** | Basic labels exist | Add missing ARIA labels, improve semantic HTML | Additive changes in components, no logic changes |

---

## Specific Implementation Points

### Task 1: Enhanced Loading/Empty/Error States
**File:** `src/components/FlightResults/FlightResults.tsx`

**Current:**
```tsx
if (loading) { return /* 3 animate-pulse divs */ }
if (error) { return /* red alert */ }
if (flights.length === 0) { return /* blue info */ }
```

**Change Location:** Each if block's return statement
- Loading: Add spinner icon, "Searching flights..." message
- Empty: Already good but can add helpful tips
- Error: Make error message more prominent with icon

**Risk Level:** MINIMAL - Only JSX, no prop/state changes

---

### Task 2: Skeleton Loading UI
**File:** `src/components/FlightResults/FlightResults.tsx` (same loading block)

**Current:** 3 generic grey boxes with animate-pulse

**Change:** Create visual that matches FlightCard shape:
- Header row (code, time)
- Middle row (duration, stops)
- Footer row (price)

**Risk Level:** MINIMAL - Pure CSS/JSX, uses existing skeleton pattern

---

### Task 3: Filter UX Clarity
**Files:** 
- `src/components/Filters/FilterPanel.tsx` - Add section headers
- `src/components/Filters/PriceFilter.tsx` - Active state styling
- `src/components/Filters/StopsFilter.tsx` - Active state indicator
- `src/components/Filters/AirlineFilter.tsx` - Active state indicator

**Current:** Clean layout but lacks visual hierarchy

**Changes:**
- Add "h3" headers to each filter section
- Bold/highlight active filter selections
- Increase "Clear all" button prominence
- Add "No filters applied" message when filters are reset

**Risk Level:** LOW - Cosmetic changes, existing state is already tracked (`hasActiveFilters`)

---

### Task 4: URL Query Params Persistence
**Files to Create/Modify:**
- `src/hooks/useUrlState.ts` (NEW) - Extract/restore from URL
- `src/hooks/useFlightSearch.ts` - Add `searchParams` to search call
- `src/App.tsx` - Call `useUrlState()` on mount

**Current:** No URL sync, search state lost on refresh

**Changes:**
- New hook reads `?from=JFK&to=LAX&date=2024-01-25&maxPrice=800&airlines=AA,UA`
- Updates App state from URL on mount
- Search hook updates URL after successful search
- Filter changes update URL query params

**Risk Level:** MEDIUM-LOW - New hook is isolated, but need to ensure search triggers on page load if URL params exist

---

### Task 5: Accessibility Improvements
**Files to Touch:**
- `src/components/SearchForm/SearchForm.tsx` - Add aria-invalid, aria-describedby for errors
- `src/components/FlightResults/FlightResults.tsx` - Add role="region", aria-live
- `src/components/Filters/FilterPanel.tsx` - Add fieldset/legend structure
- Filter subcomponents - aria-labels for checkboxes/sliders

**Current:** Basic labels exist, but missing ARIA roles and descriptions

**Changes:**
- Form error container: `aria-live="polite"` + `role="alert"`
- Results region: `role="region" aria-label="Flight results"`
- Filter section: `<fieldset>` + `<legend>` structure
- Individual filters: `aria-label` on checkbox buttons

**Risk Level:** MINIMAL - Additive HTML attributes, no logic/state changes

---

## Execution Order (Why This Sequence)

1. **Tasks 1-3** (Loading/Empty/Error, Skeleton, Filter UX): Immediate visual impact, completely safe, no dependencies
2. **Task 4** (URL Persistence): Requires coordination between hooks but isolated, good stopping point
3. **Task 5** (Accessibility): Last because it's refinement, doesn't unblock other features

---

## Code Quality Principles for This Phase

✅ **Keep existing logic untouched** - Only modify JSX/styling
✅ **Reuse existing state** - Don't add new state variables
✅ **Small, focused diffs** - Change one component at a time
✅ **No architectural changes** - No new context providers, no refactoring
✅ **Test as you go** - Verify each task works independently

---

## Reviewer Confidence Points These Improve

1. **Completeness:** Error handling is visible and helpful
2. **Professionalism:** Loading states feel polished (not skeleton → immediate results)
3. **UX Clarity:** Filters show what's applied, results show what's happening
4. **Persistence:** Work isn't lost on refresh (URL params)
5. **Inclusivity:** Accessible to keyboard/screen reader users

---

**Ready to execute? Recommend starting with Task 1 (Enhanced States) for immediate wins.** ✅
