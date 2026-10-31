# Vacation Ranker

Pick between two places, over and over, and get your personal top-to-bottom travel ranking.

## Files
- `index.html`: the app (screens, look and feel, ranking logic)
- `themes.js`: the catalog. Every place is listed once; each theme lists 10 place ids.
- `art.js`: draws the flat travel-poster illustration for each place's landmark.

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
- Native in-feed ad card: top-right cell of each 2×2 theme group, same size as a theme card
- Bottom banner: 728×90 on desktop and tablets, 320×50 on phones
