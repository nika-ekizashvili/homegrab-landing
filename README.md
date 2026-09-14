# HomeGrab landing page

Static site for [homegrab.usectl.com](https://homegrab.usectl.com/). Plain HTML,
CSS and JavaScript — **no build step, no dependencies, no CDN scripts.** Deploys
on push to `main`.

```
index.html      the page
styles.css      design system + all components
app.js          language switch, theme, the step-through demo
privacy.html    privacy policy (KA + EN)
terms.html      terms of use (KA + EN)
assets/img/     screenshots (WebP)
favicon.svg  robots.txt  sitemap.xml
```

Run it locally with any static server:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## The rule this site is built on

Every claim on the page is traceable to the shipped extension
(`../adsync-extension`, v1.0.13). No invented numbers, no testimonials, no user
counts, no fabricated store ratings. If a section looks thin, it is thin because
the product does not do that thing yet.

**Do not source copy from `../adsync-extension/docs/`.** `FEATURES.md`,
`WATERMARK.md` and `ROADMAP.md` describe *proposals* in the same confident tone as
shipped behaviour — listing radar, owner CRM, photo watermarking, bulk publishing.
None of them are built.

## Things that must be re-checked when the extension changes

| On the page | Source of truth | Why it matters |
|---|---|---|
| The 12 tracker column headers, **in order** | `lib/google-api.js:71` (`HEADER_ROW`) | `findExistingSheet()` adopts a spreadsheet only when its first row matches `HEADER_ROW` **exactly**. If the extension's columns change and the page still shows the old ones, the page is lying about the user's own sheet. |
| `Uploaded: N` day marker | `lib/day-grouping.js:94` | Format is `Uploaded: ${count}`, written to column A. |
| The popup mock in the hero | `popup/popup.jsx` | Tab names (`:712`, `:719`), the `გამოაქვეყნე:` title (`:943`) and all three button labels (`:950`, `:957`, `:964`). Each is cited inline in `index.html`. |
| 66 cities / 54 districts | `lib/location-maps.js` | `CITY_NAME_MAP` L8–78, `DISTRICT_NAME_MAP` L80–183. Re-count, don't assume. |
| 45 streets | `lib/street-query.js:17` | Measured 2026-08-31. |
| OAuth scopes + Chrome permissions | `public/manifest.json` | Listed on the page *and* in `privacy.html`. Change both. |
| Plan prices | `lib/subscription.js` | Listed as **planned, not charged**. If `startCheckout` stops returning `{available:false}`, the pricing section and `terms.html` must change before launch. |

### Chrome Web Store URL

Hardcoded in three places in `index.html` (nav CTA, hero CTA, footer) and once in
`privacy.html`. If the listing URL ever changes:

```bash
grep -rn 'chromewebstore.google.com' *.html
```

Current: `https://chromewebstore.google.com/detail/home-grab/gkafeolkiffkkbbpeceaiefpglfblmkh`

### Version number

`v1.0.13` appears in the footer of all three pages. Bump with the extension.

## Screenshots

`assets/img/` holds WebP crops of `../adsync-extension/store-assets/walkthrough/step4.png`.

Every other image in `store-assets/` was audited and rejected: `screenshot1.png`
and `walkthrough/home.png` are screenshots of the *old landing page* (complete with
a Chrome "Screenshot captured" toast), `screenshot5.png` duplicates `screenshot4.png`,
`Pasted image.png` duplicates `step4.png`, and `screenshot2/3` + `step1/2` show a
**stale two-button popup** the product no longer has.

That is also why the hero popup is built in HTML rather than screenshotted — no
existing image shows the v1.0.13 three-button layout.

> The same stale images are live on the Chrome Web Store listing. Recapturing them
> is worth doing independently of this site.

## Language

Georgian is the default and is written directly into the HTML, so the page reads
correctly with JavaScript disabled. English lives in the `EN` object in `app.js`,
keyed by `data-i18n`. Attributes use `data-i18n-attr="attrName|key"`.

Adding a string means adding it in both places. `app.js` logs a console warning
listing any key that has no English counterpart.

Georgian runs 25–40% longer than English, so **check both languages at 390px**
after any copy change.
