-- =============================================================================
-- 001_init.sql — full content schema for the portfolio CMS.
--
-- Design notes
--  * Every table has RLS enabled with no policies. The app connects as the
--    table owner (which bypasses RLS), so anon/authenticated roles are denied
--    by default. This prevents accidental exposure through the Supabase REST
--    endpoint even if the anon key ever leaks.
--  * `date` columns are real dates; the query layer formats them with
--    to_char(date, 'YYYY-MM-DD') so the app keeps receiving plain strings.
--  * Rich bodies (`content`) are jsonb holding a Block[] union, validated on
--    write by lib/blocks.ts. See lib/blocks.ts for the exact shape.
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Shared trigger: keep updated_at honest
-- ---------------------------------------------------------------------------
create or replace function cms_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- site_settings — singleton profile row (id is pinned to 1)
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  id          int primary key default 1 check (id = 1),
  name        text not null,
  username    text not null,
  nickname    text not null default '',
  role        text not null default '',
  tagline     text not null default '',
  location    text not null default '',
  email       text not null default '',
  github      text not null default '',
  twitter     text not null default '',
  linkedin    text not null default '',
  updated_at  timestamptz not null default now()
);

-- name/username are the only NOT NULL columns without a default, so the
-- bootstrap row has to name them. Real values arrive with the seed.
insert into site_settings (id, name, username) values (1, '', '')
on conflict (id) do nothing;

drop trigger if exists site_settings_touch on site_settings;
create trigger site_settings_touch
  before update on site_settings
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- nav_items — header navigation
-- ---------------------------------------------------------------------------
create table if not exists nav_items (
  id        uuid primary key default gen_random_uuid(),
  href      text not null unique,
  label     text not null,
  position  int not null default 0,
  updated_at timestamptz not null default now()
);

drop trigger if exists nav_items_touch on nav_items;
create trigger nav_items_touch
  before update on nav_items
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- home_hero — the italic block under the <h1> on /
-- ---------------------------------------------------------------------------
create table if not exists home_hero (
  id                int primary key default 1 check (id = 1),
  updated_label     text not null default '',
  line_one          text not null default '',
  greeting          text not null default '',
  experience_prefix text not null default '',
  updated_at        timestamptz not null default now()
);

insert into home_hero (id) values (1) on conflict (id) do nothing;

drop trigger if exists home_hero_touch on home_hero;
create trigger home_hero_touch
  before update on home_hero
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- home_sections — the stacked sections on /
--   kind is an authoring hint for the admin UI; the page renders by key.
--     text     → <p>{body}</p>
--     heading  → no body, the page appends its own component
--     contact  → no body, the page appends the social/email block
-- ---------------------------------------------------------------------------
create table if not exists home_sections (
  id         uuid primary key default gen_random_uuid(),
  key        text not null unique,
  kind       text not null default 'text' check (kind in ('text', 'heading', 'contact')),
  title      text not null default '',
  body       text not null default '',
  position   int not null default 0,
  updated_at timestamptz not null default now()
);

drop trigger if exists home_sections_touch on home_sections;
create trigger home_sections_touch
  before update on home_sections
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- education — "Educated At" list
-- ---------------------------------------------------------------------------
create table if not exists education (
  id         uuid primary key default gen_random_uuid(),
  period     text not null default '',
  degree     text not null default '',
  school     text not null default '',
  gpa        text not null default '',
  predicate  text not null default '',
  position   int not null default 0,
  updated_at timestamptz not null default now()
);

drop trigger if exists education_touch on education;
create trigger education_touch
  before update on education
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- tech_items — pill lists
--   group_name 'experience' → "Tech Tools Experiences" on /
--   group_name 'stack'      → the floating tool list (was lib/tech.ts)
-- ---------------------------------------------------------------------------
create table if not exists tech_items (
  id         uuid primary key default gen_random_uuid(),
  group_name text not null default 'experience' check (group_name in ('experience', 'stack')),
  label      text not null,
  position   int not null default 0,
  updated_at timestamptz not null default now()
);

drop trigger if exists tech_items_touch on tech_items;
create trigger tech_items_touch
  before update on tech_items
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- journey_entries
-- ---------------------------------------------------------------------------
create table if not exists journey_entries (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  date         date not null default current_date,
  excerpt      text not null default '',
  read_minutes int not null default 1 check (read_minutes >= 0),
  content      jsonb not null default '[]'::jsonb,
  published    boolean not null default true,
  position     int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists journey_entries_touch on journey_entries;
create trigger journey_entries_touch
  before update on journey_entries
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  index_label text not null default '',
  title       text not null,
  year        text not null default '',
  role        text not null default '',
  tags        text[] not null default '{}',
  hook        text not null default '',
  content     jsonb not null default '[]'::jsonb,
  published   boolean not null default true,
  position    int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists projects_touch on projects;
create trigger projects_touch
  before update on projects
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- random_notes
-- ---------------------------------------------------------------------------
create table if not exists random_notes (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  title      text not null,
  date       date not null default current_date,
  text       text not null default '',
  content    jsonb not null default '[]'::jsonb,
  published  boolean not null default true,
  position   int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists random_notes_touch on random_notes;
create trigger random_notes_touch
  before update on random_notes
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- page_settings — one row per route that has its own copy
--   page_key: 'journey' | 'projects' | 'random' | 'not_found'
--
--   list_meta_format / detail_meta_format are templates rendered against the
--   entry's fields, e.g. "{date} · {readMinutes} min read" or
--   "{year} · {role} · {tags}". Available keys: date, readMinutes, year, role,
--   tags (already joined with the separator), title, indexLabel. Keys that are
--   empty for a given entry collapse away with their separator.
-- ---------------------------------------------------------------------------
create table if not exists page_settings (
  page_key           text primary key,
  seo_title          text not null default '',
  seo_description    text not null default '',
  heading            text not null default '',
  intro              text not null default '',
  back_label         text not null default '',
  back_href          text not null default '',
  all_label          text not null default '',
  list_meta_format   text not null default '',
  detail_meta_format text not null default '',
  empty_message      text not null default '',
  updated_at         timestamptz not null default now()
);

drop trigger if exists page_settings_touch on page_settings;
create trigger page_settings_touch
  before update on page_settings
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- ui_strings — small scattered strings (footer links, 404 copy, home links)
-- ---------------------------------------------------------------------------
create table if not exists ui_strings (
  key        text primary key,
  value      text not null default '',
  group_name text not null default 'misc',
  updated_at timestamptz not null default now()
);

drop trigger if exists ui_strings_touch on ui_strings;
create trigger ui_strings_touch
  before update on ui_strings
  for each row execute function cms_touch_updated_at();

-- ---------------------------------------------------------------------------
-- Lock everything down. The owner/connection role bypasses RLS; anon and
-- authenticated get nothing, which is what we want — this app is server-only.
-- ---------------------------------------------------------------------------
alter table site_settings  enable row level security;
alter table nav_items      enable row level security;
alter table home_hero      enable row level security;
alter table home_sections  enable row level security;
alter table education      enable row level security;
alter table tech_items     enable row level security;
alter table journey_entries enable row level security;
alter table projects       enable row level security;
alter table random_notes   enable row level security;
alter table page_settings  enable row level security;
alter table ui_strings     enable row level security;
