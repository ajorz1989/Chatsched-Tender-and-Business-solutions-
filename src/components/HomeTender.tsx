import Seo from "./Seo";
import { BUNDLES } from "../lib/serviceCatalog";
import { TenderHero, TenderSection, CardGrid, CtaLink, TenderCta } from "./TenderBlocks";

/**
 * Homepage for the Tender & Consult Suite (HOME_LAYOUT = "tender"). Same
 * section rhythm, cards, eyebrow and buttons as the existing homepage; copy
 * only. No prices, statistics, client names, results or guarantees appear here.
 */
export default function HomeTender() {
  return (
    <>
      <Seo
        title="ChatSched | Tenders, RFQs & Small Business Compliance Help (South Africa)"
        description="Find tenders and RFQs, get your compliance sorted and submit clean applications. Practical help for South African small businesses."
      />
      <TenderHero
        eyebrow="Tenders, RFQs and compliance, made simple"
        title="Win more bids. Skip the paperwork stress."
        subtitle="ChatSched helps South African small businesses find tenders and RFQs, get their compliance sorted, and submit clean applications, with real people to help when you need them."
      >
        <CtaLink to="/tender-readiness" variant="dark">Check if you're tender-ready →</CtaLink>
        <CtaLink to="/consult" variant="light">Talk to a person</CtaLink>
        <CtaLink to="/for-partners" variant="">Accountant, attorney or adviser? Partner with us</CtaLink>
      </TenderHero>

      <TenderSection tone="white" eyebrow="What we do" title="Three steps from confused to submitted.">
        <CardGrid
          numbered
          items={[
            { title: "Find", body: "Tell us what you sell and where. We point you to tenders and RFQs that fit, in plain language." },
            { title: "Get ready", body: "We check what you have, show you what's missing, and connect you to qualified partners to fix it." },
            { title: "Apply", body: "We guide you through each submission, check it before you send it, and track every deadline." },
          ]}
        />
      </TenderSection>

      <TenderSection
        tone="ink"
        eyebrow="Why bids fail"
        title="Most bids don't lose on price. They lose on paperwork."
        intro="A missing tax compliance status. An unsigned page. An expired certificate. A form filled in the wrong place. These mistakes are avoidable, and a checklist catches them."
      >
        <CtaLink to="/bid-support" variant="yellow">See how bid support works →</CtaLink>
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Our services" title="Four ways we help, and more to come.">
        <CardGrid
          cols={4}
          items={[
            { title: "Tenders & RFQs", body: "Find, understand and track opportunities.", to: "/tenders" },
            { title: "Bid Support", body: "Guided applications and a pre-submission check.", to: "/bid-support" },
            { title: "Compliance Setup", body: "Tax, company registration, B-BBEE and financials through qualified partners.", to: "/compliance-setup" },
            { title: "Coaching & Consults", body: "Book a person for advice, coaching or a bid check.", to: "/consult" },
          ]}
        />
      </TenderSection>

      <TenderSection tone="white" eyebrow="Free tools" title="Free tools you can use today.">
        <CardGrid
          cols={4}
          items={[
            { title: "Expiry date tracker", body: "Never let tax compliance, B-BBEE or supplier registration lapse.", to: "/tools#expiry" },
            { title: "Points what-if", body: "See how price and B-BBEE level change an 80/20 or 90/10 score.", to: "/tools#points" },
            { title: "Deadline planner", body: "Work backwards from the closing date.", to: "/tools#planner" },
            { title: "Tender glossary", body: "Plain-language meanings for tender jargon.", to: "/tools#glossary" },
          ]}
        />
      </TenderSection>

      <TenderSection tone="dim" eyebrow="Packages" title="Buy one package, not ten sessions.">
        <CardGrid
          items={BUNDLES.map((b) => ({ title: b.title, body: `${b.body} Includes: ${b.includes.join(", ")}.` }))}
        />
        <div className="mt-6"><CtaLink to="/services" variant="dark">See every service →</CtaLink></div>
      </TenderSection>

      <TenderSection tone="yellow" eyebrow="How it works" title="Four steps. No jargon.">
        <CardGrid
          cols={4}
          numbered
          items={[
            { title: "Tell us", body: "Answer a short check, or message us on WhatsApp." },
            { title: "See your picture", body: "What you have and what's missing." },
            { title: "Choose your help", body: "Tenders, compliance, a bid check or an adviser." },
            { title: "Stay on time", body: "Deadlines and reminders in one place." },
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
