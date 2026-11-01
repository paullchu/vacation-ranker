/*
  VACATION RANKER: THE CATALOG
  ----------------------------
  Edit this file to change places or themes. No game code lives here.

  PLACES: every destination, listed once. A place can appear in many themes.
    name, country
    code     nearest major airport (shown like a boarding pass)
    art      which landmark illustration to draw (see art.js)
    vibe     drives the "travel personality" result:
             culture, history, sun, peaks, wild, romance, party, food
    tags     two short labels shown on the card
    line     one sentence that sells the place

  THEMES: grouped on the home screen, 3 per group. Each lists exactly 10 place ids.
  cover (optional) is the preferred poster on the home screen. Covers never repeat.
*/
window.VR_PLACES = {
  /* ---- Europe ---- */
  london:     { name: "London", country: "United Kingdom", code: "LHR", art: "bigben", vibe: "culture", tags: ["City", "Culture"], line: "Royal palaces, cozy pubs, and world-class museums" },
  rome:       { name: "Rome", country: "Italy", code: "FCO", art: "colosseum", vibe: "history", tags: ["City", "History"], line: "Ancient ruins, piazzas, and pasta around every corner" },
  barcelona:  { name: "Barcelona", country: "Spain", code: "BCN", art: "sagrada", vibe: "party", tags: ["City", "Beach"], line: "Gaudí, late-night tapas, and the Mediterranean" },
  berlin:     { name: "Berlin", country: "Germany", code: "BER", art: "brandenburg", vibe: "party", tags: ["City", "Nightlife"], line: "Street art, big history, and clubs that never close" },
  prague:     { name: "Prague", country: "Czechia", code: "PRG", art: "tyn", vibe: "history", tags: ["City", "History"], line: "A fairytale old town on the Vltava River" },
  amsterdam:  { name: "Amsterdam", country: "Netherlands", code: "AMS", art: "canalhouses", vibe: "culture", tags: ["City", "Canals"], line: "Bikes, canals, and tall gabled houses" },
  paris:      { name: "Paris", country: "France", code: "CDG", art: "eiffel", vibe: "romance", tags: ["City", "Romance"], line: "Cafés, the Seine, and the Eiffel Tower lit up at night" },
  santorini:  { name: "Santorini", country: "Greece", code: "JTR", art: "santorini", vibe: "romance", tags: ["Island", "Sunsets"], line: "White villages perched above a volcanic sea" },
  dubrovnik:  { name: "Dubrovnik", country: "Croatia", code: "DBV", art: "dubrovnik", vibe: "history", tags: ["Coast", "Old Town"], line: "Walk the medieval walls above the Adriatic" },
  lisbon:     { name: "Lisbon", country: "Portugal", code: "LIS", art: "tram", vibe: "food", tags: ["City", "Coast"], line: "Hilltop views, yellow trams, and warm pastéis de nata" },
  amalfi:     { name: "Amalfi Coast", country: "Italy", code: "NAP", art: "amalfi", vibe: "romance", tags: ["Coast", "Scenic"], line: "Cliffside towns, lemon groves, and winding sea roads" },
  iceland:    { name: "Iceland", country: "Iceland", code: "KEF", art: "aurora", vibe: "wild", tags: ["Nature", "Northern Lights"], line: "Waterfalls, glaciers, and the northern lights" },

  /* ---- Beaches & islands ---- */
  maui:       { name: "Maui", country: "Hawaii, USA", code: "OGG", art: "maui", vibe: "sun", tags: ["Island", "Surf"], line: "Golden beaches, volcano sunrises, and the Road to Hana" },
  borabora:   { name: "Bora Bora", country: "French Polynesia", code: "BOB", art: "borabora", vibe: "romance", tags: ["Island", "Luxury"], line: "Overwater bungalows in a turquoise lagoon" },
  maldives:   { name: "Maldives", country: "Maldives", code: "MLE", art: "overwater", vibe: "sun", tags: ["Island", "Luxury"], line: "Private islands and the clearest water on Earth" },
  bali:       { name: "Bali", country: "Indonesia", code: "DPS", art: "bali", vibe: "culture", tags: ["Island", "Temples"], line: "Rice terraces, temple gates, and surf breaks" },
  seychelles: { name: "Seychelles", country: "Seychelles", code: "SEZ", art: "granite", vibe: "sun", tags: ["Island", "Beach"], line: "Giant granite boulders on powder-white sand" },
  tulum:      { name: "Tulum", country: "Mexico", code: "TQO", art: "tulum", vibe: "sun", tags: ["Beach", "Ruins"], line: "Mayan ruins on a cliff above the Caribbean" },
  whitehaven: { name: "Whitehaven Beach", country: "Australia", code: "HTI", art: "whitehaven", vibe: "sun", tags: ["Beach", "Reef"], line: "Swirling white sand on the edge of the Great Barrier Reef" },
  navagio:    { name: "Navagio Beach", country: "Greece", code: "ZTH", art: "navagio", vibe: "wild", tags: ["Beach", "Cove"], line: "A shipwreck in a cove only reachable by boat" },
  rio:        { name: "Rio de Janeiro", country: "Brazil", code: "GIG", art: "rio", vibe: "party", tags: ["City", "Beach"], line: "Copacabana, samba, and Christ the Redeemer" },
  gracebay:   { name: "Turks & Caicos", country: "Turks & Caicos", code: "PLS", art: "gracebay", vibe: "sun", tags: ["Beach", "Calm"], line: "Grace Bay's endless sand and glassy water" },
  aruba:      { name: "Aruba", country: "Aruba", code: "AUA", art: "aruba", vibe: "sun", tags: ["Island", "Sunshine"], line: "Sunny every day, with windswept divi-divi trees" },
  stlucia:    { name: "St. Lucia", country: "St. Lucia", code: "UVF", art: "pitons", vibe: "romance", tags: ["Island", "Hiking"], line: "Twin volcanic peaks rising straight from the sea" },
  jamaica:    { name: "Jamaica", country: "Jamaica", code: "MBJ", art: "negril", vibe: "party", tags: ["Island", "Music"], line: "Reggae, jerk chicken, and Negril's cliff sunsets" },
  bahamas:    { name: "The Exumas", country: "Bahamas", code: "GGT", art: "pigs", vibe: "sun", tags: ["Island", "Boating"], line: "Sandbars, hidden cays, and the famous swimming pigs" },
  barbados:   { name: "Barbados", country: "Barbados", code: "BGI", art: "chattel", vibe: "food", tags: ["Island", "Rum"], line: "Rum shacks, fish fry, and colorful chattel houses" },
  puertorico: { name: "Puerto Rico", country: "USA", code: "SJU", art: "elmorro", vibe: "history", tags: ["Island", "Old Town"], line: "Old San Juan's forts and a glowing bioluminescent bay" },
  cayman:     { name: "Grand Cayman", country: "Cayman Islands", code: "GCM", art: "cayman", vibe: "sun", tags: ["Beach", "Snorkeling"], line: "Seven Mile Beach and swimming with stingrays" },
  stbarts:    { name: "St. Barts", country: "France", code: "SBH", art: "stbarts", vibe: "party", tags: ["Island", "Glamour"], line: "Superyachts, French cafés, and red-roofed villas" },
  stjohn:     { name: "St. John", country: "U.S. Virgin Islands", code: "STT", art: "stjohn", vibe: "wild", tags: ["Island", "Snorkeling"], line: "A national park island with sugar mill ruins" },
  fiji:       { name: "Fiji", country: "Fiji", code: "NAN", art: "fiji", vibe: "sun", tags: ["Island", "Friendly"], line: "Thatched bures, coral reefs, and a warm “Bula!”" },
  phuket:     { name: "Phuket", country: "Thailand", code: "HKT", art: "longtail", vibe: "party", tags: ["Island", "Nightlife"], line: "Longtail boats, limestone cliffs, and night markets" },
  mauritius:  { name: "Mauritius", country: "Mauritius", code: "MRU", art: "lemorne", vibe: "sun", tags: ["Island", "Lagoon"], line: "A mountain lagoon ringed by a coral reef" },
  palawan:    { name: "Palawan", country: "Philippines", code: "PPS", art: "palawan", vibe: "wild", tags: ["Island", "Lagoons"], line: "Hidden lagoons between towering limestone cliffs" },
  zanzibar:   { name: "Zanzibar", country: "Tanzania", code: "ZNZ", art: "dhow", vibe: "culture", tags: ["Island", "Spice"], line: "Stone Town spice markets and dhows at sunset" },

  /* ---- World & U.S. cities ---- */
  tokyo:      { name: "Tokyo", country: "Japan", code: "HND", art: "tokyo", vibe: "food", tags: ["City", "Food"], line: "Neon streets, quiet shrines, and the world's best sushi" },
  nyc:        { name: "New York City", country: "USA", code: "JFK", art: "empire", vibe: "culture", tags: ["City", "Broadway"], line: "Broadway, Central Park, and a skyline like no other" },
  dubai:      { name: "Dubai", country: "UAE", code: "DXB", art: "burj", vibe: "party", tags: ["City", "Luxury"], line: "The world's tallest tower and desert adventures" },
  sydney:     { name: "Sydney", country: "Australia", code: "SYD", art: "opera", vibe: "sun", tags: ["City", "Harbor"], line: "The Opera House, Bondi Beach, and harbor ferries" },
  singapore:  { name: "Singapore", country: "Singapore", code: "SIN", art: "mbs", vibe: "food", tags: ["City", "Food"], line: "Hawker food, sky gardens, and Marina Bay at night" },
  istanbul:   { name: "Istanbul", country: "Türkiye", code: "IST", art: "mosque", vibe: "history", tags: ["City", "Bazaars"], line: "Where Europe meets Asia across the Bosphorus" },
  sf:         { name: "San Francisco", country: "USA", code: "SFO", art: "goldengate", vibe: "culture", tags: ["City", "Bay"], line: "Cable cars, foggy hills, and the Golden Gate" },
  chicago:    { name: "Chicago", country: "USA", code: "ORD", art: "willis", vibe: "food", tags: ["City", "Architecture"], line: "Deep-dish pizza, lakefront trails, and great architecture" },
  neworleans: { name: "New Orleans", country: "USA", code: "MSY", art: "frenchquarter", vibe: "party", tags: ["City", "Jazz"], line: "Jazz, beignets, and iron balconies in the French Quarter" },
  lasvegas:   { name: "Las Vegas", country: "USA", code: "LAS", art: "vegas", vibe: "party", tags: ["City", "Shows"], line: "Neon, big shows, and a desert full of surprises" },
  miami:      { name: "Miami", country: "USA", code: "MIA", art: "artdeco", vibe: "party", tags: ["City", "Beach"], line: "Art Deco, Cuban coffee, and South Beach" },
  nashville:  { name: "Nashville", country: "USA", code: "BNA", art: "nashville", vibe: "party", tags: ["City", "Music"], line: "Honky-tonks, hot chicken, and live music every night" },
  austin:     { name: "Austin", country: "USA", code: "AUS", art: "capitol", vibe: "food", tags: ["City", "BBQ"], line: "Brisket, live music, and swimming holes" },
  seattle:    { name: "Seattle", country: "USA", code: "SEA", art: "needle", vibe: "culture", tags: ["City", "Coffee"], line: "Pike Place, coffee culture, and Mount Rainier views" },
  dc:         { name: "Washington, D.C.", country: "USA", code: "DCA", art: "dccapitol", vibe: "history", tags: ["City", "Museums"], line: "Free museums and monuments on the National Mall" },
  mexicocity: { name: "Mexico City", country: "Mexico", code: "MEX", art: "angel", vibe: "food", tags: ["City", "Tacos"], line: "Tacos al pastor, murals, and grand plazas" },
  lima:       { name: "Lima", country: "Peru", code: "LIM", art: "lima", vibe: "food", tags: ["City", "Ceviche"], line: "Ceviche, cliffs over the Pacific, and top restaurants" },

  /* ---- Asia ---- */
  kyoto:      { name: "Kyoto", country: "Japan", code: "KIX", art: "torii", vibe: "culture", tags: ["Temples", "Tradition"], line: "Thousands of torii gates and quiet temple gardens" },
  seoul:      { name: "Seoul", country: "South Korea", code: "ICN", art: "seoul", vibe: "food", tags: ["City", "K-Culture"], line: "Palaces, street food, and all-night K-pop energy" },
  bangkok:    { name: "Bangkok", country: "Thailand", code: "BKK", art: "watarun", vibe: "food", tags: ["City", "Street Food"], line: "Golden temples, floating markets, and street food" },
  hongkong:   { name: "Hong Kong", country: "China", code: "HKG", art: "hongkong", vibe: "food", tags: ["City", "Dim Sum"], line: "Dim sum, harbor junks, and a dazzling skyline" },
  halong:     { name: "Ha Long Bay", country: "Vietnam", code: "HAN", art: "halong", vibe: "wild", tags: ["Bay", "Cruises"], line: "Thousands of limestone islands in emerald water" },
  angkor:     { name: "Angkor Wat", country: "Cambodia", code: "SAI", art: "angkor", vibe: "history", tags: ["Temples", "History"], line: "Sunrise over the world's largest temple" },
  taipei:     { name: "Taipei", country: "Taiwan", code: "TPE", art: "taipei101", vibe: "food", tags: ["City", "Night Markets"], line: "Night markets, hot springs, and Taipei 101" },

  /* ---- Ski & mountains ---- */
  whistler:   { name: "Whistler", country: "Canada", code: "YVR", art: "whistler", vibe: "peaks", tags: ["Ski", "Village"], line: "Two giant mountains linked by a record-setting gondola" },
  aspen:      { name: "Aspen", country: "USA", code: "ASE", art: "aspen", vibe: "peaks", tags: ["Ski", "Glamour"], line: "Golden aspens, four mountains, and après-ski style" },
  zermatt:    { name: "Zermatt", country: "Switzerland", code: "ZRH", art: "matterhorn", vibe: "peaks", tags: ["Ski", "Car-Free"], line: "A car-free village under the Matterhorn" },
  vail:       { name: "Vail", country: "USA", code: "EGE", art: "vail", vibe: "peaks", tags: ["Ski", "Village"], line: "Legendary back bowls and a Bavarian-style village" },
  chamonix:   { name: "Chamonix", country: "France", code: "GVA", art: "chamonix", vibe: "peaks", tags: ["Ski", "Extreme"], line: "Mont Blanc and the cable car to the Aiguille du Midi" },
  stanton:    { name: "St. Anton", country: "Austria", code: "INN", art: "stanton", vibe: "party", tags: ["Ski", "Après-Ski"], line: "Deep powder and the Alps' liveliest après-ski" },
  niseko:     { name: "Niseko", country: "Japan", code: "CTS", art: "niseko", vibe: "peaks", tags: ["Ski", "Powder"], line: "Endless powder, onsen hot springs, and Mount Yōtei" },
  parkcity:   { name: "Park City", country: "USA", code: "SLC", art: "parkcity", vibe: "peaks", tags: ["Ski", "Old West"], line: "A silver-mining town turned ski capital" },
  jacksonhole:{ name: "Jackson Hole", country: "USA", code: "JAC", art: "tetons", vibe: "wild", tags: ["Ski", "Steep"], line: "Steep runs under the jagged Tetons" },
  cortina:    { name: "Cortina d'Ampezzo", country: "Italy", code: "VCE", art: "dolomites", vibe: "romance", tags: ["Ski", "Dolomites"], line: "Pink Dolomite peaks and Italian mountain glamour" },
  hallstatt:  { name: "Hallstatt", country: "Austria", code: "SZG", art: "hallstatt", vibe: "romance", tags: ["Lake", "Village"], line: "A storybook village on a mirror-still lake" },
  queenstown: { name: "Queenstown", country: "New Zealand", code: "ZQN", art: "queenstown", vibe: "wild", tags: ["Adventure", "Lake"], line: "The adventure capital of the world, on a glacial lake" },
  interlaken: { name: "Interlaken", country: "Switzerland", code: "ZRH", art: "interlaken", vibe: "peaks", tags: ["Alps", "Paragliding"], line: "Paragliding between two lakes below the Jungfrau" },
  telluride:  { name: "Telluride", country: "USA", code: "TEX", art: "telluride", vibe: "peaks", tags: ["Mountain Town", "Festivals"], line: "A Victorian main street in a box canyon" },
  sedona:     { name: "Sedona", country: "USA", code: "PHX", art: "sedona", vibe: "wild", tags: ["Red Rocks", "Hiking"], line: "Glowing red rock towers and desert trails" },

  /* ---- National parks ---- */
  yosemite:   { name: "Yosemite", country: "USA", code: "FAT", art: "halfdome", vibe: "wild", tags: ["Park", "Waterfalls"], line: "Half Dome, El Capitan, and giant sequoias" },
  yellowstone:{ name: "Yellowstone", country: "USA", code: "BZN", art: "geyser", vibe: "wild", tags: ["Park", "Wildlife"], line: "Old Faithful, rainbow hot springs, and bison herds" },
  grandcanyon:{ name: "Grand Canyon", country: "USA", code: "FLG", art: "canyon", vibe: "wild", tags: ["Park", "Views"], line: "A mile deep and endlessly colorful at sunset" },
  zion:       { name: "Zion", country: "USA", code: "SGU", art: "zion", vibe: "wild", tags: ["Park", "Hiking"], line: "Towering red cliffs and hikes through river canyons" },
  banff:      { name: "Banff", country: "Canada", code: "YYC", art: "moraine", vibe: "wild", tags: ["Park", "Lakes"], line: "Turquoise lakes beneath the Canadian Rockies" },
  torres:     { name: "Torres del Paine", country: "Chile", code: "PNT", art: "torres", vibe: "wild", tags: ["Park", "Patagonia"], line: "Patagonia's granite towers and glacier lakes" },
  serengeti:  { name: "Serengeti", country: "Tanzania", code: "JRO", art: "serengeti", vibe: "wild", tags: ["Safari", "Wildlife"], line: "The great migration across endless plains" },
  plitvice:   { name: "Plitvice Lakes", country: "Croatia", code: "ZAG", art: "plitvice", vibe: "wild", tags: ["Park", "Waterfalls"], line: "Sixteen terraced lakes joined by waterfalls" },
  milford:    { name: "Milford Sound", country: "New Zealand", code: "ZQN", art: "milford", vibe: "wild", tags: ["Fjord", "Cruises"], line: "Sheer fjord walls and Mitre Peak rising from the sea" },
  glacier:    { name: "Glacier National Park", country: "USA", code: "FCA", art: "glacier", vibe: "wild", tags: ["Park", "Scenic Drive"], line: "Going-to-the-Sun Road and vintage red buses" },

  /* ---- Wonders ---- */
  machupicchu:{ name: "Machu Picchu", country: "Peru", code: "CUZ", art: "machupicchu", vibe: "history", tags: ["Wonder", "Hiking"], line: "The lost Inca city high in the Andes" },
  petra:      { name: "Petra", country: "Jordan", code: "AQJ", art: "petra", vibe: "history", tags: ["Wonder", "Desert"], line: "A city carved into rose-red cliffs" },
  greatwall:  { name: "Great Wall of China", country: "China", code: "PEK", art: "greatwall", vibe: "history", tags: ["Wonder", "Hiking"], line: "Walk a wall that winds over mountain ridges" },
  tajmahal:   { name: "Taj Mahal", country: "India", code: "AGR", art: "taj", vibe: "romance", tags: ["Wonder", "Romance"], line: "A white marble monument to love" },
  giza:       { name: "Pyramids of Giza", country: "Egypt", code: "CAI", art: "pyramids", vibe: "history", tags: ["Wonder", "Ancient"], line: "The last standing wonder of the ancient world" },
  chichenitza:{ name: "Chichén Itzá", country: "Mexico", code: "CUN", art: "chichen", vibe: "history", tags: ["Wonder", "Maya"], line: "The great Maya pyramid of El Castillo" }
};

window.VR_THEMES = [
  { id: "europe", group: "Cities", title: "Dream Europe Vacation", blurb: "Ten classic European escapes.",
    places: ["london", "rome", "barcelona", "berlin", "prague", "amsterdam", "paris", "santorini", "dubrovnik", "lisbon"] },
  { id: "uscities", group: "Cities", title: "Best U.S. City Getaway", blurb: "Long weekends, all-American style.",
    places: ["nyc", "sf", "chicago", "neworleans", "lasvegas", "miami", "nashville", "austin", "seattle", "dc"] },
  { id: "asia", group: "Cities", title: "Asia Adventures", blurb: "Temples, street food, and skylines.",
    places: ["tokyo", "kyoto", "seoul", "bangkok", "singapore", "hongkong", "bali", "halong", "angkor", "taipei"] },

  { id: "beaches", group: "Beaches & Islands", title: "Best Beach in the World", blurb: "Sand, surf, and sunsets.",
    places: ["whitehaven", "navagio", "gracebay", "seychelles", "tulum", "rio", "maui", "maldives", "borabora", "bali"] },
  { id: "caribbean", group: "Beaches & Islands", title: "Caribbean Escapes", blurb: "Island hopping, rum punch in hand.",
    places: ["gracebay", "aruba", "stlucia", "jamaica", "bahamas", "barbados", "puertorico", "cayman", "stbarts", "stjohn"] },
  { id: "tropical", group: "Beaches & Islands", title: "Tropical Islands", blurb: "Palm trees and turquoise lagoons.",
    places: ["bali", "maldives", "borabora", "fiji", "maui", "seychelles", "phuket", "mauritius", "palawan", "zanzibar"] },

  { id: "ski", group: "Mountains & Outdoors", title: "Ski Resorts", blurb: "Powder days and après-ski.",
    places: ["whistler", "aspen", "zermatt", "vail", "chamonix", "stanton", "niseko", "parkcity", "jacksonhole", "cortina"] },
  { id: "parks", group: "Mountains & Outdoors", title: "National Parks", blurb: "Wild places worth the trip.",
    places: ["yosemite", "yellowstone", "grandcanyon", "zion", "banff", "torres", "serengeti", "plitvice", "milford", "glacier"] },
  { id: "mountaintowns", group: "Mountains & Outdoors", title: "Most Scenic Mountain Towns", blurb: "Cozy villages with big views.",
    places: ["hallstatt", "queenstown", "interlaken", "telluride", "zermatt", "chamonix", "banff", "sedona", "cortina", "aspen"] },

  { id: "beachmtn", group: "This or That", title: "Beach vs Mountains", blurb: "The great debate, settled for you.",
    places: ["maui", "maldives", "santorini", "tulum", "borabora", "zermatt", "banff", "torres", "queenstown", "aspen"] },
  { id: "citynature", group: "This or That", title: "City vs Nature", blurb: "Skylines or wild horizons?",
    places: ["nyc", "tokyo", "paris", "london", "dubai", "yosemite", "grandcanyon", "serengeti", "milford", "iceland"], cover: "milford" },
  { id: "citybeach", group: "This or That", title: "City vs Beach", blurb: "Museums and nightlife, or sand between your toes?",
    places: ["rome", "sf", "singapore", "istanbul", "mexicocity", "maldives", "gracebay", "seychelles", "whitehaven", "fiji"], cover: "seychelles" },

  { id: "honeymoon", group: "Just for Fun", title: "Honeymoon Destinations", blurb: "Where would you go to celebrate?",
    places: ["borabora", "maldives", "santorini", "amalfi", "bali", "paris", "seychelles", "stlucia", "maui", "fiji"] },
  { id: "foodie", group: "Just for Fun", title: "Foodie Cities", blurb: "Travel with your taste buds.",
    places: ["tokyo", "paris", "rome", "bangkok", "mexicocity", "neworleans", "barcelona", "istanbul", "lima", "singapore"], cover: "bangkok" },
  { id: "wonders", group: "Just for Fun", title: "Bucket-List Wonders", blurb: "Once-in-a-lifetime sights.",
    places: ["machupicchu", "petra", "greatwall", "tajmahal", "giza", "angkor", "chichenitza", "rio", "grandcanyon", "iceland"] }
];
