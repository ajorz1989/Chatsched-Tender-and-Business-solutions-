// Pulls recent tenders from the National Treasury eTender OCDS API into public.tenders.
// Protected by a shared secret (header x-cron-secret = CRON_SECRET). Not scheduled until you do it.
// The API response shape is parsed defensively: duplicates, empty arrays and missing parties happen.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { verifyCronSecret } from "../_shared/auth.ts";

const API = "https://ocds-api.etenders.gov.za/api/OCDSReleases";
const PAGE_SIZE = 100;
const MAX_PAGES = 10;

// deno-lint-ignore no-explicit-any
type Any = any;

export function mapRelease(r: Any) {
  const ocid = typeof r?.ocid === "string" ? r.ocid : null;
  const tender = r?.tender ?? {};
  const title = typeof tender.title === "string" && tender.title.trim() ? tender.title.trim() : null;
  if (!ocid || !title) return null;
  const parties: Any[] = Array.isArray(r.parties) ? r.parties : [];
  const buyer = parties.find((p) => Array.isArray(p?.roles) && p.roles.includes("buyer"));
  const addr = buyer?.address ?? {};
  const end = tender?.tenderPeriod?.endDate;
  const closing = typeof end === "string" && !Number.isNaN(Date.parse(end)) ? new Date(end).toISOString() : null;
  const pub = typeof r.date === "string" && !Number.isNaN(Date.parse(r.date)) ? new Date(r.date).toISOString() : null;
  return {
    ocid,
    title: title.slice(0, 500),
    description: typeof tender.description === "string" ? tender.description.slice(0, 4000) : null,
    buyer_name: (buyer?.name ?? r?.buyer?.name ?? null),
    province: addr.region ?? null,
    category: tender.mainProcurementCategory ?? null,
    closing_at: closing,
    published_at: pub,
    source_url: `https://www.etenders.gov.za/`,
    raw: null,
    updated_at: new Date().toISOString(),
  };
}

Deno.serve(async (req) => {
  const cors = corsHeaders;
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (!verifyCronSecret(req.headers.get("x-cron-secret"), Deno.env.get("CRON_SECRET"))) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...cors, "Content-Type": "application/json" } });
  }
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: state } = await admin.from("tender_sync_state").select("last_synced_to").eq("id", 1).maybeSingle();
  const to = new Date();
  const from = state?.last_synced_to ? new Date(state.last_synced_to) : new Date(Date.now() - 14 * 86400000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  let total = 0;
  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const url = `${API}?PageNumber=${page}&PageSize=${PAGE_SIZE}&dateFrom=${fmt(from)}&dateTo=${fmt(to)}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`eTender API ${res.status}`);
      const body = await res.json();
      const releases: Any[] = Array.isArray(body?.releases) ? body.releases : [];
      if (releases.length === 0) break;
      const byOcid = new Map<string, NonNullable<ReturnType<typeof mapRelease>>>();
      for (const r of releases) {
        const m = mapRelease(r);
        if (m) byOcid.set(m.ocid, m); // dedupe within the page
      }
      const rows = [...byOcid.values()];
      if (rows.length) {
        const { error } = await admin.from("tenders").upsert(rows, { onConflict: "ocid" });
        if (error) throw new Error(error.message);
        total += rows.length;
      }
      if (releases.length < PAGE_SIZE) break;
    }
    await admin.from("tender_sync_state").update({ last_synced_to: to.toISOString(), last_run_at: new Date().toISOString(), last_status: "ok", last_count: total }).eq("id", 1);
    return new Response(JSON.stringify({ ok: true, upserted: total }), { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    await admin.from("tender_sync_state").update({ last_run_at: new Date().toISOString(), last_status: `error: ${msg}`.slice(0, 200) }).eq("id", 1);
    return new Response(JSON.stringify({ ok: false, error: msg }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
