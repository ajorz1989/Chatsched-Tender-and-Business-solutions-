# Terms & Privacy: notes for your attorney

I am not an attorney, and these are DRAFTS. They were written in plain language to match what the site does today
(tender and compliance help, independent partners, AI-assisted summaries, a free readiness check). A South African attorney
must review and approve them before you rely on them. Laws and regulator guidance change; the points below are the ones to check.

## Fill in or decide before publishing (shown on the live page as [brackets])
1. Terms, cancellations: session cancellation notice, drafted as [24 hours].
2. Privacy, retention: enquiries [12 months] and documents [90 days]. Match these to what you will really do.
3. Company name and registration number: set PLATFORM_COMPANY_REGISTRATION and PLATFORM_VAT_NUMBER in src/lib/constants.ts
   once the company is registered. Until then the Terms say "a business based in Cape Town" and "not currently registered for VAT".

## Points for the attorney to confirm
- Consumer Protection Act (68 of 2008): whether it applies to your customers (small businesses may or may not be protected),
  the cooling-off wording, and the liability cap and exclusions. A 2026 CPA amendment and opt-out regime exists; check it applies to you.
- ECTA (25 of 2002): required website and supplier information, and electronic-transaction cooling-off.
- Regulated-work wording: that "guidance, not advice" plus partner delivery keeps you clear of unauthorised practice
  (legal, tax practitioner, B-BBEE verification, auditing). Also whether referral fees or commissions need disclosure or professional-body approval.
- POPIA: Information Officer duties and registration with the Information Regulator, operator agreements, cross-border transfer
  (s72) basis, breach-notification wording, direct-marketing rules (s69), and the retention periods.
- Vendors: the Privacy Policy names categories only. Confirm the real list (database, hosting, WhatsApp, payments, analytics,
  automation, AI provider) and that each has a data-processing agreement.
- AI: that it is fine to send customer text to an AI provider, what is removed first, and the "person reviews paid summaries" promise (you must really do this).
- Jurisdiction and dispute wording, and the Trust Centre complaints and refund process, which must match these Terms.

## Not changed
Nothing else on the site was rewritten by this step. Nothing is pushed to GitHub.
