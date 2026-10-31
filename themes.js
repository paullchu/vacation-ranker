/*
  VACATION RANKER: THE CATALOG
  ----------------------------
  This file is the list of themes and places. You can edit it without
  touching the game code.

  Each place has:
    id       short unique name (no spaces)
    name     what players see
    country
    code     nearest major airport code (shown like a boarding pass)
    kind     the scene drawn on the card: "city", "coast", "island" or "mountain"
    tags     short labels shown on the card
    tagline  one line that sells the place
    sky      two colors for the illustrated sky (top, bottom)
    land     color of buildings / hills
    sea      color of water (coast and island scenes)
    wiki     Wikipedia page used to fetch a photo when the app is hosted
*/
window.VR_THEMES = [
  {
    id: "europe",
    title: "Dream Europe Vacation",
    blurb: "Ten classic European escapes. Which one wins your heart?",
    status: "live",
    places: [
      { id: "paris", name: "Paris", country: "France", code: "CDG", kind: "city", landmark: "eiffel",
        tags: ["City", "Romance"], tagline: "Cafés, the Seine, and the Eiffel Tower lit up at night",
        sky: ["#F3B9A0", "#F8E2C8"], land: "#3B3F63", wiki: "Paris" },
      { id: "rome", name: "Rome", country: "Italy", code: "FCO", kind: "city", landmark: "dome",
        tags: ["City", "History"], tagline: "Ancient ruins, piazzas, and pasta around every corner",
        sky: ["#F0A055", "#F9D9A8"], land: "#7A3B2E", wiki: "Rome" },
      { id: "barcelona", name: "Barcelona", country: "Spain", code: "BCN", kind: "coast",
        tags: ["City", "Beach"], tagline: "Gaudí, late-night tapas, and the Mediterranean",
        sky: ["#4FB0E0", "#C3E7F6"], land: "#C2552D", sea: "#1E6FB3", wiki: "Barcelona" },
      { id: "london", name: "London", country: "United Kingdom", code: "LHR", kind: "city", landmark: "clock",
        tags: ["City", "Culture"], tagline: "Royal palaces, cozy pubs, and world-class museums",
        sky: ["#8FA6C1", "#DCE3EC"], land: "#2D3A4F", wiki: "London" },
      { id: "amsterdam", name: "Amsterdam", country: "Netherlands", code: "AMS", kind: "city",
        tags: ["City", "Canals"], tagline: "Bikes, canals, and tall gabled houses",
        sky: ["#F0A39C", "#FBE2CB"], land: "#2F4858", wiki: "Amsterdam" },
      { id: "santorini", name: "Santorini", country: "Greece", code: "JTR", kind: "island",
        tags: ["Island", "Beach"], tagline: "White villages perched above a volcanic sea",
        sky: ["#2E86DE", "#ADD8F6"], land: "#B07A5A", sea: "#1452A6", wiki: "Santorini" },
      { id: "prague", name: "Prague", country: "Czechia", code: "PRG", kind: "city", landmark: "spires",
        tags: ["City", "History"], tagline: "A fairytale old town on the Vltava River",
        sky: ["#E78B6C", "#F6CBA2"], land: "#4A2C40", wiki: "Prague" },
      { id: "amalfi", name: "Amalfi Coast", country: "Italy", code: "NAP", kind: "coast",
        tags: ["Coast", "Scenic"], tagline: "Cliffside towns, lemon groves, and winding sea roads",
        sky: ["#FFB347", "#FFE2A6"], land: "#8C5A3C", sea: "#1F7A8C", wiki: "Amalfi_Coast" },
      { id: "swissalps", name: "Swiss Alps", country: "Switzerland", code: "ZRH", kind: "mountain",
        tags: ["Mountains", "Outdoors"], tagline: "Glacier peaks, mirror lakes, and alpine trains",
        sky: ["#7EC8E3", "#E6F5FB"], land: "#3E5C76", sea: "#2F7FA3", wiki: "Swiss_Alps" },
      { id: "lisbon", name: "Lisbon", country: "Portugal", code: "LIS", kind: "coast",
        tags: ["City", "Coast"], tagline: "Hilltop views, yellow trams, and warm pastéis de nata",
        sky: ["#FFC857", "#FFEBB5"], land: "#D06A4C", sea: "#2B6A99", wiki: "Lisbon" }
    ]
  },
  { id: "beaches",  title: "Best Beach in the World", blurb: "Sand, surf, and sunsets.",            status: "soon" },
  { id: "ski",      title: "Ski Resorts",             blurb: "Powder days and après-ski.",          status: "soon" },
  { id: "beachmtn", title: "Beach vs Mountains",      blurb: "The great debate, settled for you.",  status: "soon" },
  { id: "cities",   title: "Great World Cities",      blurb: "From Tokyo to New York.",             status: "soon" },
  { id: "parks",    title: "National Parks",          blurb: "Wild places worth the trip.",         status: "soon" }
];
