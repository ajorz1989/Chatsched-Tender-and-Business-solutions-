import Seo from "../components/Seo";
import { TenderHero, TenderSection, CardGrid, TenderCta } from "../components/TenderBlocks";

export default function TenderAbout() {
  return (
    <>
      <Seo
        title="About ChatSched | Tender and Compliance Help for Small Businesses"
        description="ChatSched is a Cape Town company that helps South African small businesses with tenders, RFQs and compliance."
      />
      <TenderHero
        eyebrow="About us"
        title="We make tenders and paperwork simpler."
        subtitle="ChatSched is based in Cape Town. We help South African small businesses find tenders and RFQs, get their compliance in order and submit clean applications."
      />
      <TenderSection tone="white" eyebrow="How we work" title="Plain language. Real people. Honest promises.">
        <CardGrid
          items={[
            { title: "Plain language", body: "We explain what buyers ask for without the jargon." },
            { title: "Real people", body: "A person is always on hand, by WhatsApp, email or a booked session." },
            { title: "Honest promises", body: "We never guarantee a win. Regulated work is done by qualified independent partners." },
          ]}
        />
      </TenderSection>
      <TenderCta title="Talk to us." body="Start with a free readiness check or book a session." to="/tender-readiness" label="Start the check" secondaryTo="/contact" secondaryLabel="Contact us" />
    </>
  );
}
