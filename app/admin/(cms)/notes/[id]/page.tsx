import { notFound } from "next/navigation";
import { getRandomNoteAdmin } from "@/lib/cms/notes";
import { saveRandomNote } from "@/lib/admin/actions";
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

export default async function NoteEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const note = isNew ? undefined : await getRandomNoteAdmin(id);
  if (!isNew && !note) notFound();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <BackLink href="/admin/notes">← all notes</BackLink>
        <h1 className="text-3xl font-semibold tracking-tight">
          {isNew ? "New note" : note?.title}
        </h1>
      </div>

      <form action={saveRandomNote} className="space-y-8">
        {note ? <input type="hidden" name="id" value={note.id} /> : null}

        <Card title="Basics">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Title" htmlFor="title">
              <TextInput name="title" defaultValue={note?.title} required />
            </Field>
            <Field
              label="Slug"
              htmlFor="slug"
              hint="Left blank, it is generated from the title."
            >
              <TextInput name="slug" defaultValue={note?.slug} />
            </Field>
            <Field label="Date" htmlFor="date">
              <TextInput name="date" type="date" defaultValue={note?.date} required />
            </Field>
          </div>
          <div className="mt-5">
            <Field
              label="Teaser text"
              htmlFor="text"
              hint="Short plain-text teaser shown in listings."
            >
              <TextArea name="text" defaultValue={note?.text} rows={2} />
            </Field>
          </div>
        </Card>

        <Card title="Content" description="The body of the note.">
          <BlockEditor name="content" initial={note?.content ?? []} />
        </Card>

        <Card title="Visibility">
          <Checkbox
            name="published"
            defaultChecked={note?.published ?? false}
            label="Published"
            hint="Only published notes can be drawn by the random page."
          />
          <div className="mt-5">
            <SaveButton>{isNew ? "Create note" : "Save changes"}</SaveButton>
          </div>
        </Card>
      </form>
    </div>
  );
}
