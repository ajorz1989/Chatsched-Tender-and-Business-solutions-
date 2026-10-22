import { useEffect, useState, type FormEvent } from "react";
import Seo from "../components/Seo";
import { TenderHero, TenderSection, HonestNote, CtaLink } from "../components/TenderBlocks";
import { TENDER_FEED_ENABLED } from "../lib/constants";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { useHoneypot } from "../hooks/useHoneypot";

interface TenderRow {
  ocid: string;
  title: string;
  buyer_name: string | null;
  province: string | null;
  category: string | null;
  closing_at: string | null;
  source_url: string | null;
}

const PROVINCES = ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"];

function fmt(d: string | null) {
  return d ? new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "Not stated";
}

function Subscribe() {
  const [email, setEmail] = useState("");
  const [keywords, setKeywords] = useState("");
  const [province, setProvince] = useState("");
  const [wa, setWa] = useState(false);
  const [number, setNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const { isLikelyBot, wrapperProps } = useHoneypot();

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (isLikelyBot(website)) { setState("done"); return; }
    setState("sending");
    setError(null);
    const { error: err } = await supabase.functions.invoke("tender-subscribe", {
      body: {
        email,
        keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
        provinces: province ? [province] : [],
        whatsapp_consent: wa,
        whatsapp_number: wa ? number : undefined,
      },
    });
    if (err) { setError("We could not save your alert. Please check your details and try again."); setState("idle"); return; }
    setState("done");
  }

  if (state === "done") {
    return <p className="font-semibold">Done. You will get an email before matching tenders close. Every email has an unsubscribe link.</p>;
  }
  const input = "w-full border-2 border-billboard-ink rounded-lg px-3 py-2 bg-white";
  return (
    <form onSubmit={submit} className="grid gap-3 max-w-xl">
      <label className="grid gap-1 text-sm font-semibold">Email
        <input className={input} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm font-semibold">Keywords (optional, comma separated)
        <input className={input} value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="cleaning, catering, security" />
      </label>
      <label className="grid gap-1 text-sm font-semibold">Province (optional)
        <select className={input} value={province} onChange={(e) => setProvince(e.target.value)}>
          <option value="">Any</option>
          {PROVINCES.map((p) => <option key={p}>{p}</option>)}
        </select>
      </label>
      <label className="flex gap-2 text-sm items-start">
        <input type="checkbox" checked={wa} onChange={(e) => setWa(e.target.checked)} className="mt-1" />
        <span>Also remind me on WhatsApp. I agree ChatSched may message this number about tender deadlines.</span>
      </label>
      {wa && (
        <label className="grid gap-1 text-sm font-semibold">WhatsApp number
          <input className={input} inputMode="tel" required value={number} onChange={(e) => setNumber(e.target.value)} placeholder="082 123 4567" />
        </label>
      )}
      <div {...wrapperProps}>
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} aria-hidden="true" />
      </div>
      {error && <p role="alert" className="text-sm text-billboard-red">{error}</p>}
      <button type="submit" disabled={state === "sending"} className="brand-button dark justify-self-start">
        {state === "sending" ? "Saving…" : "Alert me"}
      </button>
      <p className="text-xs text-billboard-inkSoft">We only store what you enter here, for tender alerts. See our Privacy Policy.</p>
    </form>
  );
}

export default function TenderFeed() {
  const [rows, setRows] = useState<TenderRow[]>([]);
  const [q, setQ] = useState("");
  const [province, setProvince] = useState("");
  const [loading, setLoading] = useState(TENDER_FEED_ENABLED && isSupabaseConfigured);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!TENDER_FEED_ENABLED || !isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("tenders")
        .select("ocid,title,buyer_name,province,category,closing_at,source_url")
        .gte("closing_at", new Date().toISOString())
        .order("closing_at", { ascending: true })
        .limit(200);
      if (cancelled) return;
      if (error) setFailed(true); else setRows((data ?? []) as TenderRow[]);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const shown = rows.filter((r) => {
    if (province && r.province !== province) return false;
    const needle = q.trim().toLowerCase();
    return !needle || `${r.title} ${r.buyer_name ?? ""}`.toLowerCase().includes(needle);
  });

  return (
    <>
      <Seo title="Tender Feed | ChatSched" description="Open South African tenders from the national eTender portal, with deadline alerts." />
      <TenderHero eyebrow="Tender feed" title="Open tenders, with deadline alerts." subtitle="Public tenders shared on the national eTender portal. Not every buyer shares there, so this is not a full list." />
      {!TENDER_FEED_ENABLED ? (
        <TenderSection tone="white" title="The live feed is not switched on yet.">
          <p className="max-w-prose text-billboard-inkSoft mb-4">We are still setting it up. Until then, a person can search tenders for you.</p>
          <CtaLink to="/consult" variant="dark">Ask us to find tenders →</CtaLink>
        </TenderSection>
      ) : (
        <>
          <TenderSection tone="white" title="Open now">
            <div className="flex flex-wrap gap-3 mb-5">
              <input aria-label="Search tenders" className="border-2 border-billboard-ink rounded-lg px-3 py-2 bg-white" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
              <select aria-label="Province" className="border-2 border-billboard-ink rounded-lg px-3 py-2 bg-white" value={province} onChange={(e) => setProvince(e.target.value)}>
                <option value="">All provinces</option>
                {PROVINCES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            {loading && <p>Loading…</p>}
            {failed && <p role="alert">We could not load tenders right now. Please try again later.</p>}
            {!loading && !failed && shown.length === 0 && <p>No open tenders match.</p>}
            <ul className="grid gap-3">
              {shown.map((r) => (
                <li key={r.ocid} className="border-2 border-billboard-ink rounded-lg bg-white p-4">
                  <p className="font-bold">{r.title}</p>
                  <p className="text-sm text-billboard-inkSoft">{r.buyer_name ?? "Buyer not stated"} · {r.province ?? "Province not stated"} · Closes {fmt(r.closing_at)}</p>
                  <a href={r.source_url ?? "https://www.etenders.gov.za/"} target="_blank" rel="noopener noreferrer" className="text-sm underline font-semibold">View original source</a>
                </li>
              ))}
            </ul>
            <HonestNote>Information is a convenience and can be incomplete or late. The tender document is always the official source.</HonestNote>
          </TenderSection>
          <TenderSection tone="dim" eyebrow="Alerts" title="Get a reminder before it closes.">
            <Subscribe />
          </TenderSection>
        </>
      )}
    </>
  );
}
