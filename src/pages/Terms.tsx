import Seo from "../components/Seo";
import LegalPageLayout, { type LegalSection } from "../components/LegalPageLayout";
import { CONTACT_EMAIL, LEGAL_EMAIL, CONTACT_ADDRESS_LINES, PLATFORM_VAT_NUMBER, PLATFORM_COMPANY_REGISTRATION } from "../lib/constants";

/**
 * Terms & Conditions for the ChatSched Tender & Consult Suite.
 *
 * DRAFT prepared without attorney review. A South African attorney must review
 * and approve this text before it is relied on. Points that most need review
 * are listed in LEGAL_REVIEW_NOTES.md (delivered with this code).
 */

const entityLine = PLATFORM_COMPANY_REGISTRATION
  ? `ChatSched (registration number ${PLATFORM_COMPANY_REGISTRATION})`
  : "ChatSched (a business based in Cape Town, South Africa)";
const vatLine = PLATFORM_VAT_NUMBER
  ? `ChatSched's VAT registration number is ${PLATFORM_VAT_NUMBER}. Prices include VAT where VAT is charged.`
  : "ChatSched is not currently registered for VAT, so no VAT is charged on our own fees. If that changes, we will say so before you pay.";

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <>
        <p>
          These Terms & Conditions apply when you use the ChatSched website, forms, WhatsApp channel and services (together, the <strong>Services</strong>). "We", "us" and "ChatSched" mean {entityLine}. "You" means the person using the Services and, if you use them for a business, that business.
        </p>
        <p>
          By using the Services, submitting a form, booking a session or paying us, you agree to these Terms. If you do not agree, please do not use the Services. If you use the Services for a business, you confirm that you are allowed to bind that business.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "What we do",
    body: (
      <>
        <p>ChatSched helps small businesses with tenders, RFQs and compliance. Depending on what you choose, the Services may include:</p>
        <ul>
          <li>a free readiness check that shows what you have and what may be missing;</li>
          <li>information about tenders and RFQs, summaries, and deadline reminders;</li>
          <li>guidance on completing forms and a review of your bid pack before you submit it;</li>
          <li>introductions and bookings with independent partners (such as tax practitioners, accountants, company secretaries, attorneys, B-BBEE verification agencies and bid writers);</li>
          <li>coaching and consultation sessions.</li>
        </ul>
        <p>What is included in a paid service, and its price, is shown to you before you pay.</p>
      </>
    ),
  },
  {
    id: "our-role",
    title: "What we are not",
    body: (
      <>
        <p>
          <strong>ChatSched is not a law firm, audit firm, accounting firm, registered tax practitioner or B-BBEE verification agency.</strong> Our information, summaries, checklists, coaching and general advice are guidance only. They are not legal, tax, accounting, financial or B-BBEE verification advice, and you should not treat them as a substitute for advice from a qualified professional.
        </p>
        <p>
          Regulated work, such as company registration, tax matters, financial statements, legal work and the issuing of B-BBEE affidavits or certificates, is carried out by independent, qualified partners or by you. We tell you who will do the work before you book.
        </p>
      </>
    ),
  },
  {
    id: "partners",
    title: "Independent partners",
    body: (
      <>
        <p>
          Partners are independent businesses or professionals. They are not our employees, agents or partners in law. A partner is responsible for the quality and lawfulness of their own work and for holding any registration or membership their profession requires. When you book a partner through us, your service agreement for that work is with the partner, on the scope and price shown to you.
        </p>
        <p>
          We take reasonable steps to check partners before we list them, such as asking for professional registration or membership where it applies and for references. We cannot guarantee any partner's work, and we are not responsible for a partner's professional advice.
        </p>
        <p>
          If we charge a fee or receive a commission in connection with a partner booking, we show it to you before you pay.
        </p>
      </>
    ),
  },
  {
    id: "no-guarantee",
    title: "No guarantee of results",
    body: (
      <>
        <p>
          <strong>We do not guarantee that any bid, quotation, application or registration will be shortlisted, awarded or approved.</strong> Those decisions belong to the buyer, the regulator or the relevant authority. Our work can improve the quality and completeness of what you submit, but it cannot control the outcome.
        </p>
        <p>
          Requirements differ between buyers and between tenders, and the rules change from time to time. The tender document and the buyer's instructions are always the official source. You are responsible for reading them and for deciding what to submit and when.
        </p>
      </>
    ),
  },
  {
    id: "information",
    title: "Tender information and third-party sites",
    body: (
      <>
        <p>
          Tender and RFQ information comes from public sources, buyers and other third parties. We try to keep it accurate and we link to the original source where we can, but it may be incomplete, late or wrong, and a tender may be changed or cancelled after we publish it. Check the original source before you rely on it, especially closing dates, briefing sessions and mandatory documents.
        </p>
        <p>
          Links to other websites are for your convenience. We do not control those sites and are not responsible for their content or availability.
        </p>
      </>
    ),
  },
  {
    id: "ai",
    title: "AI-assisted content",
    body: (
      <>
        <p>
          We use artificial intelligence tools to help draft summaries, checklists and similar content. AI can make mistakes. For paid summaries, a person at ChatSched reviews the content before we give it to you. Free tools and automated messages, such as the readiness result, may be generated without a person reviewing each one. You must still check anything important against the official documents.
        </p>
        <p>
          We will tell you if you are chatting with an automated assistant, and you can ask to speak to a person at any time.
        </p>
      </>
    ),
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities",
    body: (
      <>
        <p>You agree to:</p>
        <ul>
          <li>give us accurate, complete and current information, and tell us if it changes;</li>
          <li>only share documents and information that you are allowed to share, and not share other people's personal information without a lawful reason;</li>
          <li>not send us ID numbers, bank account details, passwords or tax numbers unless we have specifically asked for them for a service you booked, through a secure method we have told you about;</li>
          <li>check and approve anything we prepare for you before you sign or submit it, because you remain responsible for your own submissions;</li>
          <li>meet your own legal, tax and tender obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You must not use the Services to:</p>
        <ul>
          <li>do anything unlawful, fraudulent or misleading, including preparing false or forged documents or making false statements in a bid;</li>
          <li>attempt to bribe or improperly influence anyone connected to a tender or procurement process;</li>
          <li>harass, abuse or threaten our staff, partners or other users;</li>
          <li>interfere with, scrape, overload or try to gain unauthorised access to the Services or our systems;</li>
          <li>copy or resell our content, summaries or tools without our written permission.</li>
        </ul>
        <p>
          We may refuse, suspend or end a service if you break these rules, and we may report unlawful conduct to the authorities.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees and payment",
    body: (
      <>
        <p>
          The readiness check is free. Paid services are priced in South African rand, and the price, what it includes, who delivers it and any partner fee are shown to you before you pay. Partners set their own prices.
        </p>
        <p>{vatLine}</p>
        <p>
          Payment is due as stated at booking. We may use a third-party payment provider to process payments, and its terms and privacy practices also apply to your payment. We do not store your full card details.
        </p>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "Cancellations, cooling-off and refunds",
    body: (
      <>
        <p>
          <strong>Your legal rights stay in place.</strong> Where the law gives you a cooling-off or cancellation right, for example for certain electronic transactions or direct-marketing sales, we will honour it. These Terms do not take away any right you have under the Consumer Protection Act 68 of 2008, the Electronic Communications and Transactions Act 25 of 2002 or any other law that applies to you and cannot be excluded.
        </p>
        <p>In addition:</p>
        <ul>
          <li><strong>Sessions:</strong> you may reschedule or cancel a booked session if you tell us in writing at least [24 hours] before it starts. A session cancelled later, or missed, may be charged.</li>
          <li><strong>Work we or a partner did not deliver:</strong> if we or a partner do not deliver what was agreed, we will offer to fix it, redo it or refund the part that was not delivered.</li>
          <li><strong>Work already done:</strong> where work has been completed as agreed, the fee for that work is not refundable simply because a bid was unsuccessful, because we do not guarantee results.</li>
          <li><strong>How refunds are paid:</strong> approved refunds are paid back to the original payment method within a reasonable time that we confirm to you in writing.</li>
        </ul>
        <p>The conditions that apply to a particular paid service are also shown at booking.</p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Complaints and disputes",
    body: (
      <>
        <p>
          If something goes wrong, tell us as soon as you can at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or on WhatsApp. Say what happened and what you would like us to do. A person will look into it, speak to any partner involved, and reply to you in writing. If you are still unhappy, write to <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> and we will escalate it.
        </p>
        <p>
          If we cannot resolve a dispute, you may use any right you have to approach the National Consumer Commission, a consumer court, an ombud or a court, and we may use alternative dispute resolution such as mediation if both sides agree. You may also approach the professional body of any partner whose work you are unhappy with.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The Services, our brand, our content, checklists, templates and software belong to us or our licensors. We give you a limited, non-exclusive, non-transferable right to use them for your own business purposes while you use the Services.
        </p>
        <p>
          You keep ownership of the documents and information you give us. You allow us to use them to provide the Services to you, including sharing them with a partner you choose to work with. Work product a partner creates for you is covered by the terms you agree with that partner.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Our responsibility to you",
    body: (
      <>
        <p>
          We will provide the Services with reasonable skill and care. To the extent the law allows, we are not liable for loss that comes from your reliance on information or guidance without checking the official source, from a buyer's decision, from a partner's work or advice, from events outside our reasonable control, or for indirect or consequential loss, including lost contracts, lost profit or lost opportunity.
        </p>
        <p>
          To the extent the law allows, our total liability to you for any claim connected to a paid service is limited to the amount you paid us for that service. Nothing in these Terms limits or excludes liability that cannot lawfully be limited or excluded, including liability for gross negligence, fraud, or anything the Consumer Protection Act does not allow us to exclude.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "Your personal information",
    body: (
      <p>
        We handle personal information as set out in our <a href="/privacy">Privacy Policy</a>, which forms part of these Terms.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes, suspension and ending the Services",
    body: (
      <>
        <p>
          We may change these Terms, the Services or our prices from time to time. We will post the updated Terms on this page with a new "last updated" date, and where a change materially affects a service you have already paid for, we will tell you. A change does not affect a booking you have already paid for, unless the law requires it.
        </p>
        <p>
          We may suspend or end a service if you break these Terms or if we are required to by law. You may stop using the Services at any time.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the Republic of South Africa. Subject to any right you have to go to a specific forum under consumer law, the courts of South Africa, including the Western Cape Division of the High Court, may hear any dispute. If a part of these Terms is found to be unlawful or unenforceable, the rest stays in force.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>
          Legal questions: <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>. General help: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or the <a href="/contact">Contact page</a>.
        </p>
        <p>Our address for notices: {CONTACT_ADDRESS_LINES.join(", ")}.</p>
      </>
    ),
  },
];

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms & Conditions · ChatSched"
        description="The terms for using ChatSched's tender, RFQ, compliance and consultation services, including fees, refunds, complaints and what we do and don't promise."
      />
      <LegalPageLayout
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="The terms for using ChatSched's tender, RFQ, compliance and consultation services."
        lastUpdated="21 October 2026"
        sections={sections}
      />
    </>
  );
}
