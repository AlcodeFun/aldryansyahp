-- ---------------------------------------------------------------------------
-- 002 - project source link + UI gallery
--
-- Adds two optional columns to `projects`:
--   repo_url  single external link rendered in the project header
--   gallery   jsonb array of { src, alt, caption } rendered after the content
--
-- Both default to empty so existing rows stay valid. 001 already ran on this
-- database, so this has to be a new file rather than an edit to 001.
-- ---------------------------------------------------------------------------

alter table projects
  add column if not exists repo_url text not null default '',
  add column if not exists gallery jsonb not null default '[]'::jsonb;
