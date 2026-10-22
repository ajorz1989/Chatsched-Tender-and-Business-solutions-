# ChatSched: Tender & Consult Suite

Helps South African small businesses find tenders and RFQs, get their compliance papers in order, and prepare clean bids. Regulated work (tax, company registration, B-BBEE, legal, financial statements) is done by independent qualified partners.

## Stack
Vite + React 19 + TypeScript + React Router + Tailwind CSS, backed by Supabase (Postgres, Auth, Edge Functions). Payments via PayFast, email via Resend.

## Run
```
npm install
npm run lint && npm test && npm run build
npm run dev
```

## Documents (docs/)
- `01_SITE_COPY_Tender_and_Consult_Suite.md`: site copy
- `02_IMPLEMENTATION_GUIDE_No_Design_Changes.md`: implementation guide
- `BUILD_NOTES.md`: what was built and what is still open
- `AUDIT_RESPONSE.md`: how the audit gaps were handled
- `LEGAL_REVIEW_NOTES.md`: Terms and Privacy drafts for attorney review
- `supabase/DEPLOY.md` and `supabase/TENDER_FEED_DEPLOY.md`: deployment guides

Terms and Privacy are drafts and must be reviewed by a South African attorney before launch. The tender feed is built but switched off (`TENDER_FEED_ENABLED` in `src/lib/constants.ts`).
