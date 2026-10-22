import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { TenderHero, TenderSection, HonestNote, TenderCta } from "../components/TenderBlocks";

const INPUT = "w-full border-2 border-billboard-ink rounded px-3 py-2.5 bg-white text-billboard-ink";
const LABEL = "block text-sm font-semibold mb-1.5";
const CARD = "border-[3px] border-billboard-ink rounded-lg bg-white text-billboard-ink p-6 shadow-blockSm";

/* ------------------------------------------------------------------ helpers */

function parseDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function startOfToday(): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

function fmt(d: Date): string {
  return d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function isoCompact(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

/** Moves back n working days (Mon to Fri). Public holidays are not accounted for. */
function subtractWorkingDays(d: Date, n: number): Date {
  let cur = d;
  let left = n;
  while (left > 0) {
    cur = addDays(cur, -1);
    const day = cur.getDay();
    if (day !== 0 && day !== 6) left -= 1;
  }
  return cur;
}

function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be blocked; the tool still works for this visit.
  }
}

/* ------------------------------------------------------------ expiry tracker */

const EXPIRY_ITEMS = [
  { id: "tax", label: "Tax compliance status (SARS)" },
  { id: "bbbee", label: "B-BBEE affidavit or certificate" },
  { id: "csd", label: "Supplier database registration (CSD)" },
] as const;

function expiryStatus(days: number): { label: string; cls: string } {
  if (days < 0) return { label: "Expired", cls: "bg-billboard-red text-white" };
  if (days <= 30) return { label: "Renew now", cls: "bg-billboard-red text-white" };
  if (days <= 60) return { label: "Renew soon", cls: "bg-billboard-yellow" };
  return { label: "Looks fine", cls: "bg-white" };
}

function buildIcs(dates: Record<string, string>): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ChatSched//Expiry tracker//EN"];
  EXPIRY_ITEMS.forEach((item) => {
    const d = parseDate(dates[item.id] ?? "");
    if (!d) return;
    const events: [string, Date][] = [
      [`Renew soon: ${item.label} expires in 30 days`, addDays(d, -30)],
      [`Expires today: ${item.label}`, d],
    ];
    events.forEach(([summary, when], i) => {
      lines.push(
        "BEGIN:VEVENT",
        `UID:${item.id}-${i}-${isoCompact(d)}@chatsched.com`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${isoCompact(when)}`,
        `DTEND;VALUE=DATE:${isoCompact(addDays(when, 1))}`,
        `SUMMARY:${summary}`,
        "END:VEVENT",
      );
    });
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function ExpiryTracker() {
  const [dates, setDates] = useState<Record<string, string>>({});

  useEffect(() => {
    setDates(readStore<Record<string, string>>("chatsched.expiry", {}));
  }, []);

  function update(id: string, value: string) {
    const next = { ...dates, [id]: value };
    setDates(next);
    writeStore("chatsched.expiry", next);
  }

  const today = startOfToday();
  const any = EXPIRY_ITEMS.some((i) => parseDate(dates[i.id] ?? ""));

  function download() {
    const blob = new Blob([buildIcs(dates)], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chatsched-expiry-reminders.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  const mailBody = EXPIRY_ITEMS.map((i) => {
    const d = parseDate(dates[i.id] ?? "");
    return d ? `${i.label}: expires ${fmt(d)}` : null;
  }).filter(Boolean).join("\n");

  return (
    <div className={CARD}>
      <h3 className="font-display text-xl mb-1">Expiry date tracker</h3>
      <p className="text-sm text-billboard-inkSoft mb-5">
        Add the dates your papers expire. We never see them: they stay in this browser, and we store no documents.
      </p>
      <div className="space-y-4 mb-5">
        {EXPIRY_ITEMS.map((item) => {
          const d = parseDate(dates[item.id] ?? "");
          const status = d ? expiryStatus(daysBetween(today, d)) : null;
          return (
            <div key={item.id} className="grid sm:grid-cols-[1fr_auto] gap-3 items-end">
              <div>
                <label htmlFor={`exp-${item.id}`} className={LABEL}>{item.label}: expiry date</label>
                <input id={`exp-${item.id}`} type="date" value={dates[item.id] ?? ""} onChange={(e) => update(item.id, e.target.value)} className={INPUT} />
              </div>
              {d && status && (
                <span className={`font-mono text-xs font-bold uppercase border-2 border-billboard-ink rounded px-3 py-2.5 ${status.cls}`}>
                  {status.label} · {daysBetween(today, d)} days
                </span>
              )}
            </div>
          );
        })}
      </div>
      {any && (
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={download} className="brand-button dark">Add reminders to my calendar (.ics)</button>
          <a className="brand-button light" href={`mailto:?subject=${encodeURIComponent("My tender paperwork expiry dates")}&body=${encodeURIComponent(mailBody)}`}>Email these dates to myself</a>
        </div>
      )}
      <p className="text-xs text-billboard-inkSoft mt-4">
        Renewal rules and timing differ for each document. Check with the issuer or a qualified partner.
      </p>
    </div>
  );
}

/* ------------------------------------------------- preference points what-if */

// Preference points for B-BBEE status level under the Preferential Procurement
// Regulations, 2022 (in force until the new Public Procurement Act commences).
// Verify against the current regulations before relying on this table.
const POINTS_8020 = [20, 18, 14, 12, 8, 6, 4, 2, 0];
const POINTS_9010 = [10, 9, 6, 5, 4, 3, 2, 1, 0];
const LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8", "Non-compliant"];

function priceScore(total: number, price: number, lowest: number): number {
  if (!(lowest > 0) || !(price > 0)) return 0;
  return Math.max(0, total * (1 - (price - lowest) / lowest));
}

function PointsCalculator() {
  const [system, setSystem] = useState<"80/20" | "90/10">("80/20");
  const [myPrice, setMyPrice] = useState("");
  const [rivalPrice, setRivalPrice] = useState("");
  const [myLevel, setMyLevel] = useState(0);
  const [rivalLevel, setRivalLevel] = useState(0);

  const priceTotal = system === "80/20" ? 80 : 90;
  const table = system === "80/20" ? POINTS_8020 : POINTS_9010;
  const mine = Number(myPrice);
  const rival = Number(rivalPrice);
  const lowest = mine > 0 && rival > 0 ? Math.min(mine, rival) : 0;
  const ready = lowest > 0;

  const myPricePts = priceScore(priceTotal, mine, lowest);
  const rivalPricePts = priceScore(priceTotal, rival, lowest);
  const myTotal = myPricePts + table[myLevel];
  const rivalTotal = rivalPricePts + table[rivalLevel];

  return (
    <div className={CARD}>
      <h3 className="font-display text-xl mb-1">Preference points what-if (80/20 and 90/10)</h3>
      <p className="text-sm text-billboard-inkSoft mb-5">
        See how price and B-BBEE level can change a score. This compares two bids only, so it is a learning tool, not a prediction.
      </p>
      <div className="mb-4">
        <label htmlFor="pts-system" className={LABEL}>Scoring system in the tender</label>
        <select id="pts-system" value={system} onChange={(e) => setSystem(e.target.value as "80/20" | "90/10")} className={INPUT}>
          <option value="80/20">80/20 (price 80, preference 20)</option>
          <option value="90/10">90/10 (price 90, preference 10)</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        {[
          { id: "me", title: "Your bid", price: myPrice, setPrice: setMyPrice, level: myLevel, setLevel: setMyLevel },
          { id: "rival", title: "Another bidder", price: rivalPrice, setPrice: setRivalPrice, level: rivalLevel, setLevel: setRivalLevel },
        ].map((b) => (
          <fieldset key={b.id} className="border-2 border-billboard-ink rounded-lg p-4">
            <legend className="px-2 font-bold text-sm">{b.title}</legend>
            <label htmlFor={`pts-${b.id}-price`} className={LABEL}>Price (rand, including VAT)</label>
            <input id={`pts-${b.id}-price`} type="number" min="0" inputMode="decimal" value={b.price} onChange={(e) => b.setPrice(e.target.value)} className={`${INPUT} mb-3`} />
            <label htmlFor={`pts-${b.id}-level`} className={LABEL}>B-BBEE status level</label>
            <select id={`pts-${b.id}-level`} value={b.level} onChange={(e) => b.setLevel(Number(e.target.value))} className={INPUT}>
              {LEVELS.map((l, i) => <option key={l} value={i}>{l === "Non-compliant" ? l : `Level ${l}`}</option>)}
            </select>
          </fieldset>
        ))}
      </div>
      {ready ? (
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="border-2 border-billboard-ink rounded-lg p-4 bg-billboard-paperDim">
            <p className="font-bold">Your bid: {myTotal.toFixed(1)} points</p>
            <p className="text-billboard-inkSoft">Price {myPricePts.toFixed(1)} + preference {table[myLevel]}</p>
          </div>
          <div className="border-2 border-billboard-ink rounded-lg p-4 bg-billboard-paperDim">
            <p className="font-bold">Other bidder: {rivalTotal.toFixed(1)} points</p>
            <p className="text-billboard-inkSoft">Price {rivalPricePts.toFixed(1)} + preference {table[rivalLevel]}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-billboard-inkSoft">Enter both prices to see the points.</p>
      )}
      <p className="text-xs text-billboard-inkSoft mt-4">
        Based on the price formula 80 (or 90) x [1 - (price - lowest price) / lowest price] and the preference points for B-BBEE level in the Preferential Procurement Regulations of 2022, which apply until the new Public Procurement Act comes into operation. Regulations change and a tender may add rules such as specific goals, so always check the tender document.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------- deadline planner */

function DeadlinePlanner() {
  const [closing, setClosing] = useState("");
  const [workDays, setWorkDays] = useState("5");

  const close = parseDate(closing);
  const work = Math.max(1, Math.min(60, Math.floor(Number(workDays)) || 1));
  const today = startOfToday();

  const plan = close
    ? [
        { label: "Start working on the bid", date: subtractWorkingDays(close, work + 2) },
        { label: "Send clarification questions (earlier is safer; check the cut-off in the tender)", date: subtractWorkingDays(close, work + 2 - Math.ceil(work / 3)) },
        { label: "All documents and forms ready for checking", date: subtractWorkingDays(close, 3) },
        { label: "Final check and sign-off", date: subtractWorkingDays(close, 2) },
        { label: "Submit, leaving a safety buffer", date: subtractWorkingDays(close, 1) },
        { label: "Closing date", date: close },
      ]
    : [];

  return (
    <div className={CARD}>
      <h3 className="font-display text-xl mb-1">Deadline planner</h3>
      <p className="text-sm text-billboard-inkSoft mb-5">
        Work backwards from the closing date. This is our suggested plan, not the buyer's rules.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label htmlFor="dl-close" className={LABEL}>Closing date</label>
          <input id="dl-close" type="date" value={closing} onChange={(e) => setClosing(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label htmlFor="dl-work" className={LABEL}>Working days you need to prepare</label>
          <input id="dl-work" type="number" min="1" max="60" value={workDays} onChange={(e) => setWorkDays(e.target.value)} className={INPUT} />
        </div>
      </div>
      {close && (
        <>
          <ol className="space-y-2 list-none p-0 m-0">
            {plan.map((step) => (
              <li key={step.label} className="flex flex-wrap gap-x-3 border-2 border-billboard-ink rounded-lg p-3 text-sm">
                <span className="font-bold min-w-[11rem]">{fmt(step.date)}</span>
                <span className="text-billboard-inkSoft flex-1">{step.label}</span>
              </li>
            ))}
          </ol>
          {plan[0].date < today && (
            <p role="alert" className="text-billboard-red text-sm font-semibold mt-3">
              The start date has already passed. Cut the scope, get help, or consider skipping this one.
            </p>
          )}
          <p className="text-xs text-billboard-inkSoft mt-3">Weekends are skipped. Public holidays are not.</p>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ glossary */

const GLOSSARY: [string, string][] = [
  ["B-BBEE", "Broad-Based Black Economic Empowerment. Buyers score bids partly on it, and proof comes as an affidavit or a certificate depending on your size."],
  ["Bid or tender", "A formal offer to supply goods or services to a buyer, usually on a set of standard documents."],
  ["CIDB", "Construction Industry Development Board. It grades contractors for public construction work."],
  ["CIPC", "Companies and Intellectual Property Commission. It registers companies and keeps their records."],
  ["Clarification questions", "Questions you send the buyer before the cut-off set in the tender. Answers are usually shared with all bidders."],
  ["Compulsory briefing", "A meeting you must attend to be allowed to bid. Missing it can disqualify you."],
  ["CSD", "Central Supplier Database. The national list of suppliers that government buyers use."],
  ["PFMA and MFMA", "The Public Finance Management Act and the Municipal Finance Management Act. They set spending rules for national and provincial bodies, and municipalities."],
  ["PPPFA", "Preferential Procurement Policy Framework Act. It sets the preference points rules for public buying."],
  ["Preference points (80/20, 90/10)", "Scoring systems where price earns most of the points and preference goals earn the rest."],
  ["RFQ", "Request for Quotation. Usually a smaller purchase where price is the main factor."],
  ["SBD forms", "Standard Bidding Documents forms used in many government bids, such as the invitation to bid, pricing schedule, declarations and preference claim."],
  ["Tax compliance status", "SARS confirmation that your tax affairs are in order. Buyers can usually verify it online."],
];

function Glossary() {
  return (
    <div className={CARD}>
      <h3 className="font-display text-xl mb-4">Tender glossary</h3>
      <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        {GLOSSARY.map(([term, def]) => (
          <div key={term}>
            <dt className="font-bold">{term}</dt>
            <dd className="text-billboard-inkSoft">{def}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------------------------------------------------------------------- page */

export default function Tools() {
  return (
    <>
      <Seo
        title="Free Tender Tools | ChatSched"
        description="Free tools for South African bidders: an expiry date tracker, a preference points what-if, a deadline planner and a tender glossary."
      />
      <TenderHero
        eyebrow="Free tools"
        title="Free tender tools. No sign-up."
        subtitle="Four small tools that save you from avoidable mistakes."
      >
        <a href="#expiry" className="brand-button dark">Expiry tracker</a>
        <a href="#points" className="brand-button light">Points what-if</a>
        <a href="#planner" className="brand-button light">Deadline planner</a>
        <a href="#glossary" className="brand-button light">Glossary</a>
      </TenderHero>

      <TenderSection tone="dim">
        <div className="space-y-8 max-w-4xl">
          <div id="expiry" className="scroll-mt-24"><ExpiryTracker /></div>
          <div id="points" className="scroll-mt-24"><PointsCalculator /></div>
          <div id="planner" className="scroll-mt-24"><DeadlinePlanner /></div>
          <div id="glossary" className="scroll-mt-24"><Glossary /></div>
        </div>
        <HonestNote>
          These tools are guides, not legal, tax or accounting advice. Rules change and every tender is different. The tender document is always the official source. Want a person to check your numbers? <Link to="/consult" className="underline font-semibold">Book a session</Link>.
        </HonestNote>
      </TenderSection>

      <TenderCta title="Want to know what's missing?" body="The free readiness check gives you a score and a to-do list." to="/tender-readiness" label="Start the check" />
    </>
  );
}
