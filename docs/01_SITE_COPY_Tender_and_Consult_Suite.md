# ChatSched Tender & Consult Suite: Full Site Draft (v1)

Status: DRAFT for founder review. Nothing here is live.
Voice: warm, confident, local, simple. Schedy appears on happy or neutral moments only. Never on payments, disputes, refunds or complaints.
Rules used throughout: no guaranteed results, no invented numbers, no testimonials, no partner names until contracts exist. `[ASSUMPTION]` marks anything you must confirm. `[PRICE TBC]` marks prices to set with the CFO view.

Legal framing (applies to every page): ChatSched is a guide and facilitator. We are not a law firm, audit firm, tax practitioner or B-BBEE verification agency. Regulated work (tax, company law, financial statements, B-BBEE verification) is done by independent qualified partners. We never promise that a bid will be awarded.

---

## 1. SITE MAP

| # | Page | Route (new unless noted) | Purpose |
|---|------|--------------------------|---------|
| 1 | Home | `/` (existing) | Pitch the suite, push the readiness check |
| 2 | Tender Readiness Check | `/tender-readiness` | Main lead engine (free, chat-led intake) |
| 3 | Tenders & RFQs | `/tenders` | Find, understand and track opportunities |
| 4 | Bid Support | `/bid-support` | Guided and facilitated applications |
| 5 | Compliance Setup | `/compliance-setup` | Tax, CIPC, B-BBEE, financials via partners |
| 6 | Coaching & Consults | `/consult` | Book advisers and coaches |
| 7 | How it works | `/how-it-works` (existing, rewrite) | 4-step flow |
| 8 | Pricing | `/pricing` (existing, rewrite) | Fixed-price menu |
| 9 | FAQ | `/faq` (existing, rewrite) | Objection handling |
| 10 | For Partners | `/for-publishers` kept; add `/for-partners` | Recruit accountants, attorneys, B-BBEE and coaching partners |
| 11 | Trust Centre | `/trust` (existing, add section) | POPIA, complaints, refunds, honesty |
| 12 | Contact | `/contact` (existing, tweak list) | Same form, new topics |
| 13 | Terms / Privacy | existing | Add wording from section 12 below, attorney to review |

Note: `/compliance` already exists as the platform-compliance page, so the new page is `/compliance-setup`.

---

## 2. HOME (`/`)

**Eyebrow:** Tenders, RFQs and compliance, made simple

**H1:** Win more bids. Skip the paperwork stress.
(Test file `Home.layout.test.tsx` pins the old H1; update it. See the implementation guide.)

**Subtitle:** ChatSched helps South African small businesses find tenders and RFQs, get their compliance sorted, and submit clean applications, with real people to help when you need them.

**Primary CTA:** Check if you're tender-ready → `/tender-readiness`
**Secondary CTA:** Talk to a person → `/consult`
**Tertiary link:** Are you an accountant, attorney or adviser? Partner with us → `/for-partners`

### Section A: What we do (3 cards, same layout as WhatWeDoSection)
1. **Find** (eyebrow "1"): Tell us what you sell and where. We point you to tenders and RFQs that fit, in plain language.
2. **Get ready**: We check your papers, show you what's missing, and connect you to qualified partners to fix it.
3. **Apply**: We guide you through each submission, check it before you send it, and track every deadline.

### Section B: Why bids fail (a short, honest section)
**H2:** Most bids don't lose on price. They lose on paperwork.
Body: Missing tax compliance status. An unsigned page. An expired certificate. A form filled in the wrong place. These mistakes are avoidable, and a checklist catches them.
[ASSUMPTION] Do not add statistics until you have sourced and cited them. Our research found that technical disqualification is commonly cited by industry sources, but we have no single verified figure for South Africa.

### Section C: The four services (4 cards)
- Tenders & RFQs: find and track → `/tenders`
- Bid Support: guided applications → `/bid-support`
- Compliance Setup: tax, CIPC, B-BBEE, financials via partners → `/compliance-setup`
- Coaching & Consults: book a human → `/consult`

### Section D: How it works (4 steps)
Chat with us → Get your readiness picture → Pick what you want done → Track deadlines with reminders

### Section E: Honest promise (ink background)
**H2:** What we promise, and what we don't.
- We promise: clear steps, plain language, fixed prices shown upfront, and a real person on hand.
- We don't promise: that you will win. No one honestly can.
- Regulated work is done by qualified independent partners. We tell you who does what.

### Final CTA (green)
**H2:** Start with a free readiness check.
Body: Ten minutes in chat. You leave with a clear list of what to fix.
Buttons: Start the check → `/tender-readiness` | See pricing → `/pricing`

**SEO title:** ChatSched | Tenders, RFQs & Small Business Compliance Help (South Africa)
**SEO description:** Find tenders and RFQs, get your compliance sorted and submit clean applications. Practical help for South African small businesses.

---

## 3. TENDER READINESS CHECK (`/tender-readiness`)

**Eyebrow:** Free check
**H1:** Are you tender-ready?
**Subtitle:** Answer a few simple questions in chat. We show you what you have, what's missing and what to do first.

### How it works (3 bullets)
- Takes about 10 minutes. [ASSUMPTION: confirm after testing]
- No documents needed yet. Just tell us what you have.
- You get a simple checklist: green (done), yellow (needs attention), red (missing).

### Chat intake questions (script for the chat/bot and the form)
1. Business name and what you sell (one line).
2. Province and town you can serve.
3. Is the business registered with CIPC? (Yes / No / Not sure)
4. Does it have a tax number and tax compliance status with SARS? (Yes / No / Not sure)
5. Is it registered on the Central Supplier Database? (Yes / No / Not sure)
6. Do you have a B-BBEE affidavit or certificate? (Affidavit / Certificate / None / Not sure)
7. Do you have bank confirmation and a business address proof? (Yes / No)
8. Have you bid before? (Never / A few times / Often)
9. What do you want help with first? (Finding tenders / Getting compliant / Writing a bid / Talking to someone)
10. Best way to reach you (WhatsApp / Email), and consent to be contacted.

POPIA note: ask only these fields. No ID numbers, no bank details, no tax numbers at this stage. Show the consent line below.

**Consent line:** I agree that ChatSched may contact me about my readiness result. I can ask to stop at any time. See our Privacy Policy.

### Result screen copy (example, generated from answers)
- "You're close. 3 things to sort before your first bid." (never "You will win")
- Each item: plain label, why it matters, who can fix it, and a "Book help" button.

### Disclaimer under result
This is a guide, not legal, tax or accounting advice. Requirements differ by buyer and by tender, so always check the tender documents.

**SEO title:** Free Tender Readiness Check | ChatSched
**SEO description:** See in ten minutes what you need before bidding for South African tenders and RFQs. Free, simple and clear.

---

## 4. TENDERS & RFQs (`/tenders`)

**Eyebrow:** Find and track
**H1:** Tenders and RFQs, in plain language.
**Subtitle:** Stop reading 60-page documents to find out if it's for you. We summarise what matters and track the dates.

### What you get
1. **Matched opportunities.** Based on what you sell and where you can deliver.
2. **A plain-language summary.** What the buyer wants, what must be submitted, when it closes, and what could disqualify you. AI helps draft the summary and a person checks it before you rely on it. [ASSUMPTION: human review step to be confirmed operationally]
3. **A deadline calendar.** Closing dates, briefing sessions and submission reminders by WhatsApp or email.
4. **Go / no-go guidance.** A simple "is this worth your time?" view.

### Where the opportunities come from
Public tenders are published by government and state-owned entities, and many can be found free on the national eTender Publication Portal. We link back to the original source on every listing so you can check it yourself. Private-sector RFQs are posted by businesses on ChatSched's own Opportunities board.
(Verify the portal name and the current process before launch.)

### Free vs paid
- Free: browse listings, readiness check, calendar for up to [N] saved items [PRICE TBC].
- Paid: matching, AI-assisted summaries and WhatsApp reminders. See Pricing.

### Honest note
Information is provided as a convenience. The tender document is always the official source.

CTA: Check you're ready first → `/tender-readiness`

**SEO title:** Find South African Tenders and RFQs | ChatSched
**SEO description:** Matched tenders and RFQs, plain-language summaries and deadline reminders for South African small businesses.

---

## 5. BID SUPPORT (`/bid-support`)

**Eyebrow:** Apply with confidence
**H1:** Submit a clean bid.
**Subtitle:** We guide you through the forms, check your pack before you send it, and keep you on time.

### Three levels (pick what you need)
| Level | What it is | Who does the work | Price |
|-------|-----------|-------------------|-------|
| **Check my pack** | We review your finished bid against the tender's checklist and flag gaps | ChatSched | [PRICE TBC] |
| **Guide me** | Step-by-step help completing forms and assembling documents, with a coach on call | ChatSched | [PRICE TBC] |
| **Do it with me** | A bid writer helps draft technical and pricing responses | Partner bid writer | [PRICE TBC] |

### The pre-submission checklist (shown as a visual list)
- Required forms present and signed
- Tax compliance status valid on the closing date
- Company registration and directors' details match across documents
- Supplier database registration current
- B-BBEE proof valid and from an acceptable source
- Pricing schedule complete and totals correct
- Pack submitted before the deadline, in the stated manner

### Honest note
We improve the quality of your submission. We cannot guarantee that a bid will be shortlisted or awarded, and the decision always belongs to the buyer.

CTA: Book a bid check → `/consult`

---

## 6. COMPLIANCE SETUP (`/compliance-setup`)

**Eyebrow:** Get your papers in order
**H1:** The paperwork buyers ask for. Sorted.
**Subtitle:** We explain what you need and connect you to qualified partners to do the regulated work.

### Who does what (very important to show)
| Need | What ChatSched does | Who does the regulated work |
|------|--------------------|------------------------------|
| Company registration and updates (CIPC) | Explains the steps, collects the basics | Partner (company secretary or attorney) |
| Tax registration and compliance status (SARS) | Explains the steps, checks your status list | Partner (tax practitioner) |
| Supplier database registration | Guides you through it | You, with our guidance, or a partner |
| B-BBEE affidavit or certificate | Explains which one fits your size and why | Partner (commissioner of oaths or accredited verification agency, as required) |
| Annual financial statements / bookkeeping | Explains what buyers expect | Partner accountant |
| Contracts and legal reviews | Flags when you need one | Partner attorney |

### Important wording
- B-BBEE: Which option applies depends on your turnover and the buyer's requirements. We explain the options. A partner or the relevant accredited agency issues the document. [LEGAL REVIEW: confirm current thresholds and acceptable-proof rules before publishing any numbers.]
- Public procurement rules are changing. A new Public Procurement Act has been signed but our research found it is not yet in force, so existing rules still apply until commencement. Verify this before launch, as it may have changed.

### How booking works
1. Choose the service.
2. See the partner's fixed price and what's included.
3. Pay, and the partner is booked. [ASSUMPTION: payment flow to be decided; see the CFO notes in the guide]
4. Track progress in your dashboard.

CTA: Start with the readiness check → `/tender-readiness`

---

## 7. COACHING & CONSULTS (`/consult`)

**Eyebrow:** Talk to a person
**H1:** Real advice, booked in minutes.
**Subtitle:** Pick a topic, pick a time. Our scheduling does the rest.

### Session types
| Session | Length | For |
|---------|--------|-----|
| Tender strategy call | [N] min | "Which tenders should I chase?" |
| Bid check | [N] min | Pre-submission review |
| Compliance walkthrough | [N] min | "What do I still need?" |
| Business coaching | [N] min | Motivation, planning, getting unstuck |
| Small business consult | [N] min | Pricing, cash flow, growth, hiring |

All lengths and prices: [PRICE TBC]. Sessions are delivered by ChatSched advisers or vetted partners. The adviser's name and role are shown before you book.

### What to bring
Short notes on your business and, if you have one, the tender link.

### Honest note
Coaching and advice are general guidance. They are not legal, tax or financial advice unless a qualified professional says so in the session notes.

CTA: Pick a time → booking flow (uses the existing scheduling UI)

---

## 8. HOW IT WORKS (`/how-it-works`)

**H1:** Four steps. No jargon.
1. **Chat.** Tell us about your business in a short chat.
2. **See your picture.** We show what you have and what's missing.
3. **Choose your help.** Find tenders, fix compliance, check a bid, or talk to an adviser.
4. **Stay on time.** Deadlines and reminders in one calendar.

Below: a short "Who does what" strip repeating the ChatSched / partner split.

---

## 9. PRICING (`/pricing`)

**H1:** Fixed prices. Shown upfront.
**Subtitle:** No surprise invoices. Partner fees are shown before you pay.

| Plan | Includes | Price |
|------|---------|-------|
| **Free** | Readiness check, browse listings, basic calendar | R0 |
| **Starter** | Matching, plain-language summaries, WhatsApp reminders | [PRICE TBC] per month |
| **Bid check** | One pre-submission review | [PRICE TBC] once-off |
| **Consult** | One session | [PRICE TBC] per session |
| **Compliance setup** | Partner services at fixed fees | Priced per service |

CFO notes (internal, not for the page):
- Existing site constants include PREMIUM_ACCESS_PRICE 199, FEATURED_PLACEMENT_MONTHLY_PRICE 99 and PLATFORM_COMMISSION_RATE 12%. Decide whether these carry over to the new model or are retired.
- ChatSched's margin on partner services is a referral or service fee. An attorney must review how that fee is disclosed (see section 12).
- Entity is not yet registered and there is no VAT number. Register the company and check VAT registration with a CA(SA) or tax practitioner before taking payments.
- Existing displayed competitor prices from our research are directional only. Do not quote competitors' prices on the site.

---

## 10. FAQ (`/faq`)

**Is ChatSched a law firm or accounting firm?** No. We guide and organise. Regulated work is done by independent, qualified partners.

**Will you guarantee I win a tender?** No. Nobody honestly can. We help you submit a clean, complete bid.

**Where do tenders come from?** Public tenders are published by government and state entities, and we link to the original source. Private RFQs are posted on our Opportunities board.

**Is the readiness check really free?** Yes. [ASSUMPTION]

**Do I need documents for the check?** No. Just tell us what you have.

**Who sees my information?** Only what you share, and only for the service you asked for. See our Privacy Policy.

**What if a partner does poor work?** Tell us. See our complaints and refund process in the Trust Centre.

**Can I ask for a refund?** Yes, under the conditions in our Terms. [LEGAL REVIEW: refund and dispute wording]

**What do you charge for partner services?** The partner's price is shown before you pay, along with any ChatSched fee. [LEGAL REVIEW]

**Do you offer this in other languages?** English for now.

**I'm an accountant, attorney or adviser. Can I join?** Yes. See For Partners.

---

## 11. FOR PARTNERS (`/for-partners`)

**H1:** Reach small businesses that need you.
**Subtitle:** We send ready, informed clients to qualified professionals. You do the regulated work. You set your price.

### We're looking for
Tax practitioners, accountants, company secretaries, attorneys, B-BBEE verification agencies, bid writers, business coaches.

### What we check
Professional registration or membership (as applicable), insurance where relevant, references, and a short test engagement. [ASSUMPTION: define vetting standard with the Head of Legal view]

### How it works
1. Apply.
2. We verify.
3. You list fixed-price services.
4. We send you clients and handle scheduling.

Form: reuse the existing `partner_apply` form config with new role options.

---

## 12. LEGAL AND TRUST WORDING (for attorney review)

Do not publish without review by a qualified attorney. These are drafting notes, not final legal text.

1. **Role statement (Terms):** ChatSched provides information, scheduling and facilitation. ChatSched is not a law firm, accounting firm, tax practitioner, or B-BBEE verification agency. Partners are independent contractors and are responsible for their own professional work.
2. **No guarantee (Terms):** No outcome in any tender or procurement process is guaranteed.
3. **Information accuracy (Terms):** Tender listings and summaries are provided for convenience. The buyer's documents are the official source.
4. **Fees and referral disclosure (Terms and checkout):** Show any ChatSched fee or referral commission before payment. [LEGAL REVIEW: consumer protection and fee disclosure.]
5. **AI use (Privacy and FAQ):** AI is used to help summarise documents and suggest checklists. A person reviews paid summaries. [ASSUMPTION: confirm process.] Do not feed customers' personal information into AI tools without a lawful basis and a data-processing arrangement.
6. **POPIA (Privacy):** Collect the minimum. Purpose, consent and opt-out for each form. Retention period stated. Information Officer named. Operators (partners, hosting, AI vendors) listed by category. Cross-border transfer wording reviewed. [LEGAL REVIEW]
7. **Documents vault (if built later):** Treat as high-risk data: encryption, access logging, deletion on request, breach plan.
8. **Complaints and refunds (Trust Centre):** Written process: how to complain, response time, escalation, refund conditions. No mascot on these pages.
9. **Advertising claims:** No testimonials, win-rates or savings figures until real, documented and verifiable.
10. **Existing legacy:** The old advertising-marketplace terms need to be retired or kept in a separate section so users aren't confused.

---

## 13. NAV AND FOOTER COPY

**Header primary links:** Tenders | Bid Support | Compliance | Consult | Pricing
**Header CTA:** Free readiness check
**Footer columns:**
- Services: Tenders & RFQs, Bid Support, Compliance Setup, Coaching & Consults
- Company: About, For Partners, Contact
- Trust & Help: How it works, Pricing, FAQ, Trust Centre, Privacy, Terms
- Contact: existing WhatsApp, email and address constants

(Old marketplace links (Browse, For Publishers, Build my campaign) can move to a "More" or a legacy page until you decide whether to keep advertising as a side line.)

---

## 14. SCHEDY USAGE

- Okay: readiness check intro, empty states, "booked" success, 404.
- Not okay: pricing, checkout, partner disputes, refunds, complaints, legal pages.
