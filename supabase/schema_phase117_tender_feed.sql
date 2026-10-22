-- Phase 117: tender feed, subscriptions and deadline reminders.
-- NOT APPLIED. Review, then run in the Supabase SQL editor (or supabase db push).
-- Data source: National Treasury eTender OCDS API (PDDL licence). Coverage is
-- incomplete by design (municipalities / SOEs only if they share), so the UI
-- must say so and always link to the original source.

create table if not exists public.tenders (
  ocid text primary key,
  title text not null,
  description text,
  buyer_name text,
  province text,
  category text,
  closing_at timestamptz,
  published_at timestamptz,
  source_url text,
  raw jsonb,
  updated_at timestamptz not null default now()
);
create index if not exists tenders_closing_idx on public.tenders (closing_at);
create index if not exists tenders_published_idx on public.tenders (published_at desc);

create table if not exists public.tender_sync_state (
  id int primary key default 1 check (id = 1),
  last_synced_to timestamptz,
  last_run_at timestamptz,
  last_status text,
  last_count int
);
insert into public.tender_sync_state (id) values (1) on conflict do nothing;

-- Subscriptions: minimum personal data (email and optional WhatsApp number).
create table if not exists public.tender_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  whatsapp_number text,
  whatsapp_consent boolean not null default false,
  keywords text[] not null default '{}',
  provinces text[] not null default '{}',
  unsubscribe_token uuid not null default gen_random_uuid(),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (email)
);

-- One reminder per subscriber per tender per offset, so nothing is sent twice.
create table if not exists public.tender_reminders_sent (
  subscription_id uuid not null references public.tender_subscriptions(id) on delete cascade,
  ocid text not null references public.tenders(ocid) on delete cascade,
  days_before int not null,
  channel text not null check (channel in ('email','whatsapp')),
  sent_at timestamptz not null default now(),
  primary key (subscription_id, ocid, days_before, channel)
);

alter table public.tenders enable row level security;
alter table public.tender_sync_state enable row level security;
alter table public.tender_subscriptions enable row level security;
alter table public.tender_reminders_sent enable row level security;

-- Tenders are public information: anyone may read. Writes are service role only.
drop policy if exists tenders_public_read on public.tenders;
create policy tenders_public_read on public.tenders for select using (true);

-- Subscriptions contain personal data: admins only. Edge Functions use the service role.
drop policy if exists tender_subscriptions_admin on public.tender_subscriptions;
create policy tender_subscriptions_admin on public.tender_subscriptions
  for select using (public.is_admin());

drop policy if exists tender_sync_state_admin on public.tender_sync_state;
create policy tender_sync_state_admin on public.tender_sync_state
  for select using (public.is_admin());

drop policy if exists tender_reminders_admin on public.tender_reminders_sent;
create policy tender_reminders_admin on public.tender_reminders_sent
  for select using (public.is_admin());

revoke all on public.tender_subscriptions from anon, authenticated;
revoke all on public.tender_reminders_sent from anon, authenticated;
revoke all on public.tender_sync_state from anon, authenticated;
grant select on public.tenders to anon, authenticated;
