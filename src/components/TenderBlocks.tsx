import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Shared building blocks for the Tender & Consult Suite pages. They reuse the
 * existing section, card, eyebrow and brand-button patterns exactly; nothing
 * here introduces a new style. The mascot is deliberately not used.
 */

type Tone = "white" | "dim" | "ink" | "yellow" | "green";

const TONE: Record<Tone, string> = {
  white: "bg-white",
  dim: "bg-billboard-paperDim",
  ink: "bg-billboard-ink text-billboard-paper",
  yellow: "bg-billboard-yellow",
  green: "bg-billboard-green text-white",
};

export function CtaLink({ to, children, variant = "" }: { to: string; children: ReactNode; variant?: "" | "dark" | "yellow" | "light" }) {
  return (
    <Link to={to} className={`brand-button ${variant}`.trim()}>
      {children}
    </Link>
  );
}

/** A quiet text link for actions that should not compete with the main buttons. */
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="font-bold underline underline-offset-4 decoration-2 hover:no-underline">
      {children}
    </Link>
  );
}

export function TenderHero({
  eyebrow, title, subtitle, children, footer, aside,
}: { eyebrow: string; title: string; subtitle: string; children?: ReactNode; footer?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="py-12 md:py-24 bg-billboard-yellow border-b-[3px] border-billboard-ink">
      <div className="max-w-6xl mx-auto px-5">
        <div className={aside ? "grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 items-center" : ""}>
          <div>
            <span className="eyebrow on-yellow">{eyebrow}</span>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-4 max-w-4xl">{title}</h1>
            <p className="text-lg max-w-2xl mb-7">{subtitle}</p>
            {children && <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">{children}</div>}
            {footer && <p className="mt-5 text-sm">{footer}</p>}
          </div>
          {aside && <div className="hidden md:block">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export function TenderSection({
  tone = "white", eyebrow, title, intro, children,
}: { tone?: Tone; eyebrow?: string; title?: string; intro?: string; children?: ReactNode }) {
  const dark = tone === "ink" || tone === "green";
  const eyebrowCls = dark ? "light" : tone === "yellow" ? "on-yellow" : "";
  return (
    <section className={`py-16 md:py-24 border-b-[3px] border-billboard-ink ${TONE[tone]}`}>
      <div className="max-w-6xl mx-auto px-5">
        {(eyebrow || title || intro) && (
          <div className="max-w-3xl mb-8 md:mb-10">
            {eyebrow && <span className={`eyebrow ${eyebrowCls}`.trim()}>{eyebrow}</span>}
            {title && <h2 className="text-3xl md:text-5xl leading-[1.1] mb-3">{title}</h2>}
            {intro && <p className={`max-w-prose ${dark ? "text-billboard-paperDim" : "text-billboard-inkSoft"}`}>{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export interface CardItem {
  title: string;
  body: ReactNode;
  to?: string;
  tag?: string;
  /** Optional tick list shown under the body (for example, what a package includes). */
  list?: string[];
}

export function CardGrid({ items, numbered = false, cols = 3 }: { items: CardItem[]; numbered?: boolean; cols?: 2 | 3 | 4 }) {
  const grid = cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  // Only steps that really are in order are announced as a numbered list.
  const List = numbered ? "ol" : "ul";
  return (
    <List className={`grid ${grid} gap-4 list-none p-0 m-0`}>
      {items.map((item, i) => {
        const inner = (
          <>
            {numbered && (
              <span
                className="inline-flex w-10 h-10 items-center justify-center rounded-md bg-billboard-yellow border-2 border-billboard-ink font-display text-lg mb-4 self-start text-billboard-ink"
                aria-hidden="true"
              >
                {i + 1}
              </span>
            )}
            {item.tag && <span className="font-mono text-xs font-bold uppercase text-billboard-greenDeep mb-2">{item.tag}</span>}
            <h3 className="font-display text-xl mb-2">{item.title}</h3>
            <p className={`text-sm text-billboard-inkSoft leading-relaxed ${item.list ? "" : "flex-1"}`}>{item.body}</p>
            {item.list && (
              <ul className="mt-3 flex-1 grid gap-1.5 list-none p-0 m-0 text-sm text-billboard-inkSoft">
                {item.list.map((entry) => (
                  <li key={entry} className="flex gap-2">
                    <span aria-hidden="true" className="font-display text-billboard-greenDeep">✓</span>
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            )}
            {item.to && <span className="font-bold text-sm mt-4">Learn more →</span>}
          </>
        );
        const cls = "border-2 border-billboard-ink rounded-xl p-6 bg-white text-billboard-ink shadow-blockSm flex flex-col";
        return (
          <li key={item.title} className="flex">
            {item.to ? (
              <Link to={item.to} className={`${cls} w-full hover:-translate-y-1 transition`}>{inner}</Link>
            ) : (
              <div className={`${cls} w-full`}>{inner}</div>
            )}
          </li>
        );
      })}
    </List>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-3 list-none p-0 m-0">
      {items.map((item) => (
        <li key={item} className="flex gap-3 border-2 border-billboard-ink rounded-lg bg-white p-4 text-sm text-billboard-ink">
          <span aria-hidden="true" className="font-display text-billboard-greenDeep">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border-[3px] border-billboard-ink rounded-lg bg-white text-billboard-ink">
      <table className="w-full text-sm text-left">
        <thead className="bg-billboard-ink text-billboard-paper">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-mono text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t-2 border-billboard-ink/15 align-top">
              {row.map((cell, i) => (
                <td key={`${row[0]}-${i}`} className={`px-4 py-3 ${i === 0 ? "font-bold" : "text-billboard-inkSoft"}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HonestNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 border-l-[6px] border-billboard-ink bg-billboard-paperDim text-billboard-ink rounded-r-lg px-5 py-4 text-sm max-w-3xl">
      <span className="font-bold">Honest note: </span>
      {children}
    </p>
  );
}

export function TenderCta({ title, body, to, label, secondaryTo, secondaryLabel }: {
  title: string; body: string; to: string; label: string; secondaryTo?: string; secondaryLabel?: string;
}) {
  return (
    <section aria-label="Next step" className="py-16 md:py-24 bg-billboard-green text-white border-b-[3px] border-billboard-ink">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <h2 className="font-display text-3xl md:text-5xl leading-tight mb-4">{title}</h2>
        <p className="text-white/90 max-w-prose mx-auto mb-8">{body}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <CtaLink to={to} variant="yellow">{label}</CtaLink>
          {secondaryTo && secondaryLabel && <CtaLink to={secondaryTo} variant="light">{secondaryLabel}</CtaLink>}
        </div>
      </div>
    </section>
  );
}
