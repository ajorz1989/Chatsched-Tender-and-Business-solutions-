import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { submitPublicForm } from "../lib/publicFormSubmit";
import { useHoneypot } from "../hooks/useHoneypot";
import { whatsappLink, WHATSAPP_NUMBER_DISPLAY } from "../lib/constants";

const INPUT = "w-full border-2 border-billboard-ink rounded px-3 py-2.5 bg-white";
const LABEL = "block text-sm font-semibold mb-1.5";

interface Question {
  id: string;
  label: string;
  why: string;
  fix: string;
  options: { value: string; label: string; status: "green" | "yellow" | "red" }[];
}

const YNU: Question["options"] = [
  { value: "yes", label: "Yes", status: "green" },
  { value: "unsure", label: "Not sure", status: "yellow" },
  { value: "no", label: "No", status: "red" },
];

/** The readiness questions. Only yes/no style answers; no ID, bank or tax numbers are collected. */
export const READINESS_QUESTIONS: Question[] = [
  {
    id: "cipc",
    label: "Is your business registered with CIPC?",
    why: "Buyers ask for proof that your business legally exists.",
    fix: "A company secretary or attorney partner can register or update it.",
    options: YNU,
  },
  {
    id: "tax",
    label: "Do you have a tax number and valid tax compliance status with SARS?",
    why: "Many tenders require valid tax compliance on the closing date. It is a common reason bids are rejected.",
    fix: "A tax practitioner partner can check and fix your status.",
    options: YNU,
  },
  {
    id: "csd",
    label: "Are you registered on the Central Supplier Database?",
    why: "Government buyers usually need you to be on the supplier database.",
    fix: "We can guide you through the registration steps.",
    options: YNU,
  },
  {
    id: "bbbee",
    label: "Do you have a B-BBEE affidavit or certificate?",
    why: "Buyers use it to score bids. Which document applies depends on your size and the buyer.",
    fix: "We explain the options; a partner or accredited agency issues the document.",
    options: [
      { value: "yes", label: "Yes", status: "green" },
      { value: "unsure", label: "Not sure", status: "yellow" },
      { value: "no", label: "No", status: "red" },
    ],
  },
  {
    id: "docs",
    label: "Do you have a bank confirmation letter and proof of business address?",
    why: "These are asked for in most supplier packs.",
    fix: "Your bank and a recent utility bill or lease normally cover this.",
    options: [
      { value: "yes", label: "Yes", status: "green" },
      { value: "no", label: "No", status: "red" },
    ],
  },
  {
    id: "experience",
    label: "Have you submitted a bid or quote before?",
    why: "First-time bidders benefit most from a pre-submission check.",
    fix: "A bid check or a coaching session helps you avoid common mistakes.",
    options: [
      { value: "often", label: "Often", status: "green" },
      { value: "few", label: "A few times", status: "yellow" },
      { value: "never", label: "Never", status: "red" },
    ],
  },
];

const HELP_OPTIONS = [
  "Finding tenders and RFQs",
  "Getting my papers in order",
  "Checking or writing a bid",
  "Talking to a person",
];

/** Structured readiness score: done = full marks, needs attention = half, missing = none. Out of 100. */
export function readinessScore(answers: Record<string, string>): number {
  const pts = READINESS_QUESTIONS.reduce((sum, q) => {
    const status = q.options.find((o) => o.value === answers[q.id])?.status;
    return sum + (status === "green" ? 1 : status === "yellow" ? 0.5 : 0);
  }, 0);
  return Math.round((pts / READINESS_QUESTIONS.length) * 100);
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div className="mb-5" role="group" aria-label={label}>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="font-mono text-[11px] uppercase font-bold">{label}</span>
        <span className="font-display text-2xl">{score}<span className="text-sm"> / 100</span></span>
      </div>
      <div className="h-4 border-2 border-billboard-ink rounded bg-white overflow-hidden">
        <div className="h-full bg-billboard-yellow" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

const DOT: Record<string, string> = {
  green: "bg-billboard-green",
  yellow: "bg-billboard-yellow",
  red: "bg-billboard-red",
};
const STATUS_LABEL: Record<string, string> = { green: "Done", yellow: "Needs attention", red: "Missing" };

function ThankYou({ name, answers }: { name: string; answers: Record<string, string> }) {
  const rows = READINESS_QUESTIONS.map((q) => {
    const opt = q.options.find((o) => o.value === answers[q.id]);
    return { q, status: opt?.status ?? "yellow" };
  });
  const open = rows.filter((r) => r.status !== "green");
  return (
    <div className="border-[3px] border-billboard-ink rounded-lg bg-white p-6 md:p-7 shadow-blockSm">
      <h2 className="font-display text-2xl mb-1">
        {open.length === 0 ? "You look close to ready." : `You're close. ${open.length} thing${open.length === 1 ? "" : "s"} to sort.`}
      </h2>
      <p className="text-sm text-billboard-inkSoft mb-5">
        Thanks, {name.split(" ")[0] || "there"}. We've got your details and a person will contact you. This is a guide, not legal, tax or accounting advice, and the score is a rough indicator only. It does not predict whether you will win.
      </p>
      <ScoreBar score={readinessScore(answers)} label="Your readiness score" />
      <ul className="space-y-3 list-none p-0 m-0 mb-6">
        {rows.map(({ q, status }) => (
          <li key={q.id} className="border-2 border-billboard-ink rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-block w-3.5 h-3.5 rounded-full border-2 border-billboard-ink ${DOT[status]}`} aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase font-bold">{STATUS_LABEL[status]}</span>
            </div>
            <p className="font-bold text-sm">{q.label}</p>
            {status !== "green" && (
              <p className="text-sm text-billboard-inkSoft mt-1">{q.why} {q.fix}</p>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/consult" className="brand-button">Book a session →</Link>
        <Link to="/compliance-setup" className="brand-button light">See compliance help</Link>
      </div>
    </div>
  );
}

export function ReadinessForm() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [business, setBusiness] = useState("");
  const [sells, setSells] = useState("");
  const [province, setProvince] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [help, setHelp] = useState(HELP_OPTIONS[0]);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLikelyBot, wrapperProps } = useHoneypot();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLikelyBot(website)) {
      setSending(true);
      setTimeout(() => { setSending(false); setDone(true); }, 400);
      return;
    }
    setSending(true);
    setError(null);
    const lines = [
      "TENDER READINESS CHECK",
      `SCORE: ${readinessScore(answers)}/100`,
      `ANSWERS: ${READINESS_QUESTIONS.map((q) => `${q.id}=${answers[q.id] ?? "none"}`).join(";")}`,
      `Sells: ${sells}`,
      `Province: ${province}`,
      ...READINESS_QUESTIONS.map((q) => `${q.label} ${answers[q.id] ?? "no answer"}`),
      `Wants help with: ${help}`,
      "Consent to be contacted: yes",
    ];
    try {
      const result = await submitPublicForm("agency_lead", {
        business_name: business,
        contact_name: name,
        contact_email: email,
        contact_phone: phone,
        notes: lines.join("\n"),
        estimated_value: "0",
        source: "tender-readiness",
      });
      if (!result.ok) {
        setError(result.error ?? "Something went wrong. Please try again.");
      } else {
        setDone(true);
        supabase.functions.invoke("notify", { body: { kind: "new_agency_lead", lead_id: result.id ?? null } }).catch(() => {});
      }
    } catch {
      setError("We couldn't send your answers. Please try WhatsApp or email instead.");
    } finally {
      setSending(false);
    }
  }

  if (done) return <ThankYou name={name} answers={answers} />;

  const complete = READINESS_QUESTIONS.every((q) => answers[q.id]);

  return (
    <form onSubmit={handleSubmit} className="border-[3px] border-billboard-ink rounded-lg p-6 md:p-7 bg-white text-billboard-ink shadow-blockSm">
      <h2 className="font-display text-2xl mb-1">Your readiness check</h2>
      <p className="text-sm text-billboard-inkSoft mb-6">No documents needed. We never ask for ID, bank or tax numbers here.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="tr-business" className={LABEL}>Business name</label>
          <input id="tr-business" required value={business} onChange={(e) => setBusiness(e.target.value)} className={INPUT} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="tr-sells" className={LABEL}>What do you sell or do?</label>
          <input id="tr-sells" required value={sells} onChange={(e) => setSells(e.target.value)} className={INPUT} placeholder="For example: cleaning, catering, printing" />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="tr-province" className={LABEL}>Province you can serve</label>
        <input id="tr-province" required value={province} onChange={(e) => setProvince(e.target.value)} className={INPUT} placeholder="For example: Western Cape" />
      </div>

      <ScoreBar score={readinessScore(answers)} label="Your readiness score so far" />

      <div className="space-y-5 mb-6">
        {READINESS_QUESTIONS.map((q) => (
          <fieldset key={q.id}>
            <legend className="text-sm font-semibold mb-2">{q.label}</legend>
            <div className="flex flex-wrap gap-2">
              {q.options.map((o) => {
                const active = answers[q.id] === o.value;
                return (
                  <label
                    key={o.value}
                    className={`cursor-pointer border-2 border-billboard-ink rounded px-3 py-2 text-sm font-semibold ${active ? "bg-billboard-yellow" : "bg-white"}`}
                  >
                    <input
                      type="radio"
                      name={`tr-${q.id}`}
                      value={o.value}
                      checked={active}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                      className="sr-only"
                      required
                    />
                    {o.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mb-6">
        <label htmlFor="tr-help" className={LABEL}>What do you want help with first?</label>
        <select id="tr-help" value={help} onChange={(e) => setHelp(e.target.value)} className={INPUT}>
          {HELP_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="tr-name" className={LABEL}>Your name</label>
          <input id="tr-name" required value={name} onChange={(e) => setName(e.target.value)} className={INPUT} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="tr-email" className={LABEL}>Email</label>
          <input id="tr-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="tr-phone" className={LABEL}>WhatsApp (optional)</label>
          <input id="tr-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={INPUT} autoComplete="tel" />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm mb-5 cursor-pointer">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 w-4 h-4" />
        <span>
          I agree that ChatSched may contact me about my readiness result. I can ask to stop at any time. See our{" "}
          <Link to="/privacy" className="underline font-semibold">Privacy Policy</Link>.
        </span>
      </label>

      <div {...wrapperProps}>
        <label htmlFor="tr-website">Leave this field empty</label>
        <input id="tr-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {error && <p role="alert" className="text-billboard-red text-xs font-semibold mb-3">{error}</p>}
      {!isSupabaseConfigured && (
        <p className="text-xs text-billboard-inkSoft mb-3">
          Online submissions are currently unavailable. Please use WhatsApp ({WHATSAPP_NUMBER_DISPLAY}) instead.
        </p>
      )}

      <Button type="submit" variant="primary" size="md" disabled={sending || !isSupabaseConfigured || !complete} className="w-full">
        {sending ? "Sending…" : "See my readiness result"}
      </Button>
      {!complete && <p className="text-xs text-billboard-inkSoft mt-2">Answer all six questions to continue.</p>}
    </form>
  );
}

/** A short enquiry form (uses the existing "contact" form config) for consult bookings and partner applications. */
export function MessageForm({
  heading, intro, topics, topicLabel, messageLabel, placeholder, button, extras = [], initialTopic, initialMessage = "",
}: {
  heading: string; intro: string; topics: string[]; topicLabel: string; messageLabel: string; placeholder: string; button: string;
  extras?: { id: string; label: string; type?: "text" | "date" | "url"; options?: string[]; required?: boolean }[];
  initialTopic?: string;
  initialMessage?: string;
}) {
  const [extraValues, setExtraValues] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(initialTopic && topics.includes(initialTopic) ? initialTopic : topics[0]);
  const [message, setMessage] = useState(initialMessage);
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLikelyBot, wrapperProps } = useHoneypot();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLikelyBot(website)) {
      setSending(true);
      setTimeout(() => { setSending(false); setSent(true); }, 400);
      return;
    }
    setSending(true);
    setError(null);
    try {
      const result = await submitPublicForm("contact", { name, email, message: `[${heading}] ${topic}\n${extras.filter((x) => extraValues[x.id]).map((x) => `${x.label}: ${extraValues[x.id]}`).join("\n")}\n\n${message}` });
      if (!result.ok) setError(result.error ?? "Something went wrong. Please try again.");
      else setSent(true);
    } catch {
      setError("We couldn't send your message. Please try WhatsApp or email instead.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="border-[3px] border-billboard-greenDeep bg-[#EAF3EC] text-billboard-greenDeep rounded-lg p-7">
        <h2 className="font-bold text-xl mb-1">Message sent.</h2>
        <p className="text-sm">Thanks, {name.split(" ")[0] || "there"}. A person will get back to you directly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-[3px] border-billboard-ink rounded-lg p-6 md:p-7 bg-white text-billboard-ink shadow-blockSm">
      <h2 className="font-display text-2xl mb-1">{heading}</h2>
      <p className="text-sm text-billboard-inkSoft mb-6">{intro}</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="mf-name" className={LABEL}>Name</label>
          <input id="mf-name" required value={name} onChange={(e) => setName(e.target.value)} className={INPUT} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="mf-email" className={LABEL}>Email</label>
          <input id="mf-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} autoComplete="email" />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="mf-topic" className={LABEL}>{topicLabel}</label>
        <select id="mf-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={INPUT}>
          {topics.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      {extras.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {extras.map((x) => (
            <div key={x.id}>
              <label htmlFor={`mf-${x.id}`} className={LABEL}>{x.label}</label>
              {x.options ? (
                <select id={`mf-${x.id}`} required={x.required} value={extraValues[x.id] ?? ""} onChange={(e) => setExtraValues((v) => ({ ...v, [x.id]: e.target.value }))} className={INPUT}>
                  <option value="">Choose…</option>
                  {x.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input id={`mf-${x.id}`} type={x.type ?? "text"} required={x.required} value={extraValues[x.id] ?? ""} onChange={(e) => setExtraValues((v) => ({ ...v, [x.id]: e.target.value }))} className={INPUT} />
              )}
            </div>
          ))}
        </div>
      )}
      <div className="mb-5">
        <label htmlFor="mf-message" className={LABEL}>{messageLabel}</label>
        <textarea id="mf-message" required minLength={10} rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={placeholder} className={`${INPUT} resize-y`} />
      </div>
      <div {...wrapperProps}>
        <label htmlFor="mf-website">Leave this field empty</label>
        <input id="mf-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {error && <p role="alert" className="text-billboard-red text-xs font-semibold mb-3">{error}</p>}
      {!isSupabaseConfigured && (
        <p className="text-xs text-billboard-inkSoft mb-3">
          Online submissions are currently unavailable. Please{" "}
          <a href={whatsappLink("Hi, I'd like help with tenders and compliance")} className="underline font-semibold">use WhatsApp</a> instead.
        </p>
      )}
      <Button type="submit" variant="primary" size="md" disabled={sending || !isSupabaseConfigured} className="w-full">
        {sending ? "Sending…" : button}
      </Button>
    </form>
  );
}
