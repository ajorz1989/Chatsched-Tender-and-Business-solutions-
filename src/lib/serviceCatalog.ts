/**
 * The ChatSched Tender & Consult service catalog.
 *
 * Phase 1 = request it now. Phase 2 = opens after our first paying clients.
 * Phase 3 = needs a partner or legal sign-off before we offer it.
 * "by" says who does the work. Anything regulated is done by an independent,
 * qualified partner, never by ChatSched itself. No prices appear here: every
 * paid service is quoted before the client pays.
 */

export type Phase = 1 | 2 | 3;

export interface CatalogItem {
  category: string;
  name: string;
  by: string;
  phase: Phase;
}

export const PHASE_LABEL: Record<Phase, string> = {
  1: "Request now",
  2: "Coming soon",
  3: "On our waiting list",
};

export const PHASE_NOTE: Record<Phase, string> = {
  1: "We can take this on today.",
  2: "Opens after our first paying clients. Join the waiting list.",
  3: "We need a qualified partner or legal sign-off first. Join the waiting list.",
};

const c = (category: string, name: string, by: string, phase: Phase): CatalogItem => ({ category, name, by, phase });

export const CATALOG: CatalogItem[] = [
  // Tender strategy
  c("Tender strategy", "Go or no-go review for a named tender", "ChatSched", 1),
  c("Tender strategy", "90-day tender pipeline plan", "ChatSched", 1),
  c("Tender strategy", "RFQ and quotation coaching, government and private", "ChatSched", 1),
  c("Tender strategy", "Buyer and award-history research", "ChatSched", 2),
  c("Tender strategy", "Clarification-question drafting before the cut-off", "ChatSched", 2),
  c("Tender strategy", "Private-sector RFQ board", "ChatSched", 2),
  c("Tender strategy", "Subcontracting and consortium matching", "ChatSched", 3),

  // Bid preparation
  c("Bid preparation", "Standard bid forms (SBD) check", "ChatSched", 1),
  c("Bid preparation", "Capability statement and company profile writing", "Partner bid writer", 1),
  c("Bid preparation", "Methodology and project plan writing", "Partner bid writer", 2),
  c("Bid preparation", "Pricing schedule and cost build-up review", "Partner accountant", 2),
  c("Bid preparation", "Preference-points scoring review (80/20 and 90/10)", "ChatSched", 2),
  c("Bid preparation", "Mock evaluation against the buyer's scoring", "Partner bid coach", 2),
  c("Bid preparation", "References and track-record pack", "ChatSched", 2),
  c("Bid preparation", "Submission-day support (sealed or e-submission)", "ChatSched", 2),
  c("Bid preparation", "Joint venture or consortium agreement", "Partner attorney", 3),

  // Compliance
  c("Compliance", "CIPC annual returns and beneficial ownership filing", "Partner company secretary", 1),
  c("Compliance", "UIF registration and compliance letter", "Partner tax practitioner or payroll provider", 2),
  c("Compliance", "COIDA registration and letter of good standing", "Partner", 2),
  c("Compliance", "Outstanding tax returns and payment-arrangement fix-up", "Partner tax practitioner", 2),
  c("Compliance", "Municipal rates and utility clearance guidance", "ChatSched", 2),
  c("Compliance", "CIDB registration and grade upgrade", "Partner CIDB consultant", 3),
  c("Compliance", "Sector registrations (for example PSIRA, NHBRC)", "Partner", 3),
  c("Compliance", "Occupational health and safety file", "Partner OHS consultant", 3),

  // Post-award
  c("After you win", "Contract review and negotiation", "Partner attorney", 2),
  c("After you win", "Delivery plan and milestone tracking", "ChatSched", 2),
  c("After you win", "Invoicing and payment follow-up setup", "ChatSched", 2),
  c("After you win", "Buyer progress reporting", "ChatSched", 3),
  c("After you win", "Subcontractor vetting and agreements", "Partner attorney", 3),
  c("After you win", "Performance guarantee and insurance introductions", "Licensed broker", 3),

  // Funding
  c("Funding", "Working-capital readiness check for a tender", "ChatSched", 2),
  c("Funding", "Tender cash-flow forecast", "Partner accountant", 2),
  c("Funding", "Supplier-development funding listings", "ChatSched", 3),
  c("Funding", "Purchase-order and invoice-finance introductions", "Licensed funder", 3),

  // Post-bid
  c("After a bid", "Post-bid debrief request and feedback review", "ChatSched", 2),
  c("After a bid", "Bid-loss review", "Partner bid coach", 2),
  c("After a bid", "Objection, appeal and information-request support", "Partner attorney", 3),
  c("After a bid", "Restriction or debarment check and response", "Partner attorney", 3),

  // Small-business consulting
  c("Small-business consulting", "Pricing and margin review", "Partner accountant or coach", 2),
  c("Small-business consulting", "Business and growth plan", "ChatSched adviser", 2),
  c("Small-business consulting", "Bookkeeping setup and software onboarding", "Partner accountant", 2),
  c("Small-business consulting", "Hiring and employment contracts", "Partner attorney or HR consultant", 3),

  // Marketing for suppliers
  c("Marketing for suppliers", "Supplier profile pack: capability statement, one-page company profile, references page", "ChatSched or partner designer", 1),
  c("Marketing for suppliers", "Google Business profile and basic online-presence setup", "ChatSched", 1),
  c("Marketing for suppliers", "Ad copy and caption writing (AI draft checked by a person)", "ChatSched", 1),
  c("Marketing for suppliers", "WhatsApp broadcast and Channels copy", "ChatSched", 1),
  c("Marketing for suppliers", "B2B directory and supplier-database listing help", "ChatSched", 2),
  c("Marketing for suppliers", "Case-study and reference collection from past clients", "ChatSched", 2),
  c("Marketing for suppliers", "Posters, flyers and social graphics", "Partner designer", 2),
  c("Marketing for suppliers", "Short video and reels", "Partner creator", 2),
  c("Marketing for suppliers", "Translation into isiZulu, isiXhosa and Afrikaans", "Partner translator", 2),
  c("Marketing for suppliers", "Click-to-WhatsApp and lead-capture landing pages", "ChatSched", 2),
  c("Marketing for suppliers", "Local SEO and review-collection setup", "Partner", 3),
  c("Marketing for suppliers", "Email and SMS to your existing contacts (opt-in only)", "Partner provider", 3),

  // Training
  c("Training", "First-time bidder workshop (group)", "ChatSched", 1),
  c("Training", "Monthly bid-coach office hours", "ChatSched", 2),
  c("Training", "Tender bootcamp for chambers and SME clusters", "ChatSched", 2),
  c("Training", "Corporate and municipal supplier-development cohorts", "ChatSched", 3),
];

export const CATEGORIES = Array.from(new Set(CATALOG.map((i) => i.category)));

export interface Bundle {
  title: string;
  body: string;
  includes: string[];
}

export const BUNDLES: Bundle[] = [
  {
    title: "First bid package",
    body: "For a business bidding for the first time.",
    includes: ["Readiness check", "Compliance fix-up through partners", "Bid check", "Submission-day support"],
  },
  {
    title: "Compliance maintenance",
    body: "Stay valid so you never miss a tender on a technicality.",
    includes: ["Expiry date tracker", "Annual renewals done by partners", "Reminders before each date"],
  },
  {
    title: "Tender retainer",
    body: "A steady monthly rhythm for businesses that bid often.",
    includes: ["Monthly pipeline plan", "Go or no-go reviews", "A bid check before each submission"],
  },
];

/** Consult session types shown on /consult and used as form options. */
export const SESSION_TYPES = [
  "Free intro call",
  "Tender strategy call",
  "Bid check",
  "Compliance walkthrough",
  "Business coaching",
  "Pricing and margin review",
  "Cash flow and funding",
  "Hiring and employment",
  "Growth plan",
];
