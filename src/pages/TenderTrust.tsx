import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { TenderHero, TenderSection, CardGrid } from "../components/TenderBlocks";
import { LEGAL_EMAIL, CONTACT_EMAIL } from "../lib/constants";

/**
 * Trust Centre. The complaints and refund process below is a plain-language
 * outline and MUST be confirmed with an attorney and the founder before launch.
 */
export default function TenderTrust() {
  return (
    <>
      <Seo
        title="Trust Centre | ChatSched"
        description="How ChatSched handles your information, complaints and refunds, and what we do and don't promise."
      />
      <TenderHero
        eyebrow="Trust Centre"
        title="How we keep your trust."
        subtitle="What we promise, how we protect your information, and what happens if something goes wrong."
      />
      <TenderSection tone="white" eyebrow="Our promises" title="Honest by design.">
        <CardGrid
          items={[
            { title: "No guaranteed wins", body: "We help you submit a clean, complete bid. The buyer decides who wins." },
            { title: "Who does what", body: "Regulated work such as tax, company law, financial statements and B-BBEE is done by qualified independent partners, and we tell you who." },
            { title: "Prices before you pay", body: "You agree to a fixed price, including any partner fee and any ChatSched fee, before you pay." },
          ]}
        />
      </TenderSection>
      <TenderSection tone="dim" eyebrow="Your information" title="We ask for the minimum.">
        <p className="max-w-prose text-billboard-inkSoft mb-4">
          The readiness check never asks for ID, bank or tax numbers. We use what you share only for the service you asked for. Read our{" "}
          <Link to="/privacy" className="underline font-semibold">Privacy Policy</Link> and{" "}
          <Link to="/terms" className="underline font-semibold">Terms</Link>.
        </p>
        <p className="max-w-prose text-billboard-inkSoft">
          AI helps draft summaries and checklists. A person reviews paid summaries before you rely on them.
        </p>
      </TenderSection>
      <TenderSection tone="white" eyebrow="If something goes wrong" title="Complaints and refunds.">
        <CardGrid
          cols={2}
          numbered
          items={[
            { title: "Tell us", body: `Email ${CONTACT_EMAIL} or message us on WhatsApp. Say what happened and what you'd like us to do.` },
            { title: "We look into it", body: "A person reviews your complaint, including speaking to any partner involved, and replies in writing." },
            { title: "We put it right", body: "Where we or a partner did not deliver what was agreed, we offer a fix or a refund under our Terms." },
            { title: "Still not happy?", body: `Write to ${LEGAL_EMAIL} and we will escalate it.` },
          ]}
        />
      </TenderSection>
    </>
  );
}
