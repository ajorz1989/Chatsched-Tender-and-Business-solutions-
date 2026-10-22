# How the other audit was handled

Source: "Tender Suite Audit: Gaps, Competitors and Roadmap" (21 October 2026). Still unbuilt and untested; nothing pushed.
Also good news from your Cloudflare build log (21 Oct, 11:46): the first version compiled and built in 3 seconds. Only the final upload to Cloudflare failed with a Cloudflare API error (code 10013), which looks temporary. Retry the deploy.

## The seven gaps
| # | Gap | Status |
|---|-----|--------|
| 1 | Promises with nothing behind them | FIXED in copy. /tenders now has an honest "live / on request / coming" table. No automated feed or WhatsApp reminders are claimed. |
| 2 | Pricing placeholders | FIXED. "Set before launch" replaced by "Quoted before you pay"; the Starter plan is marked "not available yet"; three packages added. Real prices still wait for your owner conversations. |
| 3 | Weak readiness check | PARTLY. Added a live score out of 100 and saved the score and answers as a structured line in the lead notes. NOT done: emailing the result, and separate database columns (needs a migration). |
| 4 | Consult and partner pages are forms | PARTLY. Consult form now captures tender link, closing date, budget band, urgency and format; free vs paid is explicit; partner roles extended. NOT built: booking, PayFast payment, partner profiles. |
| 5 | "Chat" step is a form | FIXED in wording ("Tell us"). A real chat flow is not built. |
| 6 | English only | NOT DONE. Needs proper translators for isiZulu, isiXhosa and Afrikaans; machine translation of legal and compliance wording would be risky. |
| 7 | Theme drift | ALREADY FIXED earlier (original yellow palette restored). |
| - | Procurement-law date stamp | DONE ("as at 21 October 2026", draft regulations of 16 April 2026). |

## Features, in the audit's order
1 Readiness score: done (see above). 2 Expiry tracker: done at /tools, dates only, stored in the visitor's browser, with calendar (.ics) and email-yourself reminders. 3 Free tools: done at /tools (deadline planner, 80/20 and 90/10 what-if, glossary). 4 Tender feed: NOT built (eTenders API unverified). 5 Clarification drafter: listed as a "coming soon" service, no tool. 6 Reminders: calendar and email now; WhatsApp not built. 7 SBD helper: checklist of the standard forms added to Bid Support (not an interactive tool). 8 Languages: not done. 9 Pipeline board, seats, win/loss: not built.

## Services
/services lists 58 services in 9 categories, each labelled "Request now", "Coming soon" or "On our waiting list", with who delivers it. Phase 1 = request now, 2 = coming soon, 3 = needs partner or legal sign-off. Three packages added (first bid, compliance maintenance, tender retainer).
Marketing: I included only supplier-facing items (supplier profile pack, Google Business profile, copy, translation, designers, and so on). I left out the advertising-marketplace rows (publisher marketplace, hyperlocal and creator campaigns, community radio, campaign reports, publisher tools, sports sponsorship) because you asked me to remove advertising. Tell me if you want any back.

## Please check
- Preference-points table and price formula (Preferential Procurement Regulations 2022) in /tools: confirm with a tender professional before launch.
- SBD form list: confirm against a real tender pack.
- "We aim to reply within one business day" on /consult: only keep it if you will.
- Consult budget bands are my own suggestions.
- Insurance, guarantee and funding rows need licensing checks before they move out of "waiting list", as the audit warns. The Terms and Privacy still need an attorney.
