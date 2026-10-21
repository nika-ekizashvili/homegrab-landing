# HomeGrab landing page

Static site for [homegrab.ge](https://homegrab.ge/). Plain HTML,
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
every page); a new image gets a new file name. Don't open a new `?v=` on the
live site before the new files are actually served: Cloudflare caches whatever it
gets first under that URL, a 404 or the OLD file. usectl reports a deploy "live"
about 16 minutes before the container switches (2026-10-21), so wait until a page
on homegrab.ge shows the new HTML, then open its assets and push anything that
links to them (the server's subscription terms page).

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
| Security cards (3) | `privacy.html` | Never publishes, no password, data in your own Sheet. The Drive-scope card was removed on 2026-10-18 (user); `privacy.html` still explains `drive.file`. |
| Plan prices, 7-day trial (pricing cards, JSON-LD, `terms.html` §5) | admin pricing (`docs/ADMIN-API-PLAN.md` §0), `store-assets/subscription-terms-ka.md` §2–3 | Prices are admin settings, not code. The 3-month card's struck price (₾52.50) is 3 × the 1-month price — change it with the month price. The cards show no "one-time / renews" label: since 2026-10-18 the buyer chooses auto-renew at checkout on every plan. |
| Agency seats (₾15 per seat a month, min 5 seats; the agency's first 7 days after registration free for all its agents) | `docs/AGENCY-SEATS-PLAN.md` §0 | **Not sold yet**: the card says „მალე“ and has no buy button. When seats ship, restore a „გამოწერა“ link. |
| Support page billing (trial, auto-renew switch „პარამეტრები → ავტომატური განახლება", refunds within 48 hours, card / Apple Pay / Google Pay) | `store-assets/subscription-terms-ka.md` §2, §4, §5–7 | Quoted nearly word for word; change both together. |
| Subscription terms link | `https://homegrab.ge/subscription-terms`: nginx proxies it to the server's `GET /terms` | One source: rendered from `subscription-terms-ka.md`. The server's own `/terms` address stays for older extensions. |

### One layout on every page

`index.html`, `support.html`, `privacy.html`, `terms.html` and `404.html` share one header
(logo · როგორ მუშაობს · უსაფრთხოება · ფასები · მხარდაჭერა · language · theme · Chrome button;
the menu button below 1080px) and one footer (support · privacy · terms · subscription terms).
Privacy is a footer link only. Every page but the home page starts with „← უკან" (`data-back`:
back to the previous page on this site, else home). Change the header or footer in all five.

**The server's subscription terms** (`https://homegrab.ge/subscription-terms`, proxied by `nginx.conf` from the server's `/terms`;
`../adsync-extension/backend/src/routes/terms.js`) wear this site's design too: they load
`styles.css?v=N` from here and carry a copy of the header and footer with absolute links. When
`styles.css` changes, bump `LANDING_CSS` there as well — and push this repo first, so the new
`?v=` exists before the server links to it.

### Links that are hardcoded

Chrome Web Store listing — five places in `index.html` (header, mobile menu, hero,
pricing, footer band) and two in `support.html`:

```bash
grep -rn 'chromewebstore.google.com' *.html
```

Current: `https://chromewebstore.google.com/detail/home-grab/gkafeolkiffkkbbpeceaiefpglfblmkh`

Contacts: WhatsApp `https://wa.me/995575778142` and `homegrab.support@gmail.com`
(agency card, support page, JSON-LD `Organization.email`, privacy.html, terms.html, and the
subscription terms in the extension repo). Site: `https://homegrab.ge` since 2026-10-21;
`homegrab.usectl.com` is gone. To change either, `grep -rn` both repos.

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
