import { getNav, getSite, getStrings } from "@/lib/cms/site";
import {
  addNavItem,
  deleteNavItem,
  moveNavItem,
  saveSite,
  saveStrings,
  updateNavItem,
} from "@/lib/admin/actions";
import {
  Card,
  Field,
  SavedFlag,
  SaveButton,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { RowControls } from "@/components/admin/row-controls";

export default async function AdminSitePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, site, nav, strings] = await Promise.all([
    searchParams,
    getSite(),
    getNav(),
    getStrings(),
  ]);

  // Group strings by their first dotted segment, e.g. "nav", "footer", "home".
  const groups = new Map<string, { key: string; value: string }[]>();
  for (const [key, value] of Object.entries(strings)) {
    const group = key.split(".")[0];
    const list = groups.get(group) ?? [];
    list.push({ key, value });
    groups.set(group, list);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Site</h1>
      <SavedFlag show={saved === "1"} />

      <Card
        title="Identity"
        description="Used in the header, footer, metadata and as the default author."
      >
        <form action={saveSite} className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name">
            <TextInput name="name" defaultValue={site.name} required />
          </Field>
          <Field label="Username" htmlFor="username">
            <TextInput name="username" defaultValue={site.username} />
          </Field>
          <Field label="Nickname" htmlFor="nickname">
            <TextInput name="nickname" defaultValue={site.nickname} />
          </Field>
          <Field label="Role" htmlFor="role">
            <TextInput name="role" defaultValue={site.role} />
          </Field>
          <Field label="Tagline" htmlFor="tagline" hint="Shown under the name in the header.">
            <TextInput name="tagline" defaultValue={site.tagline} />
          </Field>
          <Field label="Location" htmlFor="location">
            <TextInput name="location" defaultValue={site.location} />
          </Field>
          <Field label="Email" htmlFor="email">
            <TextInput name="email" type="email" defaultValue={site.email} />
          </Field>
          <Field label="GitHub URL" htmlFor="github">
            <TextInput name="github" type="url" defaultValue={site.github} />
          </Field>
          
          <Field label="LinkedIn URL" htmlFor="linkedin">
            <TextInput name="linkedin" type="url" defaultValue={site.linkedin} />
          </Field>
          <div className="sm:col-span-2">
            <SaveButton />
          </div>
        </form>
      </Card>

      <Card
        title="Navigation"
        description="Rendered in the header and used to mark the active route."
      >
        <ul className="space-y-3">
          {nav.map((item, i) => (
            <li key={item.id}>
              <div className="flex flex-wrap items-end gap-3 rounded-lg border border-black/15 p-3 dark:border-white/15">
                <form
                  action={updateNavItem}
                  className="flex flex-1 flex-wrap items-end gap-3"
                >
                  <input type="hidden" name="id" value={item.id} />
                  <div className="w-32 shrink-0">
                    <Field label="Label" htmlFor={`label-${item.id}`}>
                      <TextInput
                        name="label"
                        defaultValue={item.label}
                        required
                      />
                    </Field>
                  </div>
                  <div className="min-w-40 flex-1">
                    <Field label="Href" htmlFor={`href-${item.id}`}>
                      <TextInput name="href" defaultValue={item.href} required />
                    </Field>
                  </div>
                  <SaveButton pendingLabel="…" />
                </form>
                <RowControls
                  id={item.id}
                  moveAction={moveNavItem}
                  deleteAction={deleteNavItem}
                  canMoveUp={i > 0}
                  canMoveDown={i < nav.length - 1}
                />
              </div>
            </li>
          ))}
        </ul>

        <form
          action={addNavItem}
          className="mt-5 flex flex-wrap items-end gap-3 border-t border-black/15 pt-5 dark:border-white/15"
        >
          <div className="w-40">
            <Field label="New label" htmlFor="new-nav-label">
              <TextInput name="label" placeholder="Writing" />
            </Field>
          </div>
          <div className="min-w-40 flex-1">
            <Field label="New href" htmlFor="new-nav-href">
              <TextInput name="href" placeholder="/writing" />
            </Field>
          </div>
          <SaveButton pendingLabel="Adding…">Add link</SaveButton>
        </form>
      </Card>

      <Card
        title="UI strings"
        description="Every static label on the public site. Keys are grouped; the part before the first dot is the group."
      >
        <form action={saveStrings} className="space-y-8">
          {[...groups.entries()].map(([group, entries]) => (
            <div key={group}>
              <h3 className="font-mono text-sm uppercase tracking-wide opacity-60">
                {group}
              </h3>
              <div className="mt-3 space-y-3">
                {entries.map((entry) => (
                  <Field
                    key={entry.key}
                    label={entry.key}
                    htmlFor={`string-${entry.key}`}
                  >
                    {entry.value.length > 90 || entry.value.includes("\n") ? (
                      <TextArea
                        name={`string:${entry.key}`}
                        defaultValue={entry.value}
                        rows={2}
                      />
                    ) : (
                      <TextInput name={`string:${entry.key}`} defaultValue={entry.value} />
                    )}
                  </Field>
                ))}
              </div>
            </div>
          ))}
          <SaveButton />
        </form>
      </Card>
    </div>
  );
}
