/* Copies the website files into www/, which is what the iPhone app bundles. */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), out = path.join(root, "www");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "icons"), { recursive: true });
["index.html", "themes.js", "art.js", "manifest.webmanifest"].forEach(f => fs.copyFileSync(path.join(root, f), path.join(out, f)));
fs.readdirSync(path.join(root, "icons")).forEach(f => fs.copyFileSync(path.join(root, "icons", f), path.join(out, "icons", f)));
console.log("Copied app files to www/");
