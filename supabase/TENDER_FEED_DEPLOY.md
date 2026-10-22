# Tender feed and reminders: deployment guide (nothing here is deployed)

Written from the official eTender OCDS API docs. Not tested against the live API or a live Supabase project.

## What exists
- `schema_phase117_tender_feed.sql`: tables tenders, tender_sync_state, tender_subscriptions, tender_reminders_sent, with RLS (tenders public read; everything else service role/admin only).
- Edge Functions: `tender-sync`, `tender-subscribe`, `tender-reminders-run`, `tender-unsubscribe`.
- Page `/tenders/feed`, gated by `TENDER_FEED_ENABLED` in `src/lib/constants.ts` (false).

## Order
1. Attorney review of Privacy (it must mention tender alerts, email and WhatsApp numbers, retention, unsubscribe).
2. Run the Phase 117 SQL on a Supabase branch or staging first.
3. `supabase secrets set CRON_SECRET=<long random>` (also RESEND_API_KEY, RESEND_FROM, SITE_URL already used).
4. `supabase functions deploy tender-sync tender-subscribe tender-reminders-run tender-unsubscribe`. Set `verify_jwt = false` for tender-subscribe and tender-unsubscribe (public) and for the two cron ones (they use the secret).
5. Call tender-sync once by hand with header `x-cron-secret`. Check the tenders table and `tender_sync_state.last_status`. Fix any field mapping against real data.
6. Schedule tender-sync (hourly) and tender-reminders-run (daily 07:00 SAST) with pg_cron + pg_net, same pattern as the existing cron jobs.
7. Test a subscription end to end with your own email. Confirm the unsubscribe link works.
8. Set `TENDER_FEED_ENABLED = true`, then update the Tenders page and FAQ wording ("Coming" becomes "Live"). Add /tenders/feed to the sitemap.

## WhatsApp reminders (keep OFF until ready)
Needs: Meta business verification fixed, the real number on Cloud API, an approved utility template with 3 body variables (tender title, days left, closing date), and secrets WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_REMINDER_TEMPLATE, then WHATSAPP_REMINDERS_ENABLED=true. Reminders go only to people who ticked the consent box.

## Known limits
- eTender coverage is incomplete (municipalities and SOEs only if they share). Say so, always link to the source.
- `source_url` is the portal home page; the OCDS release has no confirmed deep link. Check real data and improve.
- Parsing is defensive but unverified (duplicates, missing parties handled).
