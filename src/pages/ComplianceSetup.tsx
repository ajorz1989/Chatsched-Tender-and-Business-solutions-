import Seo from "../components/Seo";
import { TenderHero, TenderSection, DataTable, CardGrid, HonestNote, TenderCta, CtaLink } from "../components/TenderBlocks";

export default function ComplianceSetup() {
  return (
    <>
      <Seo
        title="Small Business Compliance Setup | ChatSched"
        description="We explain what buyers ask for and connect you to qualified partners for tax, company registration, B-BBEE and financial statements."
      />
      <TenderHero
        eyebrow="Get your papers in order"
        title="The paperwork buyers ask for. Sorted."
        subtitle="We explain what you need and connect you to qualified partners to do the regulated work."
      >
        <CtaLink to="/tender-readiness" variant="dark">Start with the readiness check →</CtaLink>
      </TenderHero>

      <TenderSection tone="white" eyebrow="Who does what" title="We guide. Qualified partners do the regulated work.">
        <DataTable
          head={["You need", "What ChatSched does", "Who does the regulated work"]}
          rows={[
            ["Company registration and updates (CIPC)", "Explains the steps and collects the basics.", "Partner company secretary or attorney"],
            ["Tax registration and compliance status (SARS)", "Explains the steps and checks your status list.", "Partner tax practitioner"],
            ["Supplier database registration", "Guides you through it.", "You, with our guidance, or a partner"],
            ["B-BBEE affidavit or certificate", "Explains which option fits your size and why.", "Partner commissioner of oaths or an accredited verification agency, as required"],
            ["Annual financial statements and bookkeeping", "Explains what buyers expect.", "Partner accountant"],
            ["Contracts and legal reviews", "Flags when you need one.", "Partner attorney"],
          ]}
        />
        <HonestNote>
          ChatSched is not a law firm, audit firm, tax practitioner or B-BBEE verification agency. Partners are independent and are responsible for their own professional work.
        </HonestNote>
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Good to know" title="Rules change. We keep you current.">
        <CardGrid
          cols={2}
          items={[
            { title: "B-BBEE", body: "Which proof applies depends on your turnover and the buyer's requirements. We explain the options. A partner or the relevant accredited agency issues the document." },
            { title: "Public procurement rules (as at 21 October 2026)", body: "The Public Procurement Act has been signed but is not yet in operation, and draft regulations were only published on 16 April 2026. Until it commences, the existing rules, including the 80/20 and 90/10 preference points, still apply. Rules can change, so we tell you what applies when you bid." },
          ]}
        />
      </TenderSection>

      <TenderSection tone="white" eyebrow="More compliance help" title="Beyond the basics.">
        <p className="max-w-prose text-billboard-inkSoft mb-4">
          Many bids also need CIPC annual returns, UIF and COIDA letters, a CIDB grade, sector registrations or a health and safety file. These are done by qualified partners. See the status of each on our{" "}
          <a href="/services" className="underline font-semibold">services list</a>.
        </p>
      </TenderSection>

      <TenderSection tone="dim" eyebrow="How booking works" title="Four clear steps.">
        <CardGrid
          cols={4}
          numbered
          items={[
            { title: "Choose the service", body: "Tell us what you need." },
            { title: "See the price", body: "The partner's fixed price and what's included are quoted before you pay." },
            { title: "Get booked", body: "We introduce you to the partner and help you agree a time." },
            { title: "Follow up", body: "We check in with you and the partner until the work is done." },
          ]}
        />
      </TenderSection>

      <TenderCta title="Not sure what's missing?" body="The free readiness check tells you in about ten minutes." to="/tender-readiness" label="Start the check" secondaryTo="/consult" secondaryLabel="Talk to a person" />
    </>
  );
}
