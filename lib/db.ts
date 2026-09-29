import "server-only";
import postgres from "postgres";

/**
 * Single pooled Supabase connection for the whole server.
 *
 * `max: 1` is deliberate. We connect through the Supabase *session* pooler
 * (port 5432), which caps the whole project at `pool_size` client slots (15 on
 * this project). Next.js runs each route in its own module instance, and
 * `next build` renders with 11 workers in parallel, so anything above 1 here
 * multiplies out well past the pooler ceiling and fails with EMAXCONNSESSION.
 * One connection per process is also the correct shape for serverless, where
 * many concurrent instances share that fixed budget.
 *
 * `prepare: false` — the pooler may switch a connection to transaction mode,
 * where named prepared statements do not survive. Re-parsing is irrelevant at
 * this scale.
 */
const connectionString = process.env["DATABASE_URL"];

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.local.example to .env.local and fill it in.",
  );
}

const sql = postgres(connectionString, {
  max: 1,
  idle_timeout: 20,
  connect_timeout: 15,
  max_lifetime: 60 * 30,
  prepare: false,
  onnotice: () => {},
});

export default sql;
