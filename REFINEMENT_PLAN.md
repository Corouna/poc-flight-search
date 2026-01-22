# Visual Refinement & Polish Plan

## Current State Assessment

### Issues Identified

**1. Search Button Alignment**
- Button is in `flex items-end` wrapper but input padding creates misalignment
- Inputs have `py-2` (8px top/bottom) but button needs matching height
- Labels above inputs create visual misalignment
- Button should align with input baseline, not descend below

**2. Typography**
- Using system-ui font stack (looks generic)
- No font subsetting or modern UI font
- Font sizes are functional but not intentional
- Line heights not optimized for readability

**3. Visual Hierarchy**
- Form title and inputs not clearly grouped
- Labels use same weight as body text (50% distinction)
- Search button color is standard blue, not dominant CTA
- Spacing between label and input is uniform (should vary)

**4. Filter Panel**
- `shadow-md` + `border-b-2` creates visual heaviness
- Panel competes with results for attention
- Background is pure white (same as results)
- Spacing is dense (could breathe more)

**5. Chart**
- Default Recharts styling (admin-dashboard look)
- Title and labels lack hierarchy
- Margins/padding could be adjusted

---

## Refinement Strategy

### HIGH PRIORITY

**1. Fix Search Button Alignment**
- Change input `py-2` → `py-3` (12px) for taller input field
- Add `pt-5` to button wrapper to skip label height
- Use Tailwind's `h-[3rem]` for button to match input height exactly
- Align label baseline across all 3 inputs + button label area

**2. Import Inter Font**
- Add `@import 'inter'` or use Tailwind's built-in Inter support
- Set font-family in tailwind config
- Update font-weight scale: 500 for labels, 600 for headings, 700 for primary CTA

**3. Improve Visual Hierarchy**
- Increase heading size slightly (h1: text-4xl)
- Strengthen label weight (font-semibold instead of font-medium)
- Make Search button more dominant (brighter blue, subtle shadow on hover)
- Increase spacing between form sections

### SECONDARY

**4. Soften Filters Panel**
- Remove `shadow-md` → `shadow-sm` (lighter touch)
- Change from `border-b-2` → `border-b` (thinner divider)
- Slightly increase padding to give breathing room
- Make background slightly off-white (gray-50) to reduce contrast

**5. Elevate Chart**
- Add proper title and description
- Adjust margins to match form spacing
- Improve axis labels and tooltips

---

## Implementation Order

1. **index.css** - Add Inter font import
2. **tailwind.config.js** - Add Inter to font-family, extend spacing
3. **SearchForm.tsx** - Fix button alignment, update typography
4. **App.tsx** - Check header typography
5. **FilterPanel.tsx** - Soften styling
6. **Build & verify** - No errors, visual consistency

---

## Expected Outcome

After refinement:
- Form inputs and button perfectly aligned (no descenders)
- Typography is modern, intentional, and readable
- Visual hierarchy guides user to primary action
- Filter panel feels supportive, not dominant
- Overall appearance: polished, consumer-facing product
