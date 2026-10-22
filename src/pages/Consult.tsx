import { useSearchParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import { TenderHero, TenderSection, DataTable, CardGrid, HonestNote } from "../components/TenderBlocks";
import { MessageForm } from "../components/TenderForms";
import { BUNDLES, SESSION_TYPES } from "../lib/serviceCatalog";

const TOPICS = [...SESSION_TYPES, "A service from the full list (say which one below)"];

export default function Consult() {
  const [params] = useSearchParams();
  const service = params.get("service")?.slice(0, 200) ?? "";

  return (
    <>
      <Seo
        title="Tender Coaching and Business Consults | ChatSched"
        description="Book a free intro call, a tender strategy call, bid check, compliance walkthrough or business coaching session with a person."
      />
      <TenderHero
        eyebrow="Talk to a person"
        title="Real advice, booked in minutes."
        subtitle="Pick a topic and tell us when suits you. A person confirms your time, who will deliver it, and a fixed price before you pay."
      />

      <TenderSection tone="white" eyebrow="Free and paid" title="Start free. Pay only when you choose to.">
        <CardGrid
          cols={2}
          items={[
            { tag: "Free", title: "Readiness check and a short intro call", body: "See where you stand, and have a short call with a person to decide what would help. No obligation." },
            { tag: "Paid", title: "Everything else", body: "Sessions, bid checks and partner work are quoted at a fixed price, and you agree to it before you pay. Nothing is charged until you say yes." },
          ]}
        />
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Session types" title="Pick the help you need.">
        <DataTable
          head={["Session", "For"]}
          rows={[
            ["Free intro call", "Not sure what you need? Talk it through first."],
            ["Tender strategy call", "Which tenders and RFQs should I chase?"],
            ["Bid check", "A pre-submission review of your pack."],
            ["Compliance walkthrough", "What do I still need, and who can do it?"],
            ["Business coaching", "Motivation, planning and getting unstuck."],
            ["Pricing and margin review", "Is my price right for this bid?"],
            ["Cash flow and funding", "Can I afford to deliver if I win?"],
            ["Hiring and employment", "Taking on staff the right way."],
            ["Growth plan", "Where should the business go next?"],
          ]}
        />
        <p className="mt-4 text-sm text-billboard-inkSoft max-w-prose">
          Session length and the fixed price are confirmed to you before you pay. See the <Link to="/services" className="underline font-semibold">full list of services</Link> for more.
        </p>
        <HonestNote>
          A person confirms who will deliver your session before you pay: a ChatSched adviser or a vetted independent partner. Coaching and advice are general guidance, not legal, tax or financial advice unless a qualified professional says so in writing.
        </HonestNote>
      </TenderSection>

      <TenderSection tone="white" eyebrow="Packages" title="Or buy a package.">
        <CardGrid items={BUNDLES.map((b) => ({ title: b.title, body: `${b.body} Includes: ${b.includes.join(", ")}.` }))} />
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Book" title="Tell us what you need.">
        <div className="max-w-2xl">
          <MessageForm
            key={service}
            heading="Consult request"
            intro="We aim to reply within one business day with available times and a fixed price. Nothing is charged until you agree."
            topics={TOPICS}
            topicLabel="Session type"
            initialTopic={service ? TOPICS[TOPICS.length - 1] : undefined}
            initialMessage={service ? `I'd like help with: ${service}\n\n` : ""}
            extras={[
              { id: "tender", label: "Tender or RFQ link (if you have one)", type: "url" },
              { id: "closing", label: "Closing date (if any)", type: "date" },
              { id: "budget", label: "Rough budget", options: ["Under R1,000", "R1,000 to R5,000", "R5,000 to R15,000", "Over R15,000", "Not sure yet"] },
              { id: "urgency", label: "How urgent is it?", options: ["This week", "Within two weeks", "This month", "Just exploring"] },
              { id: "format", label: "Preferred format", options: ["Video call", "Phone call", "WhatsApp", "In person (Cape Town)"] },
            ]}
            messageLabel="Anything we should know?"
            placeholder="Your business and what you need help with."
            button="Request a session"
          />
        </div>
      </TenderSection>
    </>
  );
}
