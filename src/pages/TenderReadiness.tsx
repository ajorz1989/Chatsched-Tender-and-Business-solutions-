import Seo from "../components/Seo";
import { TenderHero, TenderSection, CardGrid } from "../components/TenderBlocks";
import { ReadinessForm } from "../components/TenderForms";

export default function TenderReadiness() {
  return (
    <>
      <Seo
        title="Free Tender Readiness Check | ChatSched"
        description="See in ten minutes what you need before bidding for South African tenders and RFQs. Free, simple and clear."
      />
      <TenderHero
        eyebrow="Free check"
        title="Are you tender-ready?"
        subtitle="Answer a few simple questions. We show you what you have, what's missing and what to do first."
      />
      <TenderSection tone="dim">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl mb-4">How it works</h2>
            <div className="mb-6">
              <CardGrid
                cols={2}
                items={[
                  { title: "About ten minutes", body: "Six quick questions and your contact details." },
                  { title: "No documents yet", body: "Just tell us what you have. We never ask for ID, bank or tax numbers." },
                  { title: "A simple checklist", body: "Done, needs attention or missing, with who can fix each one." },
                  { title: "A person follows up", body: "Someone from ChatSched contacts you about your result." },
                ]}
              />
            </div>
            <p className="text-sm text-billboard-inkSoft max-w-prose">
              This is a guide, not legal, tax or accounting advice. Requirements differ by buyer and by tender, so always check the tender documents.
            </p>
          </div>
          <ReadinessForm />
        </div>
      </TenderSection>
    </>
  );
}
