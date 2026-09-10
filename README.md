# Chef's Menu Manager — MAST5112 POE Part 2

A React Native (Expo) app that lets a chef add menu items (Dish Name,
Description, Course, Price) and view them in a live-updating list.
Built to satisfy the Part 2 marking rubric: UI (30), Capture Menu
Information (25), Display Menu Items (25), and UX/validation (20).

## What's included

- `App.js` — the whole app: form, validation, confirmation messages, and list
- `package.json`, `app.json` — Expo project config
- No extra native dependencies — runs with plain Expo + React Native

## Features (mapped to the rubric)

- **UI**: clear title, consistent spacing, card-based list, simple color palette
- **Capture info**: Dish Name, Description, Course (Starter/Main/Dessert buttons), Price
- **Display**: FlatList of added items, count of items, auto-updates on add
- **UX**: required-field validation, inline error messages, success
  confirmation after adding, "no items yet" empty state

## Run it locally

1. Install Node.js (LTS) if you don't have it: https://nodejs.org
2. Install the Expo CLI tool (one-time):
   ```
   npm install -g expo-cli
   ```
   (or just use `npx expo start`, no global install needed)
3. In this project folder, install dependencies:
   ```
   npm install
   ```
4. Start the app:
   ```
   npx expo start
   ```
5. Scan the QR code with the **Expo Go** app on your phone (Android/iOS),
   or press `w` in the terminal to run it in a browser.

## Uploading to GitHub

1. Create a new repository on GitHub (e.g. `chef-menu-manager`).
2. From this folder, run:
   ```
   git init
   git add .
   git commit -m "Part 2: working menu manager app"
   git branch -M main
   git remote add origin https://github.com/Zwazwa26p/chef-menu-manager.git
   git push -u origin main
   ```
   (Replace the URL with your actual new repo's URL.)
3. Double check the repo is **public** or that your lecturer has access,
   and that it contains this latest code.

## Recording the demo video (3–5 min)

Run the app (via Expo Go or the web preview), then screen-record showing:
1. The user interface (title, form, layout)
2. Entering menu information for a dish
3. Triggering validation (e.g. submit with an empty field, see the error)
4. Successfully adding an item (see the confirmation message)
5. The item appearing in the list, and the list updating as you add more

Upload the recording to YouTube as **Unlisted**, then copy the link.

## Submitting Part 2

Per the brief, submit:
- Your GitHub repo link (this code, pushed)
- Your Unlisted YouTube video link

Both go into whatever submission form/portal your module uses on the
IIE portal — that step has to be done from your own student account.
