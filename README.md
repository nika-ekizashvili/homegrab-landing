# HomeGrab landing page

Static site for [homegrab.usectl.com](https://homegrab.usectl.com/). Plain HTML,
CSS and JavaScript — **no build step, no dependencies, no CDN scripts.** Deploys
on push to `main` (usectl machine `private-itswhatever`), and the host serves
everything the `Dockerfile` copies: never commit anything private here (the design
export `Landing Page Design Ideas/` is git-ignored for that reason — its `uploads/`
holds internal docs).

```
index.html      the page
styles.css      design tokens + all components (also styles privacy.html / terms.html / 404.html)
app.js          language switch, theme, mobile menu, scroll reveal, the fill-card animation
privacy.html    privacy policy (KA + EN)
terms.html      terms of use (KA + EN)
support.html    support: contacts, quick fixes, cancelling and refunds (ka, en via app.js)
404.html        not-found page (noindex)
assets/img/     the "How it works" screenshots and og.png, the 1200x630 link-preview card
favicon.svg  robots.txt  sitemap.xml
Dockerfile  nginx.conf  .dockerignore   how the server is built (see "Server")
```

**Cloudflare caches static files for 4 hours.** Whenever `styles.css` or `app.js`
changes, bump the `?v=N` on their tags (`styles.css` in every page, `app.js` in
`index.html`); a new image gets a new file name. Don't open a new asset's URL on
the live site before it is deployed — Cloudflare would cache the 404.

## Server

usectl uses the repo's `Dockerfile` as-is (nginx:alpine + our `nginx.conf`) instead
of generating one. The config gives unknown addresses a real 404 (`404.html`;
the generated config answered every address with the homepage and a 200),
redirects `/privacy`, `/terms` and `/index.html` to their one address, and
`.dockerignore` keeps `*.md` and other repo files off the site.

Run it locally with any static server (paths are root-absolute, so `file://` won't do):

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Design

The 2026-10-17 redesign is a port of the Claude Design export "HomeGrab Landing"
(`Landing Page Design Ideas/HomeGrab Landing.dc.html`, kept locally, not committed).
That file runs on React + Babel from a CDN; this site reproduces it in plain
HTML/CSS. Sections: hero · how it works · both sites at once (fill card) · Google
Sheet · security · pricing (+ agencies) · footer. The security section is not in
the export; it was added on request, in the export's card style.

## The rule this site is built on

Every claim on the page is traceable to the shipped extension (`../adsync-extension`,
v1.0.32) or to a decision already made (prices, trial, agency seats). No testimonials,
no user counts, no fabricated store ratings.

Copy comes from `../adsync-extension/docs/landing-kit/COPY.md` (ka/en, line for line).
**Do not source copy from the other files in `../adsync-extension/docs/`** — many
describe *proposals* in the same confident tone as shipped behaviour.

## Things that must be re-checked when the extension changes

| On the page | Source of truth | Why it matters |
|---|---|---|
| The 12 tracker column headers, **in order** | `lib/google-api.js` (`HEADER_ROW`) | The extension adopts a spreadsheet only when its first row matches `HEADER_ROW` exactly. A page showing other columns is wrong about the user's own sheet. |
| `Uploaded: N` day marker, date in column K | `lib/day-grouping.js` | Marker text and where the block date sits. |
| The step screenshots (popup buttons, „ფორმა შევსებულია") | `popup/popup.jsx` | They are real captures (landing-kit shots 01, 02/03, 28/29). Recapture when the popup changes. |
| Fill-card values | the real „SS & MyHome" run on ss.ge 36916024 | ვაკე · ი. ჭავჭავაძის გამზ. 29, ₾897,000, 115 m², 4 rooms. |
| Security cards | `privacy.html`, `public/manifest.json` (`drive.file`) | "Only the files it created" is the `drive.file` scope. Change the page and `privacy.html` together. |
| Plan prices, 7-day trial | admin pricing (`docs/ADMIN-API-PLAN.md` §0), `store-assets/subscription-terms-ka.md` §2 | Prices are admin settings, not code. |
| Agency seats (₾15 per seat a month, min 5 seats; first 7 days free for the first 5 seats) | `docs/AGENCY-SEATS-PLAN.md` | **Not sold yet**: the card says „მალე“ and has no buy button. When seats ship, restore a „გამოწერა“ link. |
| Support page billing (trial, cancel path, refunds) | `store-assets/subscription-terms-ka.md` §2, §6, §7 | Quoted nearly word for word; change both together. |
| Subscription terms link | backend `GET /terms` (`https://homegrab-api.usectl.com/terms`) | One source: rendered from `subscription-terms-ka.md`. |

### Links that are hardcoded

Chrome Web Store listing — five places in `index.html` (header, mobile menu, hero,
pricing, footer band) and two in `support.html`:

```bash
grep -rn 'chromewebstore.google.com' *.html
```

Current: `https://chromewebstore.google.com/detail/home-grab/gkafeolkiffkkbbpeceaiefpglfblmkh`

Contacts: WhatsApp `https://wa.me/995575778142` and, for now, `eqiza99@gmail.com`
(agency card, support page, JSON-LD `Organization.email`, privacy.html, the subscription
terms). A future project address replaces it everywhere: `grep -rn eqiza99 .`

## Screenshots

`assets/img/step-*.webp` are the landing-kit shots (`../adsync-extension/docs/landing-kit/`)
converted with `cwebp -q 80–82` (shot 01 resized to 1200 px wide). Steps 2 and 3
have a light and a dark capture; CSS shows the one matching the theme.

## Language

Georgian is the default and is written directly into the HTML, so the page reads
correctly with JavaScript disabled. English lives in the `EN` object in `app.js`,
keyed by `data-i18n`. Attributes use `data-i18n-attr="attrName|key"`.

Adding a string means adding it in both places. `app.js` logs a console warning
listing any key that has no English counterpart.

Stays Georgian in both languages, on purpose: the tracker headers and rows, the
address in the fill card, and „ფორმა შევსებულია" — that is what the extension and
the sheet really show.

Georgian runs 25–40% longer than English, so **check both languages at 390px**
after any copy change.
