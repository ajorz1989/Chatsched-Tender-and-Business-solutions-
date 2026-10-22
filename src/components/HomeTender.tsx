import Seo from "./Seo";
import { BUNDLES } from "../lib/serviceCatalog";
import { whatsappLink } from "../lib/constants";
import { TenderHero, TenderSection, CardGrid, CheckList, CtaLink, TextLink, HonestNote, TenderCta } from "./TenderBlocks";

/**
 * Homepage for the Tender & Consult Suite (HOME_LAYOUT = "tender"). Same
 * section rhythm, cards, eyebrow and buttons as before. No prices, statistics,
 * client names, results or guarantees appear here, and nothing is described as
 * available unless /tenders lists it as live or on request.
 */

/** A static, clearly labelled sample of what the readiness check returns. No real data. */
function ExampleResult() {
  const rows = [
    { mark: "✓", name: "Company registration", status: "Ready" },
    { mark: "!", name: "B-BBEE certificate", status: "Check expiry date" },
    { mark: "✗", name: "Tax compliance status", status: "Missing: fix first" },
  ];
  return (
    <aside aria-label="Example readiness result" className="border-[3px] border-billboard-ink rounded-xl bg-white text-billboard-ink shadow-block p-6">
      <span className="eyebrow">Example only</span>
      <p className="font-display text-xl mb-3">Your tender-ready list</p>
      <ul className="list-none p-0 m-0">
        {rows.map((row) => (
          <li key={row.name} className="flex items-start justify-between gap-3 border-t-2 border-billboard-ink/15 py-3 text-sm">
            <span className="flex gap-2 font-semibold">
              <span aria-hidden="true" className="font-display">{row.mark}</span>
              {row.name}
            </span>
            <span className="font-mono text-xs uppercase text-right">{row.status}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-billboard-inkSoft">Your real result shows what to fix first.</p>
    </aside>
  );
}

export default function HomeTender() {
  return (
    <>
      <Seo
        title="Tender & RFQ Help for SA Small Businesses | ChatSched"
        description="Find tenders and RFQs, get your compliance sorted and submit clean applications. Practical help for South African small businesses."
      />
      <TenderHero
        eyebrow="Tenders, RFQs and compliance, made simple"
        title="Submit clean bids. Skip the paperwork stress."
        subtitle="ChatSched helps South African small businesses find tenders and RFQs, get their compliance sorted, and submit clean applications, with real people to help when you need them."
        aside={<ExampleResult />}
        footer={<>Accountant, attorney or adviser? <TextLink to="/for-partners">Partner with us →</TextLink></>}
      >
        <CtaLink to="/tender-readiness" variant="dark">Check if you're tender-ready →</CtaLink>
        <CtaLink to="/consult" variant="light">Talk to a person</CtaLink>
      </TenderHero>

      <TenderSection tone="white" eyebrow="What we do" title="Three steps from confused to submitted.">
        <CardGrid
          numbered
          items={[
            { title: "Find", body: "Ask us for tenders and RFQs that fit what you sell and where. A person finds them and explains them in plain language." },
            { title: "Get ready", body: "We check what you have, show you what's missing, and introduce you to qualified independent partners to fix it." },
            { title: "Apply", body: "We guide you through each submission, check it before you send it, and give you tools to keep every deadline in view." },
          ]}
        />
      </TenderSection>

      <TenderSection
        tone="ink"
        eyebrow="Why bids fail"
        title="Most bids don't lose on price. They lose on paperwork."
        intro="These mistakes are avoidable, and a checklist catches them."
      >
        <CheckList
          items={[
            "A missing tax compliance status",
            "An unsigned page",
            "An expired certificate",
            "A form filled in the wrong place",
          ]}
        />
        <div className="mt-8"><CtaLink to="/bid-support" variant="yellow">See how bid support works →</CtaLink></div>
      </TenderSection>

      <TenderSection tone="white" eyebrow="Free tools" title="Free tools you can use today.">
        <CardGrid
          cols={4}
          items={[
            { title: "Expiry date tracker", tag: "Live", body: "Keep your tax compliance, B-BBEE and supplier registration dates in one list, with calendar reminders. Nothing is stored on our side.", to: "/tools#expiry" },
            { title: "Points what-if", tag: "Live", body: "See how price and B-BBEE level change an 80/20 or 90/10 score.", to: "/tools#points" },
            { title: "Deadline planner", tag: "Live", body: "Work backwards from the closing date.", to: "/tools#planner" },
            { title: "Tender glossary", tag: "Live", body: "Plain-language meanings for tender jargon.", to: "/tools#glossary" },
          ]}
        />
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Our services" title="Four ways we help, and more to come." intro="The label on each card shows what you can ask for today.">
        <CardGrid
          cols={4}
          items={[
            { title: "Tenders & RFQs", tag: "On request", body: "Tender searches and plain-language summaries, done for you. A person checks every summary.", to: "/tenders" },
            { title: "Bid Support", tag: "On request", body: "Guided applications and a pre-submission check.", to: "/bid-support" },
            { title: "Compliance Setup", tag: "Some on request", body: "Introductions to independent, qualified partners for tax, company registration, B-BBEE and financials.", to: "/compliance-setup" },
            { title: "Coaching & Consults", tag: "On request", body: "Book a person for advice, coaching or a bid check.", to: "/consult" },
          ]}
        />
      </TenderSection>

      <TenderSection tone="yellow" eyebrow="How it works" title="Four steps. No jargon.">
        <CardGrid
          cols={4}
          numbered
          items={[
            {
              title: "Tell us",
              body: (
                <>
                  Answer a short check, or{" "}
                  <a
                    href={whatsappLink("Hi, I'd like help with tenders and compliance")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold text-billboard-ink"
                  >
                    message us on WhatsApp
                  </a>
                  .
                </>
              ),
            },
            { title: "See your picture", body: "What you have and what's missing." },
            { title: "Choose your help", body: "Tenders, compliance, a bid check or an adviser." },
            { title: "Stay on time", body: "A deadline tracker with calendar and email reminders." },
          ]}
        />
      </TenderSection>

      <TenderSection tone="white" eyebrow="Our promise" title="What we promise, and what we don't.">
        <CardGrid
          cols={3}
          items={[
            { title: "We promise", body: "Clear steps, plain language, a fixed price quoted before you pay and a real person on hand." },
            { title: "We don't promise", body: "That you will win. Nobody can honestly promise that." },
            { title: "Who does what", body: "Regulated work is done by qualified independent partners. We always tell you who does what." },
          ]}
        />
        <HonestNote>
          ChatSched is not a law firm, audit firm, accounting firm, registered tax practitioner or B-BBEE verification agency.
        </HonestNote>
      </TenderSection>

      <TenderSection
        tone="dim"
        eyebrow="Packages"
        title="Buy one package, not ten sessions."
        intro="Each package is quoted before you pay. We confirm exactly what is open today when you ask."
      >
        <CardGrid items={BUNDLES.map((b) => ({ title: b.title, body: b.body, list: b.includes }))} />
        <div className="mt-6"><CtaLink to="/services" variant="dark">See every service →</CtaLink></div>
      </TenderSection>

      <TenderCta
        title="Start with a free readiness check."
        body="About ten minutes. You leave with a clear list of what to fix."
        to="/tender-readiness"
        label="Start the check"
        secondaryTo="/pricing"
        secondaryLabel="See pricing"
      />
    </>
  );
}
