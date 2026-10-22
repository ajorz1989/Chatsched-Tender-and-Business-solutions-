# Implementation Guide: dropping the Tender & Consult Suite into the existing site

Audience: you (founder) or a developer. Goal: new copy and pages, with ZERO design changes (same Tailwind tokens, fonts, buttons, cards, section rhythm).
Status: plan only. Nothing was pushed. I have read-only access to the repo.

Honest note: "no design changes" is achievable. "No code changes" is not. New routes, a lead table or form entry, and test updates are required.

---

## 1. Design rules to follow (so nothing looks new)

Reuse only what exists:
- Colours: `billboard-yellow`, `billboard-ink`, `billboard-inkSoft`, `billboard-paper`, `billboard-paperDim`, `billboard-green`, `billboard-greenDeep`, `billboard-red`.
- Fonts: Archivo Black (headings, through the h1-h3 defaults), IBM Plex Sans body, IBM Plex Mono labels.
- Section shell: `py-16 md:py-24`, inner `max-w-6xl mx-auto px-5`, divider `border-b-[3px] border-billboard-ink`.
- Cards: `border-2 border-billboard-ink rounded-xl p-6 shadow-blockSm`.
- Labels: `.eyebrow` (and `.eyebrow.light` on dark).
- Buttons: `Button` component or `.brand-button` variants.
- Backgrounds alternate: yellow, white, ink, paperDim, green.
- SEO: `Seo` component. Final CTA band: `PageCta` with `title` and `body` props.
- Legal pages: `LegalPageLayout`.
- Forms: copy the markup pattern from `Contact.tsx` (labels, inputs, `useHoneypot`, `submitPublicForm`).

Do not add: new colours, fonts, shadows, animations or icon sets. Use `MarketingIcon` names that already exist.

---

## 2. File-by-file change list

### A. Routes: `src/App.tsx`
Add lazy routes near `/for-businesses`, `/pricing`, `/faq`:
- `/tender-readiness` → `pages/TenderReadiness.tsx`
- `/tenders` → `pages/Tenders.tsx`
- `/bid-support` → `pages/BidSupport.tsx`
- `/compliance-setup` → `pages/ComplianceSetup.tsx` (not `/compliance`, which is taken)
- `/consult` → `pages/Consult.tsx`
- `/for-partners` → `pages/ForPartners.tsx`
Rewrite copy in the existing pages: `Pricing`, `Faq`, `HowItWorks`, and `TrustCentre` (add a complaints and refunds section).

### B. Home: `src/pages/Home.tsx` and `src/components/HomeHeroBands.tsx`, `HomeAgencySections.tsx`
- Keep the same component structure. Change only the strings. In the hero, use `agency.hero.title1` and `agency.hero.title2` with `defaultValue` set to the new H1 ("Win more bids." / "Skip the paperwork stress."), and retarget the CTAs to `/tender-readiness` and `/consult`.
- `WhatWeDoSection`: change the three cards to Find / Get ready / Apply.
- Replace Proof, Cross-branding, Inventory wall and Open opportunities sections with the sections in the site copy (Why bids fail, Four services, Honest promise). Easiest: add a new `HOME_LAYOUT = "tender"` value and a `HomeTender` composition built from the same section patterns, so the old layouts stay available as a rollback.
- Update the final green CTA.
- Translations: the pages use `t(key, { defaultValue })`. English can live in `defaultValue`. If you add keys to `en/*.json`, you must add the same keys to `af`, `xh` and `zu`, or `keyParity.test.ts` fails. Fastest safe path: use `defaultValue` only and don't add JSON keys yet. (Afrikaans, isiXhosa and isiZulu will show English until translated.)

### C. Navigation: `Header.tsx`, `Footer.tsx`, `BottomNav.tsx`
- Header: replace `PRIMARY_LINKS` and the Advertise dropdown (`ADVERTISE_LINKS`) entries per section 13 of the copy. Keep the markup and classes as is.
- Footer: relabel the columns, keep the existing structure.
- BottomNav: optional. Swap "Browse" to "Tenders" (`/tenders`). Keep icons.
- `Header.nav.test.tsx` asserts nav includes `/for-businesses` and excludes `/pricing`; update to the new links.

### D. Lead capture
Fastest path with no database change: reuse the existing `agency_lead` form config.
- `submitPublicForm("agency_lead", { business_name, contact_name, contact_email, contact_phone, notes, estimated_value, source })`.
- Put the readiness answers into `notes` as short structured text, and set `source: "tender-readiness"`.
- Follow with the `notify` Edge Function (same as `BuildMyCampaign.tsx`), adding a new kind such as `new_tender_lead` only if you want a different email. Otherwise reuse `new_agency_lead`.
- Later (phase 2): add a `FORM_CONFIGS` entry plus a migration for `tender_profiles` with row-level security. Keep the data minimal (no ID numbers, bank details or tax numbers).
- Keep `useHoneypot` and rate limits as they are.

### E. Chat and scheduling
- Chat intake: use the 10 questions in the copy file, in the existing WhatsApp bot flow (Edge Function creating `agency_leads` and handing over to a person). The bot tells people it is automated.
- Booking: reuse the existing scheduling UI for the Consult sessions. Define session types as data (name, length, price, adviser).
- Deadline tracking: phase 2. Start as a manual calendar the team maintains, plus WhatsApp reminders via the existing notify pipeline.

### F. SEO and sitemap
- Add each new public route to `STATIC_ROUTES` in `generate-sitemap.mjs`.
- Every page gets `Seo` with the title and description in the copy file.

### G. Tests to update
- `Home.layout.test.tsx` (H1 regex, section ids, title regex, video counts: hero videos may be removed).
- `Header.nav.test.tsx`.
- Add basic render tests for each new page.
- Run `npm run lint`, `npm test`, `npm run build`. Dependencies are not installed in my workspace; I have not run any of this.

---

## 3. Phasing (smallest reversible steps first)

| Phase | What | Owner | Due |
|-------|------|-------|-----|
| 0 | Founder approves scope and copy; register the company; attorney consult | Founder | [set date] |
| 1 | Copy-only launch: Home, `/tender-readiness`, `/consult`, Pricing, FAQ, Trust; readiness form into `agency_leads`; manual follow-up | Developer + Founder | [set date] |
| 2 | `/tenders` listings with source links; WhatsApp reminders; deadline calendar | Developer | after Phase 1 |
| 3 | Partner onboarding and fixed-price booking; payment flow (PayFast) | Founder + Developer + Legal | after attorney sign-off |
| 4 | Document vault, AI summaries with human review | Developer | later, after POPIA review |

AI use: summarising tenders and generating readiness checklists. A person reviews paid outputs. Nothing is auto-sent to customers without review in Phase 1.

---

## 4. Risks and what I'd stop doing

1. Regulated services: do not let ChatSched itself give tax, legal or B-BBEE-certificate services. Partners only. Attorney review needed.
2. Referral fees and fee disclosure: needs legal review.
3. POPIA: AI vendors and partners are operators. Documents and data minimisation matter.
4. Competitors already offer AI tender analysis (TenderFlow, Tender Aid, TenderFinder). Your edge is human help, plain language, a readiness score, fixed prices and a first-time-bidder focus. Test demand before building listings.
5. Stop: building new advertising-marketplace features, and anything that needs a custom design.
6. The repo contains bank details in `constants.ts`. I have not copied them anywhere. Consider moving them out of the public repo, since the repository is public.

---

## 5. Validation before building (cheap, 2 weeks)

- Run the Phase 1 copy-only version.
- Target: [N] readiness checks completed, [N] booked consults. [ASSUMPTION: set targets]
- If people book consults and ask for compliance help, build Phase 2 and 3. If not, change the offer before writing more code.

---

## 6. Open items needing you

1. Approve the Phase 1 scope.
2. Set prices (CFO view) and session lengths.
3. Book an attorney consult on partner structure, referral fees, Terms and Privacy.
4. Register the entity; check VAT with a CA(SA).
5. Decide whether to give me push access so I can open a pull request for review (I will never push to the live branch directly).
