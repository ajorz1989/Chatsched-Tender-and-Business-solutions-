import Seo from "../components/Seo";
import { TenderHero, TenderSection, CardGrid, CheckList, DataTable, HonestNote, TenderCta, CtaLink } from "../components/TenderBlocks";

export default function BidSupport() {
  return (
    <>
      <Seo
        title="Bid Support for South African Tenders | ChatSched"
        description="Guided help completing forms, a pre-submission check and bid-writing support for small businesses."
      />
      <TenderHero
        eyebrow="Apply with confidence"
        title="Submit a clean bid."
        subtitle="We guide you through the forms, check your pack before you send it, and keep you on time."
      >
        <CtaLink to="/consult" variant="dark">Book a bid check →</CtaLink>
      </TenderHero>

      <TenderSection tone="white" eyebrow="Three levels" title="Pick what you need.">
        <DataTable
          head={["Level", "What it is", "Who does the work", "Price"]}
          rows={[
            ["Check my pack", "We review your finished bid against the tender's checklist and flag gaps.", "ChatSched", "Quoted before you pay"],
            ["Guide me", "Step-by-step help completing forms and assembling documents, with a coach on call.", "ChatSched", "Quoted before you pay"],
            ["Do it with me", "A bid writer helps draft technical and pricing responses.", "Independent partner bid writer", "Partner's fixed price, quoted before you pay"],
          ]}
        />
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Before you send" title="The pre-submission checklist.">
        <CheckList
          items={[
            "Required forms present and signed",
            "Tax compliance status valid on the closing date",
            "Company registration and directors' details match across documents",
            "Supplier database registration current",
            "B-BBEE proof valid and from an acceptable source",
            "Pricing schedule complete and totals correct",
            "Pack submitted before the deadline, in the stated manner",
          ]}
        />
        <HonestNote>
          We improve the quality of your submission. We cannot guarantee that a bid will be shortlisted or awarded. The decision always belongs to the buyer.
        </HonestNote>
      </TenderSection>

      <TenderSection tone="white" eyebrow="Standard bid forms" title="The forms that trip people up.">
        <p className="max-w-prose text-billboard-inkSoft mb-4">
          Many government bids use standard bidding document (SBD) forms. Which forms apply and what they look like depends on the buyer, so always follow your tender pack. These are the ones we most often check:
        </p>
        <CheckList
          items={[
            "SBD 1: invitation to bid, with your details and signature",
            "SBD 3.1 / 3.2 / 3.3: pricing schedules, completed in full",
            "SBD 4: declaration of interest",
            "SBD 6.1: claim for preference points",
            "SBD 8: declaration of past supply chain practices",
            "SBD 9: certificate of independent bid determination",
          ]}
        />
        <HonestNote>Form names and numbers can change. Confirm them against the forms in your tender pack.</HonestNote>
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Why it matters" title="Most bids don't lose on price. They lose on paperwork.">
        <CardGrid
          items={[
            { title: "Missing documents", body: "A required certificate or letter is left out of the pack." },
            { title: "Expired or invalid status", body: "Tax compliance or registrations are not valid on the closing date." },
            { title: "Forms not completed properly", body: "An unsigned page or a section filled in the wrong place." },
          ]}
        />
      </TenderSection>

      <TenderCta title="Want a second pair of eyes?" body="Book a bid check before you submit." to="/consult" label="Book a bid check" secondaryTo="/tender-readiness" secondaryLabel="Free readiness check" />
    </>
  );
}
