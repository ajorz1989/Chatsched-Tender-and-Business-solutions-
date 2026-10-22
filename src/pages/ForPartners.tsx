import Seo from "../components/Seo";
import { TenderHero, TenderSection, CardGrid } from "../components/TenderBlocks";
import { MessageForm } from "../components/TenderForms";

const ROLES = [
  "Tax practitioner",
  "Accountant",
  "Company secretary",
  "Attorney",
  "B-BBEE verification agency",
  "Bid writer",
  "Business coach",
  "CIDB consultant",
  "OHS consultant",
  "Insurance broker",
  "Funder or finance provider",
  "HR consultant",
  "Designer",
  "Translator",
  "Creator or videographer",
];

export default function ForPartners() {
  return (
    <>
      <Seo
        title="Partner With ChatSched | Accountants, Attorneys and Advisers"
        description="Reach small businesses that need tax, legal, compliance and bid support. You do the regulated work and set your price."
      />
      <TenderHero
        eyebrow="For partners"
        title="Reach small businesses that need you."
        subtitle="We send ready, informed clients to qualified professionals. You do the regulated work and you set your price."
      />

      <TenderSection tone="white" eyebrow="How it works" title="Four steps.">
        <CardGrid
          cols={4}
          numbered
          items={[
            { title: "Apply", body: "Tell us who you are and what you offer." },
            { title: "We verify", body: "We check your professional registration or membership where it applies, and references." },
            { title: "List your services", body: "Fixed-price services you are happy to deliver." },
            { title: "Get clients", body: "We send you clients and handle the scheduling." },
          ]}
        />
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Apply" title="Tell us about your practice.">
        <div className="max-w-2xl">
          <MessageForm
            heading="Partner application"
            intro="We review every application personally and reply by email."
            topics={ROLES}
            topicLabel="Your role"
            messageLabel="About you and your services"
            placeholder="Your practice, registration or membership body, the services you'd offer and your areas of work."
            button="Apply to partner"
          />
        </div>
      </TenderSection>
    </>
  );
}
