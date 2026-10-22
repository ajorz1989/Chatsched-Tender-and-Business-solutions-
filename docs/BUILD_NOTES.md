# ChatSched Tender & Consult site: read me first (v2)

STATUS: UNBUILT AND UNTESTED. My workspace could not download npm packages, so I could not run
`npm install`, `npm run build`, `npm test` or `npm run lint`. I only did a syntax check and a check that
no file imports something I deleted. Nothing has been pushed to GitHub (local branch `tender-suite-49ers`).

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
