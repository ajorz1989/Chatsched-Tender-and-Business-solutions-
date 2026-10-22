// Public sign-up for tender alerts. Minimal data: email, optional WhatsApp number (only with consent).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { checkAndRecordSubmission, extractClientIp } from "../_shared/publicFormRateLimit.ts";

const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (a: unknown, max: number) => (Array.isArray(a) ? a : []).filter((x) => typeof x === "string").map((x) => x.trim().slice(0, 60)).filter(Boolean).slice(0, max);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: "Invalid request" }, 400); }
  if (typeof body.website === "string" && body.website) return json({ ok: true }); // honeypot

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) return json({ error: "Please enter a valid email address." }, 400);

  const wantsWa = body.whatsapp_consent === true;
  let wa: string | null = null;
  if (wantsWa) {
    const n = typeof body.whatsapp_number === "string" ? body.whatsapp_number.replace(/[\s-]/g, "") : "";
    if (!/^\+?\d{9,15}$/.test(n)) return json({ error: "Please enter a valid WhatsApp number." }, 400);
    wa = n.startsWith("+") ? n.slice(1) : n.startsWith("0") ? `27${n.slice(1)}` : n;
  }

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const rl = await checkAndRecordSubmission(admin, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    form: "tender_subscribe", ip: extractClientIp(req), email,
    perIpLimit: 8, perIpWindowMinutes: 60, perEmailLimit: 3, perEmailWindowMinutes: 1440,
  });
  if (!rl.allowed) return json({ error: rl.reason ?? "Too many requests. Please try later." }, 429);

  const { error } = await admin.from("tender_subscriptions").upsert(
    { email, whatsapp_number: wa, whatsapp_consent: wantsWa && !!wa, keywords: clean(body.keywords, 10), provinces: clean(body.provinces, 9), active: true },
    { onConflict: "email" },
  );
  if (error) return json({ error: "Could not save. Please try again." }, 500);
  return json({ ok: true });
});
