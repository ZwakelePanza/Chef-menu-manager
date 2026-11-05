# Chef's Menu Manager — MAST5112 Final PoE

A React Native (Expo) app that lets a chef add, edit, delete, search, filter
and review statistics for menu items.

Repository: https://github.com/ZwakelePanza/Chef-menu-manager

## Run it

```
npm install
npx expo start
```

Scan the QR code with Expo Go (SDK 57). Expo Go on iOS needs you to be signed
in to the same Expo account in the app and in the terminal (`npx expo login`).

## Project structure

```
App.js                      Main screen, state and navigation
constants.js                Course list and shared colours
components/
  AppButton.js              Reusable button (primary / secondary / danger)
  CourseSelector.js         Course chips, used by the form and the filter
  MenuForm.js               One form for adding AND editing
  MenuItemCard.js           One menu item with Edit / Delete buttons
  SearchFilterBar.js        Search box, course filter, clear button
  StatsPanel.js             Statistics tiles
  TabBar.js                 Bottom navigation
utils/
  validation.js             Form validation rules
  menuHelpers.js            Filtering, statistics and price formatting
```

## Change log (since Part 2)

### New features
- **Edit menu items** — tap Edit on a card; the form opens filled in and saves changes.
- **Delete menu items** — tap Delete and confirm in the pop-up.
- **Search** — find items by dish name (not case sensitive).
- **Filter by course** — All, Starter, Main Course or Dessert.
- **Clear** — one button resets the search and filter.
- **Statistics screen** — total items, average price, and number of items per course.
- **Bottom navigation** — Menu, Add / Edit and Statistics tabs.

### Refactoring
- Split the single `App.js` into reusable components (`components/`).
- Moved validation into `utils/validation.js`.
- Moved filtering and statistics logic into `utils/menuHelpers.js` so it is not repeated.
- Moved colours and the course list into `constants.js` (no repeated values).
- The add and edit screens now share one `MenuForm` component.
- Course option renamed from "Main" to "Main Course" to match the brief.

### Improvements
- Validation: dish name must be at least 2 characters; errors clear as the user fixes the field.
- Feedback: success messages for add, update and delete; empty-state messages for "no items" and "no matches".
- Consistent colours, spacing and buttons across all screens.
- Item count shows "x of y" while a search or filter is active.
