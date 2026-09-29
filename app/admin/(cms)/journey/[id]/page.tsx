import { notFound } from "next/navigation";
import { getJourneyEntryAdmin } from "@/lib/cms/journey";
import { saveJourneyEntry } from "@/lib/admin/actions";
import {
  Card,
  Checkbox,
  Field,
  SaveButton,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { BlockEditor } from "@/components/admin/block-editor";
import { BackLink } from "@/components/admin/page-header";
import type { JourneyEntry } from "@/lib/cms/types";

export default async function JourneyEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const entry = isNew ? undefined : await getJourneyEntryAdmin(id);
  if (!isNew && !entry) notFound();

  return <JourneyForm entry={entry} isNew={isNew} />;
}

function JourneyForm({
  entry,
  isNew,
}: {
  entry?: JourneyEntry;
  isNew: boolean;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <BackLink href="/admin/journey">← all entries</BackLink>
        <h1 className="text-3xl font-semibold tracking-tight">
          {isNew ? "New journey entry" : entry?.title}
        </h1>
      </div>

      <form action={saveJourneyEntry} className="space-y-8">
        {entry ? <input type="hidden" name="id" value={entry.id} /> : null}

        <Card title="Basics">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Title" htmlFor="title">
              <TextInput name="title" defaultValue={entry?.title} required />
            </Field>
            <Field
              label="Slug"
              htmlFor="slug"
              hint="Left blank, it is generated from the title."
            >
              <TextInput name="slug" defaultValue={entry?.slug} />
            </Field>
            <Field label="Date" htmlFor="date">
              <TextInput name="date" type="date" defaultValue={entry?.date} required />
            </Field>
            <Field
              label="Read time (minutes)"
              htmlFor="readMinutes"
              hint="Recalculated from the blocks when you use the editor below."
            >
              <TextInput
                name="readMinutes"
                type="number"
                min={0}
                defaultValue={String(entry?.readMinutes ?? 1)}
              />
            </Field>
          </div>
          <div className="mt-5">
            <Field
              label="Excerpt"
              htmlFor="excerpt"
              hint="Shown on the listing page. Plain text."
            >
              <TextArea name="excerpt" defaultValue={entry?.excerpt} rows={2} />
            </Field>
          </div>
        </Card>

        <Card
          title="Content"
          description="Structured blocks. The hidden field is what the Server Action reads."
        >
          <BlockEditor
            name="content"
            initial={entry?.content ?? []}
            readMinutesName="readMinutes"
          />
        </Card>

        <Card title="Visibility">
          <Checkbox
            name="published"
            defaultChecked={entry?.published ?? false}
            label="Published"
            hint="Unpublished entries are hidden from the public list and 404 on their own page."
          />
          <div className="mt-5">
            <SaveButton>{isNew ? "Create entry" : "Save changes"}</SaveButton>
          </div>
        </Card>
      </form>
    </div>
  );
}
