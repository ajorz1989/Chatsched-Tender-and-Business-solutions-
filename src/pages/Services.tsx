import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { TenderHero, TenderSection, CardGrid, HonestNote, TenderCta } from "../components/TenderBlocks";
import { BUNDLES, CATALOG, CATEGORIES, PHASE_LABEL, PHASE_NOTE } from "../lib/serviceCatalog";

const PHASE_STYLE = {
  1: "bg-billboard-yellow",
  2: "bg-white",
  3: "bg-billboard-paperDim",
} as const;

export default function Services() {
  const [category, setCategory] = useState<string>("All");
  const items = category === "All" ? CATALOG : CATALOG.filter((i) => i.category === category);

  return (
    <>
      <Seo
        title="All Services | ChatSched Tender & Consult Suite"
        description="Every tender, bid, compliance, funding, coaching and supplier-marketing service ChatSched offers or is building, and who delivers each one."
      />
      <TenderHero
        eyebrow="All services"
        title="Everything we offer, and what's coming."
        subtitle="Some services you can request today. Others open after our first clients or need a qualified partner first. We label each one honestly."
      />

      <TenderSection tone="white" eyebrow="Packages" title="Buy one package, not ten sessions.">
        <CardGrid
          items={BUNDLES.map((b) => ({
            title: b.title,
            body: `${b.body} Includes: ${b.includes.join(", ")}.`,
          }))}
        />
        <HonestNote>Package prices are quoted before you pay. We do not show prices until we have tested them with real businesses.</HonestNote>
      </TenderSection>

      <TenderSection tone="dim" eyebrow="The full list" title="Find the help you need.">
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by category">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
              className={`border-2 border-billboard-ink rounded px-3 py-2 text-sm font-semibold ${category === cat ? "bg-billboard-yellow" : "bg-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="grid md:grid-cols-2 gap-3 list-none p-0 m-0">
          {items.map((item) => (
            <li key={item.name} className="border-2 border-billboard-ink rounded-xl bg-white p-5 flex flex-col text-billboard-ink shadow-blockSm">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`font-mono text-[11px] font-bold uppercase border-2 border-billboard-ink rounded px-2 py-0.5 ${PHASE_STYLE[item.phase]}`}>
                  {PHASE_LABEL[item.phase]}
                </span>
                <span className="font-mono text-[11px] uppercase text-billboard-inkSoft">{item.category}</span>
              </div>
              <h3 className="font-display text-lg mb-1">{item.name}</h3>
              <p className="text-sm text-billboard-inkSoft mb-1">Delivered by: <strong className="text-billboard-ink">{item.by}</strong></p>
              <p className="text-xs text-billboard-inkSoft mb-4 flex-1">{PHASE_NOTE[item.phase]}</p>
              <Link
                to={`/consult?service=${encodeURIComponent(item.name)}`}
                className="font-bold text-sm underline underline-offset-4"
              >
                {item.phase === 1 ? "Request this →" : "Join the waiting list →"}
              </Link>
            </li>
          ))}
        </ul>

        <HonestNote>
          Where a partner delivers the work, the partner is independent, qualified for that work and responsible for it. Legal, tax, accounting, B-BBEE verification and CIDB work always stays with qualified partners. Insurance, guarantee and funding introductions may need licensed intermediaries, so we confirm that before we offer them. Prices are quoted before you pay.
        </HonestNote>
      </TenderSection>

      <TenderCta title="Not sure where to start?" body="The free readiness check shows what to do first." to="/tender-readiness" label="Start the check" secondaryTo="/consult" secondaryLabel="Free intro call" />
    </>
  );
}
