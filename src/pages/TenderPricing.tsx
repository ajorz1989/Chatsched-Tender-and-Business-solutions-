import Seo from "../components/Seo";
import { TenderHero, TenderSection, DataTable, HonestNote, TenderCta } from "../components/TenderBlocks";

/**
 * Prices are intentionally not set in code. Replace "Set before launch" with
 * real amounts (use formatCurrency from src/lib/currency) once decided.
 */
export default function TenderPricing() {
  return (
    <>
      <Seo
        title="Pricing | ChatSched Tender & Consult Suite"
        description="Fixed prices, quoted before you pay. Partner fees and ChatSched fees are shown before you agree."
      />
      <TenderHero
        eyebrow="Pricing"
        title="Fixed prices. Quoted before you pay."
        subtitle="No surprise invoices. You agree to a fixed price, including any partner fee and any ChatSched fee, before you pay."
      />
      <TenderSection tone="white">
        <DataTable
          head={["Plan", "Includes", "Price"]}
          rows={[
            ["Free", "Readiness check and score, free tools, short intro call", "R0"],
            ["Starter (coming)", "Tender matching, plain-language summaries and reminders once our tender feed is live", "Not available yet"],
            ["Bid check", "One pre-submission review", "Quoted before you pay"],
            ["Consult", "One coaching or advice session", "Quoted before you pay"],
            ["Compliance setup", "Partner services at fixed fees", "Priced per service"],
            ["First bid package", "Readiness check, compliance fix-up, bid check and submission-day support", "Quoted before you pay"],
            ["Compliance maintenance", "Expiry tracker plus annual renewals done by partners", "Quoted before you pay"],
            ["Tender retainer", "Monthly pipeline plan, go or no-go reviews and a bid check before each submission", "Quoted before you pay"],
          ]}
        />
        <HonestNote>
          We are still testing what these services are worth with real businesses, so we quote each one before you pay rather than publishing a price list. Partners are independent and set their own prices. We show the partner's price, and any ChatSched fee, before you pay.
        </HonestNote>
      </TenderSection>
      <TenderCta title="See where you stand first." body="The readiness check is free." to="/tender-readiness" label="Start the check" secondaryTo="/consult" secondaryLabel="Request a session" />
    </>
  );
}
