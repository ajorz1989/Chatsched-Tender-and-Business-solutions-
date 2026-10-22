# ChatSched Tender & Consult site: read me first (v2)

STATUS (22 Oct 2026): type check, production build and source lint pass; unit tests pass (see the homepage
revamp section below). Playwright end-to-end tests have NOT been run and the homepage has not been checked on
screen at 360, 768 and 1280 px. Nothing here has been reviewed by an attorney. This branch is on GitHub `main`.
`npm install` needs `--legacy-peer-deps` (the default resolver hits an npm bug) and the repo has no lockfile.

## Changes in this version
1. Colours are back to your ORIGINAL yellow, ink and paper palette. No scarlet or 49ers colours remain.
2. All advertising pages and sections are removed: browse, publishers, channels, campaigns, opportunities,
   tools, blog, community, fees, case studies, dashboards, messages, payments, careers, accessibility, partners
   directory, and the old pricing, FAQ and how-it-works. 190 source files and 24 related tests were deleted.
   Removed routes now show the 404 page; /register redirects to the readiness check.
3. What remains: Home, Tender Readiness, Tenders, Bid Support, Compliance Setup, Consult, For Partners,
   Pricing, How it works, FAQ, Trust Centre (new, with complaints and refunds outline), About (new), Contact
   (copy updated), Privacy, Terms, Login and password pages, Account, and the Admin back office.
4. Header, footer, bottom nav, sitemap and page titles show only the tender and consult suite.

## You must still do
1. `npm install && npm run lint && npm test && npm run build`, then fix whatever fails.
   Also delete or update e2e tests in /e2e that point at removed pages (one was already removed).
2. Terms and Privacy are rewritten as drafts: see LEGAL_REVIEW_NOTES.md. Attorney review is still required.
   before launch (see section 12 of the site copy file).
3. Admin back office: the menu now shows only Leads, Clients, Messages, Partners, Audit Log, Security and Message Safety, and it opens on Leads. The advertising tabs (campaigns, payouts, publishers, disputes and so on) are hidden from the menu but their code is still inside src/pages/Admin.tsx, because that 2,650-line file is too risky to cut without a working build. Remove it later with a developer.
4. Set real prices in src/pages/TenderPricing.tsx ("Set before launch").
5. Images and videos: the homepage and proof videos, blog images, visual-identity mood images and team sprite were deleted (nothing uses them now), and og-image.png was regenerated with the new tagline. Kept: logos, favicon and the Schedy mascot art (used on the 404 page and loaders). The logo is still the billboard icon from your brand kit.
6. Register the company before taking money.

## Added in v3 (from the other audit)
New pages /services and /tools, a readiness score, a richer consult form, honest status wording, packages and extra partner roles. See AUDIT_RESPONSE.md. Still unbuilt and untested.

## Tender feed and reminders (code only, not deployed)
See supabase/TENDER_FEED_DEPLOY.md in the zip. Migration schema_phase117_tender_feed.sql; functions tender-sync, tender-subscribe, tender-reminders-run, tender-unsubscribe; page /tenders/feed gated by TENDER_FEED_ENABLED=false. Untested against the live eTender API. WhatsApp sending is off until Meta verification and an approved template exist.

## Homepage revamp (22 Oct 2026)
Done: headline no longer promises wins; homepage copy matches the live / on request / coming status on /tenders;
structured data in index.html describes the tender business; focus rings visible on yellow, ink and green sections;
one primary and one secondary hero button (partners is a text link); example readiness card; "Why bids fail" as a
checklist; status labels on services; packages as tick lists; section order changed (promise and who-does-what moved up);
semantic lists (ul for cards, ol only for steps); Services menu markup and outside-click close; mobile bottom bar for
logged-out visitors is Home / Tenders / Free check / WhatsApp; footer: fake newsletter strip removed, "not a law firm"
line added, "Live across South Africa" removed; page title shortened; admin bundle kept out of the PWA precache;
`npm run lint` no longer scans dist/; stale advertising `home` translations excluded from the parity test.

Still to do (not done in this pass):
1. Attorney review of the homepage claims and the footer disclaimer wording. Both are drafts.
2. Confirm partners are actually signed up before keeping "qualified independent partners" and Compliance Setup wording.
3. Visual check on real devices and the Playwright run.
4. A properly designed social preview image (og-image.png is still a generated placeholder).
5. Lazy-load Supabase so the homepage does not download it up front (about 55 kB gzipped).
6. Delete the unused advertising code and the `home` translation files with a developer; add a lockfile.
7. Translations of any new strings into isiZulu, isiXhosa and Afrikaans need a human translator.
8. The Points what-if formula and preference-points table still need confirming with a tender professional.
