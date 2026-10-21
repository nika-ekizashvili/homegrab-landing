/* =============================================================================
   HomeGrab landing page
   -----------------------------------------------------------------------------
   Bilingual model: Georgian is written directly into index.html as literal text
   (it is the primary language and must work with JavaScript disabled). Every
   translatable node carries data-i18n="key"; this file holds only the English
   side. Switching language swaps text in place — no duplicated markup.

   Attributes are translated via data-i18n-attr="attrName|key".
   Tracker headers, addresses and the popup's „ფორმა შევსებულია" stay Georgian
   in both languages: they are what the extension and the sheet really show.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- English strings ---------------------------------------------------- */
  var EN = {
    "a11y.skip": "Skip to main content",
    "nav.label": "Main",
    "nav.how": "How it works",
    "nav.security": "Security",
    "nav.pricing": "Pricing",
    "nav.support": "Support",
    "nav.back": "← Back",
    "nf.title": "Page not found",
    "nf.sub": "This address doesn't exist on HomeGrab.",
    "nf.home": "Back to the home page",
    "nav.lang": "Language",
    "nav.theme": "Switch theme",
    "nav.menu": "Menu",
    "cta.add": "Add to Chrome",

    "hero.h1": "One ad. Both sites. One click.",
    "hero.sub": "HomeGrab takes an ad from ss.ge or myhome.ge and fills in the other site's form for you — photos, address, price and description. You check it and publish.",
    "hero.how": "See how it works",
    "hero.note": "7 days free · no card needed",

    "how.h2": "How it works",
    "how.a1": "An ad on ss.ge with the HomeGrab popup open",
    "how.a2": "The HomeGrab popup's three buttons: SS & MyHome, MyHome.ge-ზე, SS.ge-ზე",
    "how.a3": "The HomeGrab popup after a fill: „ფორმა შევსებულია“ (form filled)",
    "how.s1t": "Open an ad",
    "how.s1d": "Any ad on ss.ge or myhome.ge.",
    "how.s2t": "Press one button",
    "how.s2d": "On SS.ge, on MyHome.ge, or both at once.",
    "how.s3t": "Check and publish",
    "how.s3d": "The form fills in seconds. Anything it couldn't fill is flagged. You press publish.",

    "both.h2": "Both sites at once",
    "both.sub": "One click fills both forms, and both IDs land in one row.",
    "both.replay": "Replay: SS & MyHome",
    "fill.type": "Type",
    "fill.typeV": "Apartment · Sale",
    "fill.addr": "Address",
    "fill.price": "Price",
    "fill.area": "Area",
    "fill.areaV": "115 m² · 4 rooms",
    "fill.photos": "Photos",

    "sheet.h2": "Your own Google Sheet",
    "sheet.sub": "Every transfer becomes a row in your sheet: source, IDs, price, address, metro. Each day gets its own block.",
    "sheet.aria": "The HomeGrab Tracker sheet: one row per transfer, each day in its own block.",

    "sec.pill": "Security",
    "sec.h2": "You always press publish",
    "sec.c1t": "Never publishes for you",
    "sec.c1d": "HomeGrab fills the form and stops. You press publish.",
    "sec.c2t": "Never asks for your password",
    "sec.c2d": "It needs no ss.ge or myhome.ge password — HomeGrab uses the session you're already signed into.",
    "sec.c3t": "Your data stays in your Sheet",
    "sec.c3d": "Listing data is kept only in your own Google Sheet, in your own Drive.",
    "sec.note": "Error reports carry no personal data and can be switched off in Settings.",
    "sec.link": "Privacy policy",

    "price.h2": "Simple pricing",
    "price.sub": "Every plan has every feature, with no listing limit.",
    "plan.day": "1 day",
    "plan.week": "1 week",
    "plan.month": "1 month",
    "plan.quarter": "3 months",
    "plan.was": "instead of ₾52.50",
    "plan.rec": "Recommended",
    "price.start": "Start free",
    "price.trial": "7 days free, no card. Cancel any time.",
    "price.fine": "Prices in GEL, VAT included. Payment is on Bank of Georgia's secure page — by card, Apple Pay or Google Pay.",

    "ag.chip": "One seat = one agent",
    "ag.h": "For agencies",
    "ag.body": "Seats for your agents: ₾15 per seat a month. One seat = one agent.",
    "ag.trial": "The first 7 days after your agency signs up are free for all your agents.",
    "ag.per": "per seat · month",
    "ag.soon": "Soon",
    "ag.soonBtn": "Coming soon",
    "ag.q": "Interested? Write to us:",

    "sup.pill": "Support",
    "sup.h1": "How can we help?",
    "sup.sub": "Write to us on WhatsApp or by email — or first check the most common cases below.",
    "sup.wa": "Message us on WhatsApp",
    "sup.mailT": "Email",
    "sup.mail": "Send us an email",
    "sup.sendT": "To sort it out fast, send us:",
    "sup.send1": "the link to the ad;",
    "sup.send2": "which site you were copying to — ss.ge or myhome.ge;",
    "sup.send3": "a screenshot, and what you pressed.",
    "sup.fixH": "Quick fixes",
    "sup.f1t": "The buttons don't show",
    "sup.f1d": "HomeGrab works on one specific ad's page — from search results or a list, open one ad first.",
    "sup.f2t": "Signing in to ss.ge and myhome.ge",
    "sup.f2d": "HomeGrab uses the session you're already signed into. If the session has expired, sign in again and retry. Without signing in to myhome.ge, MyHome shows only 5 phone numbers a day — the rest are saved masked in the sheet.",
    "sup.f3t": "Some fields didn't fill",
    "sup.f3d": "They are listed in a yellow panel: „ეს ველები ვერ შეივსო — დააჭირე და გადახვალ ველზე“ (click one to jump to it). Fill them by hand, then publish.",
    "sup.f4t": "Switching computers",
    "sup.f4d": "One HomeGrab account can't be used on two different computers at the same time. When you sign in to HomeGrab on a new computer, the active session on the old one ends automatically.",
    "sup.f5t": "Publishing is yours",
    "sup.f5d": "HomeGrab fills the form and stops. Check it, press publish — the ID is written to your sheet automatically.",
    "sup.f6t": "The page doesn't respond",
    "sup.f6d": "Reload the page with the browser's ↻ button (left of the address bar) and try again. If that doesn't help, write to us.",
    "sup.payH": "Subscription and payment",
    "sup.b1t": "7 days free",
    "sup.b1d": "New users get a 7-day free trial with no card — once per Google account.",
    "sup.b2t": "Cancelling",
    "sup.b2d": "You choose auto-renewal when you buy. Switch it off any time in the extension: Settings → Auto-renewal. HomeGrab keeps working until the end of the paid period, and nothing more is charged.",
    "sup.b3t": "Refunds",
    "sup.b3d": "A partly used period is not refunded. We refund in full if you were charged twice, charged after cancelling, or couldn't use the service because of our fault. Email homegrab.support@gmail.com within 48 hours of the charge.",
    "sup.b4t": "Payment",
    "sup.b4d": "Payment is on Bank of Georgia's secure page — by card, Apple Pay or Google Pay. We never see your card details.",
    "sup.terms": "Full subscription terms",
    "sup.reports": "Error reports carry no personal data; switch them off in Settings → „შეცდომების ანგარიშის გაგზავნა“ (Send error reports).",

    "foot.label": "Footer",
    "foot.support": "Support",
    "foot.privacy": "Privacy",
    "foot.terms": "Terms",
    "foot.sub": "Subscription terms",
    "foot.disc": "HomeGrab is an independent automation tool. It is not affiliated, associated, authorized, endorsed by, or in any way officially connected with SS.ge, MyHome.ge, or Google Sheets."
  };

  /* Page titles [ka, en], by <body data-page>. */
  var TITLES = {
    home: ["HomeGrab — განცხადების გადატანა ss.ge ⇄ myhome.ge ერთი დაჭერით",
           "HomeGrab — move ads between ss.ge and myhome.ge in one click"],
    support: ["მხარდაჭერა — HomeGrab", "Support — HomeGrab"],
    privacy: ["კონფიდენციალურობის პოლიტიკა — HomeGrab", "Privacy policy — HomeGrab"],
    terms: ["მოხმარების პირობები — HomeGrab", "Terms of use — HomeGrab"],
    subterms: ["გამოწერის პირობები — HomeGrab", "Subscription terms — HomeGrab"],
    notfound: ["გვერდი ვერ მოიძებნა — HomeGrab", "Page not found — HomeGrab"]
  };

  /* Keep the Georgian original so we can switch back without a reload. */
  var KA = {};
  var KA_ATTR = {};

  function eachAttrPair(el, fn) {
    el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
      var bits = pair.split("|");
      fn(bits[0].trim(), bits[1].trim());
    });
  }

  function capture() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!(k in KA)) KA[k] = el.innerHTML;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      eachAttrPair(el, function (attr, key) {
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
      eachAttrPair(el, function (attr, key) {
        if (adict[key] != null) el.setAttribute(attr, adict[key]);
      });
    });
    root.lang = lang;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    var titles = TITLES[document.body.getAttribute("data-page") || "home"] || TITLES.home;
    document.title = titles[lang === "en" ? 1 : 0];
  }

  /* --- Theme --------------------------------------------------------------- */
  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /* --- Reveal on scroll: once per element. The head script only sets .anim
     when motion is allowed, so without it nothing here is hidden. -------- */
  function initReveal() {
    if (!root.classList.contains("anim")) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add("in");
        io.unobserve(el);
        // Drop the reveal rules once played, so hover transitions are the element's own.
        setTimeout(function () { el.removeAttribute("data-reveal"); el.classList.remove("in"); }, 1600);
      });
    // Any visible pixel counts: a wide sheet row inside its own scroller never
    // shows a large share of its area, and a ratio threshold would leave it hidden.
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
  }

  /* --- Fill card: rows tick in, both bars run to 100%, then „ფორმა შევსებულია".
     The markup holds the finished state; it is rewound only when it will play. */
  function initFill() {
    var fill = document.getElementById("fill");
    if (!fill) return;
    var rows = fill.querySelectorAll(".fill-row");
    var pcts = fill.querySelectorAll(".pct");
    var timer = null;

    function setStep(step) {
      rows.forEach(function (r, i) { r.classList.toggle("on", step >= i + 1); });
      var pct = Math.round(Math.min(step, rows.length) / rows.length * 100) + "%";
      fill.style.setProperty("--pct", pct);
      pcts.forEach(function (p) { p.textContent = pct; });
      fill.classList.toggle("done", step > rows.length);
    }
    function play() {
      clearInterval(timer);
      if (reduced) { setStep(rows.length + 1); return; }
      var step = 0;
      setStep(0);
      timer = setInterval(function () {
        step += 1;
        setStep(step);
        if (step > rows.length) clearInterval(timer);
      }, 520);
    }

    document.getElementById("replay").addEventListener("click", play);
    if (reduced || !("IntersectionObserver" in window)) return;
    setStep(0);
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); play(); }
    }, { threshold: 0.4 });
    io.observe(fill);
  }

  /* --- Mobile menu --------------------------------------------------------- */
  function initMenu() {
    var btn = document.getElementById("menu-btn");
    var nav = document.getElementById("mnav");
    function set(open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    }
    btn.addEventListener("click", function () { set(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { set(false); btn.focus(); }
    });
  }

  /* --- Back link (subpages) ------------------------------------------------ */
  // Back to the page you came from when it was on this site; otherwise (a new
  // tab opened from the extension, a search result) the link's own href: home.
  function initBack() {
    document.querySelectorAll("[data-back]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var ref = "";
        try { ref = document.referrer ? new URL(document.referrer).origin : ""; } catch (err) {}
        if (ref === location.origin && history.length > 1) {
          e.preventDefault();
          history.back();
        }
      });
    });
  }

  /* --- Wiring -------------------------------------------------------------- */
  function init() {
    capture();
    if (root.lang === "en") apply("en");

    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        var lang = b.getAttribute("data-lang");
        apply(lang);
        store.set("hg-lang", lang);
      });
    });

    document.getElementById("theme-btn").addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      store.set("hg-theme", next);
    });

    initMenu();
    initReveal();
    initFill();
    initBack();

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
