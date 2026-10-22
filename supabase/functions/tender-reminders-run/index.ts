// Daily job: emails (and optionally WhatsApp) subscribers about matching tenders closing in 7, 3 or 1 days.
// Protected by x-cron-secret. WhatsApp is OFF unless WHATSAPP_REMINDERS_ENABLED=true AND a Meta-approved
// template is configured. Meta business verification must be fixed first.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { verifyCronSecret } from "../_shared/auth.ts";

const OFFSETS = [7, 3, 1];
// deno-lint-ignore no-explicit-any
type Any = any;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

export function matches(t: Any, sub: Any): boolean {
  const provs: string[] = sub.provinces ?? [];
  if (provs.length && !(t.province && provs.some((p) => t.province.toLowerCase().includes(p.toLowerCase())))) return false;
  const kws: string[] = sub.keywords ?? [];
  if (!kws.length) return true;
  const hay = `${t.title} ${t.description ?? ""} ${t.buyer_name ?? ""}`.toLowerCase();
  return kws.some((k) => hay.includes(k.toLowerCase()));
}

async function sendEmail(to: string, subject: string, html: string) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY missing");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: Deno.env.get("RESEND_FROM") ?? "ChatSched <noreply@chatsched.com>", to, subject, html }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
}

async function sendWhatsApp(to: string, title: string, days: number, closing: string) {
  const token = Deno.env.get("WHATSAPP_TOKEN");
  const phoneId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
  const template = Deno.env.get("WHATSAPP_REMINDER_TEMPLATE");
  if (!token || !phoneId || !template) throw new Error("WhatsApp not configured");
  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp", to, type: "template",
      template: { name: template, language: { code: "en" }, components: [{ type: "body", parameters: [
        { type: "text", text: title.slice(0, 120) }, { type: "text", text: String(days) }, { type: "text", text: closing },
      ] }] },
    }),
  });
  if (!res.ok) throw new Error(`WhatsApp ${res.status}`);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (!verifyCronSecret(req.headers.get("x-cron-secret"), Deno.env.get("CRON_SECRET"))) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const waOn = Deno.env.get("WHATSAPP_REMINDERS_ENABLED") === "true";
  const site = Deno.env.get("SITE_URL") ?? "https://chatsched.com";
  const fnBase = `${Deno.env.get("SUPABASE_URL")}/functions/v1`;

  const { data: subs } = await admin.from("tender_subscriptions").select("*").eq("active", true);
  let sent = 0, failed = 0;
  for (const days of OFFSETS) {
    const from = new Date(Date.now() + days * 86400000).toISOString();
    const to = new Date(Date.now() + (days + 1) * 86400000).toISOString();
    const { data: tenders } = await admin.from("tenders").select("*").gte("closing_at", from).lt("closing_at", to).limit(500);
    for (const t of tenders ?? []) {
      for (const sub of subs ?? []) {
        if (!matches(t, sub)) continue;
        const closing = new Date(t.closing_at).toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg", dateStyle: "medium", timeStyle: "short" });
        const channels: ("email" | "whatsapp")[] = ["email"];
        if (waOn && sub.whatsapp_consent && sub.whatsapp_number) channels.push("whatsapp");
        for (const channel of channels) {
          const { data: done } = await admin.from("tender_reminders_sent").select("ocid").eq("subscription_id", sub.id).eq("ocid", t.ocid).eq("days_before", days).eq("channel", channel).maybeSingle();
          if (done) continue;
          try {
            if (channel === "email") {
              await sendEmail(sub.email, `Tender closes in ${days} day${days === 1 ? "" : "s"}: ${t.title.slice(0, 80)}`,
                `<p>A tender matching your alert closes on <b>${esc(closing)}</b>.</p><p><b>${esc(t.title)}</b><br>${esc(t.buyer_name ?? "")}</p><p><a href="${esc(t.source_url ?? site)}">View the original source</a>. The tender document is the official source; always check it.</p><p style="font-size:12px;color:#4A4335">You get this because you subscribed at ${esc(site)}. <a href="${fnBase}/tender-unsubscribe?token=${sub.unsubscribe_token}">Unsubscribe</a></p>`);
            } else {
              await sendWhatsApp(sub.whatsapp_number, t.title, days, closing);
            }
            await admin.from("tender_reminders_sent").insert({ subscription_id: sub.id, ocid: t.ocid, days_before: days, channel });
            sent++;
          } catch (_e) { failed++; }
        }
      }
    }
  }
  return new Response(JSON.stringify({ ok: true, sent, failed, whatsapp: waOn }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
