import Seo from "../components/Seo";
import { TenderHero, TenderSection, CardGrid, DataTable, TenderCta } from "../components/TenderBlocks";

export default function TenderHowItWorks() {
  return (
    <>
      <Seo
        title="How It Works | ChatSched Tender & Consult Suite"
        description="Four simple steps: tell us, see your picture, choose your help, and stay on time."
      />
      <TenderHero eyebrow="How it works" title="Four steps. No jargon." subtitle="From not sure where to start to a clean submission." />
      <TenderSection tone="white">
        <CardGrid
          cols={4}
          numbered
          items={[
            { title: "Tell us", body: "Answer a short check about your business, or message us on WhatsApp." },
            { title: "See your picture", body: "We show what you have and what's missing." },
            { title: "Choose your help", body: "Find tenders, fix compliance, check a bid or talk to an adviser." },
            { title: "Stay on time", body: "Tender deadlines you save to your own calendar. Reminders are coming soon." },
          ]}
        />
      </TenderSection>
      <TenderSection tone="dim" eyebrow="Who does what" title="We guide. Qualified partners do the regulated work.">
        <DataTable
          head={["ChatSched", "Independent partners"]}
          rows={[
            ["Explains what you need in plain language", "Tax and company registration work"],
            ["Checks your readiness and your bid pack", "B-BBEE affidavits and certificates"],
            ["Explains deadlines and what each document is for", "Financial statements and legal reviews"],
          ]}
        />
      </TenderSection>
      <TenderCta title="Ready to start?" body="The free readiness check takes about ten minutes." to="/tender-readiness" label="Start the check" />
    </>
  );
}
