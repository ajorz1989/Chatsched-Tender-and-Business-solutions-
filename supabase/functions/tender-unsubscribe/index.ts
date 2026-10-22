// One-click unsubscribe. GET/POST ?token=<uuid>. Deactivates and removes the WhatsApp number.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const ok = /^[0-9a-f-]{36}$/i.test(token);
  if (ok) {
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await admin.from("tender_subscriptions").update({ active: false, whatsapp_number: null, whatsapp_consent: false }).eq("unsubscribe_token", token);
  }
  const msg = ok ? "You are unsubscribed. No more tender alerts will be sent." : "This unsubscribe link is not valid.";
  return new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ChatSched</title><body style="font-family:system-ui;background:#FAF9F5;color:#1A1712;max-width:32rem;margin:4rem auto;padding:0 1rem"><h1>ChatSched</h1><p>${msg}</p>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
});
