/* =============================================================================
   HomeGrab landing page
   -----------------------------------------------------------------------------
   Bilingual model: Georgian is written directly into index.html as literal text
   (it is the primary language and must work with JavaScript disabled). Every
   translatable node carries data-i18n="key"; this file holds only the English
   side. Switching to English swaps text in place — there is no duplicated
   markup, so nothing is hidden-but-present to break layout.

   Attributes are translated via data-i18n-attr="attrName|key".
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* --- English strings ---------------------------------------------------- */
  var EN = {
    "a11y.skip": "Skip to main content",

    "nav.label": "Main",
    "nav.how": "How it works",
    "nav.features": "Features",
    "nav.tracker": "Tracker",
    "nav.privacy": "Privacy",
    "nav.pricing": "Pricing",
    "nav.menu": "Menu",
    "nav.langAria": "ქართულად გადართვა",
    "nav.themeAria": "Switch theme",

    "cta.add": "Add to Chrome",
    "cta.addFree": "Add to Chrome — free",
    "cta.how": "How it works",

    "hero.pill": "v1.0.13 · Free while in beta",
    "hero.h1": "One listing. Both sites. One click.",
    "hero.lede": "HomeGrab reads a listing on ss.ge or myhome.ge and fills in the other site's create form — fields, dropdowns, photos, address and contact. Then it logs a row to your own Google Sheet.",
    "hero.noteStrong": "You press publish.",
    "hero.note": "HomeGrab fills the form and stops. Publishing stays your decision.",
    "hero.popupAlt": "The HomeGrab popup on a listing page: tabs for Publish and Settings, and three buttons — SS & MyHome, MyHome.ge-ზე, SS.ge-ზე.",
    "hero.caption": "The popup on a listing page — v1.0.13",

    "how.eyebrow": "Three steps",
    "how.h2": "Open it, press it, check it — publishing is yours",
    "how.sub": "HomeGrab never publishes a listing by itself. It fills the form and waits for you.",
    "how.s1t": "Open a listing",
    "how.s1d": "Open one specific listing on ss.ge or myhome.ge and click the HomeGrab icon. It does not work on search-result pages.",
    "how.s1q": "“Open a specific listing to transfer it”",
    "how.s2t": "Press SS & MyHome",
    "how.s2d": "The other site's form opens and fills in seven stages — from category through to photos. “SS & MyHome” does both in parallel.",
    "how.s2q": "Session check · Category and type · Location · Details · Description and price · Amenities · Photos",
    "how.s3t": "Check it, then publish",
    "how.s3d": "The form is filled but unpublished. You review the data and you press publish. The listing ID is then written to the sheet automatically.",
    "how.s3q": "“Review the form and publish it yourself”",
    "how.shotAlt": "The myhome.ge create-listing form being filled by HomeGrab: property type “ბინა” and deal type “ქირავდება” are already selected.",
    "how.toastAlt": "HomeGrab progress notification reading “მდებარეობა (3/7)” — Location, step 3 of 7.",
    "how.figcap": "Progress is visible on the page itself — all seven stages.",

    "feat.eyebrow": "Features",
    "feat.h2": "What it does — and what it deliberately does not",
    "feat.g1": "Transfer",
    "feat.g1d": "One listing, the other site's form already filled.",
    "feat.f1t": "Reads one, fills the other",
    "feat.f1d": "Fields, dropdowns, photos, address and contact details — all of it carries over into the other platform's form.",
    "feat.f2t": "Both sites at once",
    "feat.f2d": "“SS & MyHome” opens both forms and fills them in parallel. One row is written to the sheet, and both platform IDs land in it.",
    "feat.f3t": "It never publishes for you",
    "feat.f3d": "The process deliberately stops at a filled form. “You press the publish button.” That is a choice, not a limitation.",

    "feat.g2": "Your terms",
    "feat.g2d": "Your name, your number, your price.",
    "feat.f4t": "Your name and number",
    "feat.f4d": "Your saved contact details are inserted into every new form in place of the original. The owner's number stays recorded in the sheet.",
    "feat.f5t": "Price markup",
    "feat.f5d": "A markup you set once is added to every new form automatically. Both figures are written to the sheet — “original / yours”.",
    "feat.f6t": "Area rounding",
    "feat.f6d": "Optional: rounds the area up to the next multiple of 5 m² (47 → 50). It is a persistent setting — it applies to later listings too.",
    "feat.f7t": "No retyping the description",
    "feat.f7d": "Your saved description text loads into the new form automatically. If you have not saved one, the original listing's text is used.",

    "feat.g3": "Tracking",
    "feat.g3d": "What you moved, and what you left half-done.",
    "feat.f8t": "Google Sheet",
    "feat.f8d": "Every transfer is written as a new row in a spreadsheet called “HomeGrab Tracker” — in your own Google Drive.",
    "feat.f9t": "Unfinished transfers",
    "feat.f9d": "A row with neither an SS nor a MyHome ID is an unfinished transfer. The popup shows them as a separate worklist you can pick up again.",
    "feat.f10t": "The daily count keeps itself",
    "feat.f10d": "Rows are grouped by day under an <code>Uploaded: N</code> marker whose number updates in place.",

    "feat.g4": "Reliability",
    "feat.g4d": "The part that broke on real listings and got fixed.",
    "feat.f11t": "The SS.ge draft dialog",
    "feat.f11d": "ss.ge sometimes asks about an unfinished draft, and that can wipe a filled form. HomeGrab detects it, raises a notification, and waits for you.",
    "feat.f12t": "Ground-truthed mapping",
    "feat.f12d": "66 cities, 54 districts, and street spellings. Every rule exists because a real listing broke on it once.",
    "feat.f13t": "Settings follow your Google account",
    "feat.f13d": "“Stored on your Google account, so it carries over to another computer too.” Still there after a reinstall.",

    "map.eyebrow": "Mapping tables",
    "map.h2": "The two sites agree on nothing",
    "map.sub": "Not on district names, not on street spellings, not on what a deal-type ID means. HomeGrab holds the translation table — and it was written by breaking real listings until it stopped.",
    "map.stat1": "cities mapped between the two platforms",
    "map.stat2": "districts — plus Tbilisi's 6 administrative districts and 6 suburb villages",
    "map.stat3": "real streets the spelling rules were measured against",
    "map.note1": "The same street. ss.ge glues the initial onto the surname — without handling that, the search finds nothing.",
    "map.note2": "Ordinal lanes are written three different ways. And “3rd lane” must not be confused with “2nd side-street”.",
    "map.foot": "Also mapped: deal and property types, building status, condition, project type, heating, hot water, room and bathroom types, parking, furniture, amenities and currency.",

    "tr.eyebrow": "HomeGrab Tracker",
    "tr.h2": "Every transfer is one row in your sheet",
    "tr.sub": "Twelve columns, Georgian headers, in your own Google Drive. The three ID columns lead, so you can see at a glance what was published and where.",
    "tr.caption": "Sample of the HomeGrab Tracker sheet, twelve columns",
    "tr.comment": "Price changed: 1250 → 1300",
    "tr.leg1t": "Uploaded: 7",
    "tr.leg1d": " — the day marker. Rows are grouped by day and the number updates itself, so your daily output is visible without counting.",
    "tr.leg2t": "Empty IDs",
    "tr.leg2d": " — the row is written when a transfer starts; the IDs land after publishing. So two empty IDs mean the listing was never published.",

    "sim.eyebrow": "Demo",
    "sim.h2": "Step through it",
    "sim.sub": "The same thing written above, just in sequence. Use the arrow keys or the buttons.",
    "sim.tablist": "Demo steps",
    "sim.prev": "Back",
    "sim.next": "Next",
    "sim.stage": "Current demo step",

    "pr.eyebrow": "Privacy and permissions",
    "pr.h2": "Your listing data stays in your own sheet",
    "pr.drive": "On Google Drive, HomeGrab can only see and edit the file it created itself — your “HomeGrab Tracker” sheet. It has no access to the rest of your Drive. That is not a promise; it is a boundary Google enforces.",
    "pr.scopesH": "The four Google permissions (OAuth 2.0)",
    "pr.thScope": "Scope",
    "pr.thWhat": "What it means",
    "pr.sc1": "Access only to files it created itself — your sheet.",
    "pr.sc2": "Confirms the sign-in.",
    "pr.sc3": "Basic account profile.",
    "pr.sc4": "The email address shown at the top of the popup.",
    "pr.permsH": "The six Chrome permissions",
    "pr.thPerm": "Permission",
    "pr.thWhy": "What for",
    "pr.p1": "Signing in with Google.",
    "pr.p2": "Storing your settings.",
    "pr.p3": "Scheduling background work.",
    "pr.p4": "Alerting you when you need to step in.",
    "pr.p5": "Filling the form on ss.ge and myhome.ge.",
    "pr.p6": "Opening and following the form's tab.",
    "pr.hostsH": "The sites it runs on",
    "pr.hostsD": "It does not load anywhere else:",
    "pr.pwH": "About passwords",
    "pr.pwD": "HomeGrab never asks for your ss.ge or myhome.ge password. It uses the browser session you are already signed into — the same one you use to open the form yourself.",
    "pr.pwD2": "Listing data — descriptions, prices, owners' phone numbers — is kept in your own Google Sheet, in your own Drive.",
    "pr.linkPrivacy": "Privacy policy",
    "pr.linkTerms": "Terms of use",

    "pc.eyebrow": "Pricing",
    "pc.h2": "Free right now",
    "pc.amount": "Free",
    "pc.body": "“Payments are currently disabled — every feature is free.” That is what the popup itself says. Nothing is gated and no card is asked for.",
    "pc.planNote": "Planned prices — not charged yet",
    "pc.p1": "Daily",
    "pc.p2": "Monthly",
    "pc.p3": "6 months",
    "pc.p4": "Yearly",

    "faq.eyebrow": "Questions",
    "faq.h2": "Frequently asked",
    "faq.q1": "Does it publish the listing automatically?",
    "faq.a1": "No. HomeGrab fills the form and stops. You press the publish button.",
    "faq.a1q": "“In both cases the chosen site's form opens and fills automatically. You press the publish button.”",
    "faq.q2": "Is my ss.ge or myhome.ge account at risk?",
    "faq.a2": "HomeGrab never asks for those passwords. It works inside the session you are already signed into in your browser.",
    "faq.q3": "What if the form is filled in wrongly?",
    "faq.a3": "You check everything before publishing — that is exactly why the process stops at a filled form. Address and price changes are recorded in the sheet as well.",
    "faq.a3q": "“Both are written to the sheet as ‘original / yours’.”",
    "faq.q4": "Where is my data kept?",
    "faq.a4": "In your own Google Sheet, in your own Drive. On Drive, HomeGrab can only reach the file it created itself — that is the limit of the <code>drive.file</code> scope.",
    "faq.q5": "Does it work on search-result pages?",
    "faq.a5": "No — open one specific listing first. The popup says so directly:",
    "faq.a5q": "“Open a specific listing to transfer it”",
    "faq.q6": "Is it free?",
    "faq.a6": "Yes, currently. Payments are disabled in the code itself and no feature is locked. The planned prices are listed above, but nothing is charged yet.",
    "faq.q7": "Does it work on Firefox or Safari?",
    "faq.a7": "No. HomeGrab is a Chrome extension, built on Manifest V3.",

    "faq.cite": "— the HomeGrab popup, translated from Georgian",

    "foot.nav": "Footer",
    "foot.disclaimer": "HomeGrab is an independent automation tool. It is not affiliated, associated, authorized, endorsed by, or in any way officially connected with SS.ge, MyHome.ge, or Google Sheets.",
    "foot.mv3": "Chrome · Manifest V3"
  };

  /* Keep the Georgian original so we can switch back without a reload. */
  var KA = {};
  var KA_ATTR = {};

  function capture() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!(k in KA)) KA[k] = el.innerHTML;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var bits = pair.split("|");
        var attr = bits[0].trim(), key = bits[1].trim();
        if (!(key in KA_ATTR)) KA_ATTR[key] = el.getAttribute(attr);
      });
    });
  }

  function apply(lang) {
    var dict = lang === "en" ? EN : KA;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    var adict = lang === "en" ? EN : KA_ATTR;
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var bits = pair.split("|");
        var attr = bits[0].trim(), key = bits[1].trim();
        if (adict[key] != null) el.setAttribute(attr, adict[key]);
      });
    });
    root.lang = lang;
    var label = document.getElementById("lang-label");
    if (label) label.textContent = lang === "en" ? "ქა" : "EN";
    document.title = lang === "en"
      ? "HomeGrab — one listing, both sites"
      : "HomeGrab — ერთი განცხადება, ორივე საიტი";
    renderSim();
  }

  /* --- Theme --------------------------------------------------------------- */
  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function paintThemeIcon() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var use = btn.querySelector("use");
    if (use) use.setAttribute("href", currentTheme() === "dark" ? "#i-sun" : "#i-moon");
  }

  /* --- Simulator -----------------------------------------------------------
     Keyboard-operable stepper. Everything it demonstrates also exists as static
     text or a screenshot elsewhere on the page, so nothing depends on it.
     It ends on a FILLED, UNPUBLISHED form — never on "published".
     ---------------------------------------------------------------------- */
  var FILL_KA = ["სესიის შემოწმება", "კატეგორია და ტიპი", "მდებარეობა", "დეტალები",
                 "აღწერა და ფასი", "კეთილმოწყობა", "ფოტოები"];
  var FILL_EN = ["Session check", "Category and type", "Location", "Details",
                 "Description and price", "Amenities", "Photos"];

  function fillList(done, lang) {
    var names = lang === "en" ? FILL_EN : FILL_KA;
    return '<ul class="fill-list">' + names.map(function (n, i) {
      var ok = i < done;
      return '<li><span class="tick' + (ok ? '' : ' tick--pending') + '" aria-hidden="true">' +
             (ok ? '✓' : (i + 1)) + '</span>' + n + '</li>';
    }).join("") + '</ul>';
  }

  function simSteps(lang) {
    var en = lang === "en";
    return [
      {
        tab: en ? "Open" : "გახსნა",
        title: en ? "Open one listing" : "გახსენი ერთი განცხადება",
        desc: en
          ? "On ss.ge or myhome.ge, open a single listing — not a search-result page — and click the HomeGrab icon."
          : "ss.ge-ზე ან myhome.ge-ზე გახსენი ერთი განცხადება — არა საძიებო შედეგები — და დააჭირე HomeGrab-ის ხატულას.",
        stage:
          '<div class="popup-card" style="background:var(--surface)">' +
          '<span class="popup-label">' + (en ? "Listing read" : "წაკითხული განცხადება") + '</span>' +
          '<span class="popup-field">ID 36104872 · ' + (en ? "SS.ge" : "SS.ge") + '</span>' +
          '<span class="popup-field">ალ.ყაზბეგის გამზ. 24 · საბურთალო</span>' +
          '<span class="popup-field">1250 $ · 3 ' + (en ? "rooms" : "ოთახი") + ' · 47 m²</span>' +
          '</div>'
      },
      {
        tab: en ? "Check" : "შემოწმება",
        title: en ? "Check the fields" : "შეამოწმე ველები",
        desc: en
          ? "Price and description apply to this listing only. Area rounding is a persistent setting: 47 m² becomes 50."
          : "ფასი და აღწერა მხოლოდ ამ განცხადებისთვისაა. დამრგვალება მუდმივი პარამეტრია: 47 მ² ხდება 50.",
        stage:
          '<div class="popup-card" style="background:var(--surface)">' +
          '<span class="popup-label">ფასი</span>' +
          '<span class="popup-field">1300</span>' +
          '<span class="popup-label">აღწერა</span>' +
          '<span class="popup-field is-placeholder">' + (en ? "your saved text" : "შენახული ტექსტი") + '</span>' +
          '<span class="popup-check"><span aria-hidden="true">✓</span> დამრგვალება (5 მ²) — 47 → 50</span>' +
          '</div>'
      },
      {
        tab: en ? "Fill" : "შევსება",
        title: en ? "The form fills itself" : "ფორმა ივსება",
        desc: en
          ? "The other site's create form opens and fills in seven stages. “SS & MyHome” runs both at once."
          : "იხსნება მეორე საიტის ფორმა და ივსება შვიდ საფეხურად. „SS & MyHome“ ორივეს ერთდროულად ასრულებს.",
        stage: fillList(3, lang) +
          '<p style="margin:var(--sp-3) 0 0;font-size:var(--fs-xs);color:var(--text-muted)">' +
          (en ? "Location (3/7)" : "მდებარეობა (3/7)") + '</p>'
      },
      {
        tab: en ? "Yours" : "შენზეა",
        title: en ? "Filled — and waiting for you" : "შევსებულია — და გელოდება",
        desc: en
          ? "Every stage is done. The form is filled but NOT published. You review it and you press publish; the ID is then written to the sheet."
          : "ყველა საფეხური დასრულდა. ფორმა შევსებულია, მაგრამ გამოუქვეყნებელი. შენ ამოწმებ და შენ აჭერ — ID შემდეგ ჩაიწერება ცხრილში.",
        stage: fillList(7, lang) +
          '<div class="awaiting">' +
          (en ? "Form filled — review it and publish it yourself"
              : "ფორმა შევსებულია — გადახედე და გამოაქვეყნე ხელით") +
          '</div>'
      }
    ];
  }

  var simIndex = 0;

  function renderSim() {
    var tabsEl = document.getElementById("sim-tabs");
    if (!tabsEl) return;
    var lang = root.lang === "en" ? "en" : "ka";
    var steps = simSteps(lang);
    if (simIndex >= steps.length) simIndex = 0;

    tabsEl.innerHTML = steps.map(function (s, i) {
      var sel = i === simIndex;
      return '<button class="sim-step" role="tab" id="sim-tab-' + i + '"' +
             ' aria-selected="' + sel + '" tabindex="' + (sel ? 0 : -1) + '"' +
             ' aria-controls="sim-stage">' +
             '<b>' + (lang === "en" ? "STEP " : "ნაბიჯი ") + (i + 1) + '</b>' + s.tab + '</button>';
    }).join("");

    var cur = steps[simIndex];
    document.getElementById("sim-title").textContent = cur.title;
    document.getElementById("sim-desc").textContent = cur.desc;
    document.getElementById("sim-stage").innerHTML = cur.stage;
    document.getElementById("sim-progress").textContent = (simIndex + 1) + " / " + steps.length;

    var prev = document.getElementById("sim-prev");
    var next = document.getElementById("sim-next");
    prev.disabled = simIndex === 0;
    next.disabled = simIndex === steps.length - 1;
    prev.style.opacity = prev.disabled ? 0.45 : 1;
    next.style.opacity = next.disabled ? 0.45 : 1;

    tabsEl.querySelectorAll(".sim-step").forEach(function (btn, i) {
      btn.addEventListener("click", function () { simIndex = i; renderSim(); focusTab(); });
      btn.addEventListener("keydown", function (e) {
        var last = steps.length - 1, moved = true;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") simIndex = i === last ? 0 : i + 1;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") simIndex = i === 0 ? last : i - 1;
        else if (e.key === "Home") simIndex = 0;
        else if (e.key === "End") simIndex = last;
        else moved = false;
        if (moved) { e.preventDefault(); renderSim(); focusTab(); }
      });
    });
  }

  function focusTab() {
    var el = document.getElementById("sim-tab-" + simIndex);
    if (el) el.focus();
  }

  /* --- Wiring -------------------------------------------------------------- */
  function init() {
    capture();

    var startLang = root.lang === "en" ? "en" : "ka";
    if (startLang === "en") apply("en"); else renderSim();
    paintThemeIcon();

    document.getElementById("lang-toggle").addEventListener("click", function () {
      var next = root.lang === "en" ? "ka" : "en";
      apply(next);
      store.set("hg-lang", next);
    });

    document.getElementById("theme-toggle").addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      store.set("hg-theme", next);
      paintThemeIcon();
    });

    var navToggle = document.getElementById("nav-toggle");
    var navLinks = document.getElementById("nav-links");
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.getElementById("sim-prev").addEventListener("click", function () {
      if (simIndex > 0) { simIndex--; renderSim(); }
    });
    document.getElementById("sim-next").addEventListener("click", function () {
      simIndex++; renderSim();
    });

    /* Subtle, once, and never when reduced motion is requested. */
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        "IntersectionObserver" in window) {
      var targets = document.querySelectorAll(".section-head, .card, .step, .stat, .compare-row");
      targets.forEach(function (el) { el.classList.add("reveal"); });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      targets.forEach(function (el) { io.observe(el); });
    }

    /* Parity guard: every Georgian key must have an English counterpart.
       Logged, not thrown — a missing translation must never break the page. */
    var missing = Object.keys(KA).concat(Object.keys(KA_ATTR))
      .filter(function (k) { return !(k in EN); });
    if (missing.length) console.warn("HomeGrab: missing EN strings for", missing);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
