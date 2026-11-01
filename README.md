# Vacation Ranker

Pick between two places, over and over, and get your personal top-to-bottom travel ranking.

## Files
- `index.html`: the app (screens, look and feel, ranking logic)
- `themes.js`: the catalog. Every place is listed once; each theme lists 10 place ids.
- `art.js`: draws the flat travel-poster illustration for each place's landmark.
- `ads.js`: sample native ad creatives (invented travel brands) that rotate 3 per ad card until a real ad network is connected.

## Run it
Open `index.html` in a web browser. No install needed.

## Themes (15)
- Beaches & Islands: Best Beach in the World, Caribbean Escapes, Tropical Islands
- Cities: Dream Europe Vacation, Best U.S. City Getaway, Asia Adventures
- Mountains & Outdoors: Ski Resorts, National Parks, Most Scenic Mountain Towns
- This or That: Beach vs Mountains, City vs Nature, City vs Beach
- Just for Fun: Honeymoon Destinations, Foodie Cities, Bucket-List Wonders

## How the ranking works
Each new place is slotted into your list with as few A-vs-B questions as possible
(binary insertion). Ranking 10 places takes about 20 to 25 picks.

## Ad slots (placeholders)
- Native in-feed ad card: top-right cell of each 2×2 theme group, same size as a theme card (rotates 3 creatives)
- Native ad card on the results page, between the #10 row and "What's next?"
- Bottom banner: 728×90 on desktop and tablets, 320×50 on phones

## Website
Hosted free on GitHub Pages at https://paullchu.github.io/vacation-ranker/ once Pages is turned on
(Settings → Pages → Deploy from a branch → `main` / root).
- `manifest.webmanifest`, `icons/` and `sw.js` make it installable ("Add to Home Screen") and work offline.
- `icons/og-image.png` is the preview card shown when the link is shared.
- When the site moves to its own domain, update `SITE_URL` in `index.html` and `og:image`.

## iPhone app (planned)
The same code will be wrapped as a native iPhone app with Capacitor.
Needs: an Apple Developer account ($99/year) and a Mac with Xcode, or a cloud build service.
