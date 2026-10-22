import Seo from "../components/Seo";
import LegalPageLayout, { type LegalSection } from "../components/LegalPageLayout";
import { CONTACT_EMAIL, LEGAL_EMAIL, CONTACT_ADDRESS_LINES } from "../lib/constants";

/**
 * Privacy Policy (POPIA) for the ChatSched Tender & Consult Suite.
 *
 * DRAFT prepared without attorney review. A South African attorney must review
 * and approve this text, and the vendor and retention details below must be
 * confirmed against what is actually used, before it is relied on. See
 * LEGAL_REVIEW_NOTES.md (delivered with this code).
 */

const sections: LegalSection[] = [
  {
    id: "who",
    title: "Who we are",
    body: (
      <>
        <p>
          ChatSched ("we", "us") is the <strong>responsible party</strong> for your personal information under the Protection of Personal Information Act 4 of 2013 (POPIA). We are based at {CONTACT_ADDRESS_LINES.join(", ")}.
        </p>
        <p>
          Our Information Officer can be reached at <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>. This policy explains what personal information we collect, why, who sees it, how long we keep it and what your rights are.
        </p>
      </>
    ),
  },
  {
    id: "collect",
    title: "What we collect",
    body: (
      <>
        <p>We collect only what we need for the service you ask for:</p>
        <ul>
          <li><strong>Contact details:</strong> your name, email address and, if you give it, your phone or WhatsApp number.</li>
          <li><strong>Business details:</strong> your business name, what you sell, the province you serve, and your answers to the readiness questions (for example whether you have CIPC registration or tax compliance status).</li>
          <li><strong>Messages and bookings:</strong> what you write to us in forms, email or WhatsApp, and the sessions you request.</li>
          <li><strong>Documents:</strong> only if you choose to send them for a service you booked, such as a bid check.</li>
          <li><strong>Payment information:</strong> the details of what you paid and when. Card details are handled by our payment provider, not stored by us.</li>
          <li><strong>Technical information:</strong> your device, browser, IP address and pages visited, collected through cookies and similar tools if you accept them.</li>
        </ul>
        <p>
          <strong>Please do not send us</strong> ID numbers, bank account details, passwords, tax numbers or special personal information (such as health, religion or criminal records) unless we have specifically asked for it for a service you booked and told you how to send it securely. The readiness check does not ask for any of these.
        </p>
      </>
    ),
  },
  {
    id: "why",
    title: "Why we use it",
    body: (
      <>
        <p>We use your personal information to:</p>
        <ul>
          <li>give you your readiness result and contact you about it;</li>
          <li>provide, manage and bill for the services you request, including bookings and reminders;</li>
          <li>introduce you to a partner when you ask us to;</li>
          <li>reply to your questions and handle complaints;</li>
          <li>keep our Services secure, prevent fraud and meet our legal and tax obligations;</li>
          <li>improve the Services, using information that does not identify you wherever we can;</li>
          <li>send you marketing, only where the law allows it (see below).</li>
        </ul>
        <p>
          We rely on your consent, on the need to carry out a service you asked for, on our legal obligations, and on our legitimate interests in running and protecting a business where those interests do not override your rights. Where we rely on consent, you can withdraw it at any time, but withdrawing it does not affect what we did before.
        </p>
      </>
    ),
  },
  {
    id: "marketing",
    title: "Marketing and your choices",
    body: (
      <p>
        We will only send you direct marketing by electronic message if you are an existing customer in relation to similar services, or if you have given us your consent, and you can opt out at any time by replying "stop", using the link in a message, or emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Opting out of marketing does not stop service messages about a booking you made. Checking the consent box on the readiness check allows us to contact you about your result.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We do not sell your personal information. We share it only as needed:</p>
        <ul>
          <li><strong>Partners you choose:</strong> if you ask us to connect you with a tax practitioner, accountant, attorney, B-BBEE agency, bid writer or coach, we share the details they need to help you. They are independent and must handle your information lawfully.</li>
          <li><strong>Service providers (operators):</strong> companies that process information for us under written agreements, such as hosting and database providers, email and messaging providers (including WhatsApp), payment processors, analytics and automation tools, and AI providers that help draft summaries. We only give them what they need.</li>
          <li><strong>Authorities and advisers:</strong> where the law requires it, or to our own lawyers, accountants and insurers under confidentiality duties.</li>
          <li><strong>A buyer of our business:</strong> if we are sold or restructured, with the same protections for your information.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ai",
    title: "AI tools",
    body: (
      <p>
        We use AI tools to help draft summaries and checklists. We do not use AI tools to make decisions about you that have legal or similarly significant effects without a person being involved. We give AI providers only the information needed for the task, and we aim to remove personal details first wherever we can. Paid summaries are reviewed by a person before you receive them.
      </p>
    ),
  },
  {
    id: "abroad",
    title: "Sending information outside South Africa",
    body: (
      <p>
        Some of our service providers store or process information on servers outside South Africa. We only transfer personal information abroad where the recipient is subject to law, binding rules or an agreement that gives a level of protection similar to POPIA, or where you have consented, or where the transfer is needed to provide the service you asked for.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: (
      <p>
        We use cookies and similar tools to make the site work and, if you accept, to understand how it is used. You can accept or decline non-essential cookies in the banner and change your choice later through your browser settings. Declining does not stop you from using the Services.
      </p>
    ),
  },
  {
    id: "keep",
    title: "How long we keep it",
    body: (
      <>
        <p>We keep personal information only as long as we need it for the purpose we collected it for, or as the law requires:</p>
        <ul>
          <li><strong>Enquiries and readiness answers:</strong> up to [12 months] after our last contact, unless you become a customer.</li>
          <li><strong>Customer and payment records:</strong> for as long as the law requires us to keep financial and tax records (for tax records this is currently at least five years).</li>
          <li><strong>Documents you send for a service:</strong> deleted or returned within [90 days] after the service ends, unless the law or a dispute requires us to keep them.</li>
        </ul>
        <p>When we no longer need information, we delete it or make it anonymous.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <>
        <p>
          We use reasonable technical and organisational measures to protect personal information, including encrypted connections, access controls, limiting who can see it and keeping it with reputable providers. No system is completely secure.
        </p>
        <p>
          If there is a security breach that is likely to put your personal information at risk, we will notify the Information Regulator and you, as POPIA requires, as soon as reasonably possible.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>ask whether we hold personal information about you and ask for a copy;</li>
          <li>ask us to correct information that is wrong or out of date;</li>
          <li>ask us to delete or restrict information we no longer have a lawful reason to keep;</li>
          <li>object to us using your information, including for direct marketing;</li>
          <li>withdraw consent you gave us;</li>
          <li>complain to the Information Regulator.</li>
        </ul>
        <p>
          To use these rights, email <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>. We may ask you to prove who you are before we act, and we will reply within a reasonable time. The Information Regulator's contact details are on its website, inforegulator.org.za.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        The Services are for businesses and adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has given us information, please tell us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. We will post the new version here with a new "last updated" date, and tell you if a change significantly affects how we use your information.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Privacy questions or requests: <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>. General help: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Also see our <a href="/terms">Terms & Conditions</a>.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy & POPIA · ChatSched"
        description="How ChatSched collects, uses, shares and protects your personal information under POPIA, and the rights you have."
      />
      <LegalPageLayout
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How we collect, use, share and protect your personal information, and your rights under POPIA."
        lastUpdated="21 October 2026"
        sections={sections}
      />
    </>
  );
}
