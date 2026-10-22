import Seo from "../components/Seo";
import { TenderHero, TenderSection, TenderCta } from "../components/TenderBlocks";

const FAQS: [string, string][] = [
  ["Is ChatSched a law firm or accounting firm?", "No. We guide and organise. Regulated work is done by independent, qualified partners."],
  ["Will you guarantee I win a tender?", "No. Nobody honestly can. We help you submit a clean, complete bid."],
  ["Where do tenders come from?", "Public tenders are published by government and state entities, and we link to the original source. Private RFQs come from the businesses that issue them."],
  ["Is the readiness check really free?", "Yes. The score, the free tools and a short intro call with a person cost nothing."],
  ["Do you have a live tender feed?", "Not yet. Today a person searches and summarises tenders for you on request, and our free tools help you track dates and points. An automated feed is something we are working on."],
  ["Can I get reminders?", "You can add expiry and deadline reminders to your calendar from our free tools. WhatsApp reminders are coming later."],
  ["What does it cost?", "Each paid service is quoted at a fixed price before you pay. We are still testing what services are worth with real businesses, so we do not publish a price list yet."],
  ["Which services can I get today?", "See our All services page. Each service says whether you can request it now, whether it is coming soon, or whether we need a qualified partner first."],
  ["What is the score on the readiness check?", "A rough indicator out of 100 of how many tender basics you have in place. It does not predict whether you will win."],
  ["Do I need documents for the check?", "No. Just tell us what you have. We never ask for ID, bank or tax numbers."],
  ["Who sees my information?", "Only what you share, and only for the service you asked for. See our Privacy Policy."],
  ["Do you use AI?", "AI helps draft summaries and checklists. A person reviews paid summaries before you rely on them."],
  ["What if a partner does poor work?", "Tell us. Our Trust Centre explains how complaints and refunds are handled."],
  ["What do you charge for partner services?", "The partner's price is shown before you pay, along with any ChatSched fee."],
  ["Do you offer this in other languages?", "English for now."],
  ["I'm an accountant, attorney or adviser. Can I join?", "Yes. See our For Partners page."],
];

export default function TenderFaq() {
  return (
    <>
      <Seo
        title="FAQ | ChatSched Tender & Consult Suite"
        description="Answers about tender help, compliance support, partners, AI and privacy."
      />
      <TenderHero eyebrow="FAQ" title="Straight answers." subtitle="If your question isn't here, talk to a person." />
      <TenderSection tone="white">
        <div className="max-w-3xl space-y-3">
          {FAQS.map(([q, a]) => (
            <details key={q} className="border-2 border-billboard-ink rounded-lg bg-white p-4 group">
              <summary className="font-bold cursor-pointer">{q}</summary>
              <p className="text-sm text-billboard-inkSoft mt-3">{a}</p>
            </details>
          ))}
        </div>
      </TenderSection>
      <TenderCta title="Still have a question?" body="A person will answer." to="/contact" label="Contact us" secondaryTo="/tender-readiness" secondaryLabel="Free readiness check" />
    </>
  );
}
