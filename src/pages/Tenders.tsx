import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { TenderHero, TenderSection, DataTable, HonestNote, TenderCta, CtaLink } from "../components/TenderBlocks";

export default function Tenders() {
  return (
    <>
      <Seo
        title="Find South African Tenders and RFQs | ChatSched"
        description="Matched tenders and RFQs, plain-language summaries and deadline reminders for South African small businesses."
      />
      <TenderHero
        eyebrow="Find and track"
        title="Tenders and RFQs, in plain language."
        subtitle="Stop reading 60-page documents to find out if it's for you. We help you understand what matters and keep track of the dates."
      >
        <CtaLink to="/tender-readiness" variant="dark">Check you're ready first →</CtaLink>
        <CtaLink to="/tools" variant="light">Free tender tools</CtaLink>
      </TenderHero>

      <TenderSection tone="white" eyebrow="What's live today" title="Honest status: what works now and what's coming.">
        <DataTable
          head={["What", "Status", "How it works today"]}
          rows={[
            ["Free readiness check and score", "Live", "Answer six questions and get a score and a to-do list."],
            ["Expiry date tracker, points what-if, deadline planner, glossary", "Live", "Free tools on our Tools page. Nothing is stored on our side."],
            ["Tender search and plain-language summary", "On request", "Ask for a tender search or summary and a person does it for you. A person checks every summary."],
            ["Go or no-go advice on a named tender", "On request", "Book a tender strategy call."],
            ["Automated tender feed with matching", "Coming", "We are working on a feed from public tender sources. Not available yet."],
            ["WhatsApp deadline reminders", "Coming", "Today you can add reminders to your calendar from our tracker."],
          ]}
        />
        <p className="mt-5 text-sm text-billboard-inkSoft max-w-prose">
          Want a tender searched or summarised now? <Link to="/consult" className="underline font-semibold">Ask a person</Link>. Looking at the bigger picture? See <Link to="/services" className="underline font-semibold">everything we offer</Link>.
        </p>
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Where they come from" title="We always link to the original.">
        <p className="max-w-prose text-billboard-inkSoft mb-4">
          Public tenders are published by government and state-owned entities, and many can be found on the national eTender Publication Portal. When we share a tender with you, we link back to the original source so you can check it yourself. Private-sector RFQs come from the businesses that issue them.
        </p>
        <CtaLink to="/consult" variant="dark">Ask us to find tenders for you →</CtaLink>
        <HonestNote>Information is a convenience. The tender document is always the official source.</HonestNote>
      </TenderSection>

      <TenderCta
        title="Start with a free readiness check."
        body="Ten minutes. You leave with a clear list of what to fix."
        to="/tender-readiness"
        label="Start the check"
        secondaryTo="/consult"
        secondaryLabel="Talk to a person"
      />
    </>
  );
}
