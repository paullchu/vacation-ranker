# Vacation Ranker: running the iPhone app on your Mac

The iPhone app wraps the same files as the website (index.html, themes.js, art.js) using Capacitor.
Native extras: a light vibration on every pick, and the iPhone share sheet for the results image
and challenge links. App ID: `com.paullchu.vacationranker`. iPhone only, portrait only.

## One-time setup (about 30 to 60 minutes, mostly downloading)
1. **Xcode**: install it free from the Mac App Store (it's large). Open it once and let it install its extra components.
2. **Node.js**: download the "LTS" installer from https://nodejs.org and run it.
3. **GitHub Desktop**: download from https://desktop.github.com, sign in as `paullchu`,
   then File → Clone Repository → `paullchu/vacation-ranker`. Note the folder it saves to.

## Open the app in Xcode
In GitHub Desktop choose Repository → Open in Terminal, then run these two commands:

    npm install
    npm run ios

Xcode opens the project. The first open takes a minute while it fetches packages.

## Run it
- **Simulator (no iPhone needed)**: at the top of Xcode pick a device such as "iPhone 16", then press ▶.
- **Your own iPhone (free, before the $99 account)**:
  1. In Xcode: click "App" in the left sidebar → "Signing & Capabilities" → Team → "Add an Account…" and sign in with your Apple ID. Choose "(Personal Team)".
  2. Plug in your iPhone, unlock it, tap "Trust". On the iPhone: Settings → Privacy & Security → Developer Mode → On (it restarts).
  3. Pick your iPhone at the top of Xcode and press ▶. The first time, on the iPhone go to Settings → General → VPN & Device Management and trust your developer profile.
  Apps installed this way stop opening after 7 days; just press ▶ again. The paid account removes this limit.

## After changing the app
Whenever the website files change, pull the latest in GitHub Desktop, then run `npm run sync` and press ▶ in Xcode.

## Publishing to the App Store (after the Apple Developer account is approved)
1. In Xcode, Signing & Capabilities → Team: pick your paid developer team.
2. https://appstoreconnect.apple.com → Apps → "+" → New App. Bundle ID `com.paullchu.vacationranker`, name "Vacation Ranker".
3. In Xcode: choose "Any iOS Device" at the top → Product → Archive → Distribute App → App Store Connect.
4. Test it on your phone through TestFlight, then fill in the listing (screenshots, description, privacy) and submit for review.
