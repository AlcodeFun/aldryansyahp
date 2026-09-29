import { notFound } from "next/navigation";
import { getProjectAdmin } from "@/lib/cms/projects";
import { saveProject } from "@/lib/admin/actions";
import { isStorageConfigured } from "@/lib/storage";
import {
  Card,
  Checkbox,
  Field,
  SaveButton,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { BlockEditor } from "@/components/admin/block-editor";
import { GalleryEditor } from "@/components/admin/gallery-editor";
import { BackLink } from "@/components/admin/page-header";

export default async function ProjectEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const project = isNew ? undefined : await getProjectAdmin(id);
  if (!isNew && !project) notFound();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <BackLink href="/admin/projects">← all projects</BackLink>
        <h1 className="text-3xl font-semibold tracking-tight">
          {isNew ? "New project" : project?.title}
        </h1>
      </div>

      <form action={saveProject} className="space-y-8">
        {project ? <input type="hidden" name="id" value={project.id} /> : null}

        <Card title="Basics">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Title" htmlFor="title">
              <TextInput name="title" defaultValue={project?.title} required />
            </Field>
            <Field
              label="Slug"
              htmlFor="slug"
              hint="Left blank, it is generated from the title."
            >
              <TextInput name="slug" defaultValue={project?.slug} />
            </Field>
            <Field label="Index label" htmlFor="indexLabel">
              <TextInput
                name="indexLabel"
                defaultValue={project?.indexLabel}
                placeholder="01"
              />
            </Field>
            <Field label="Year" htmlFor="year">
              <TextInput name="year" defaultValue={project?.year} placeholder="2024" />
            </Field>
            <Field label="Role" htmlFor="role">
              <TextInput
                name="role"
                defaultValue={project?.role}
                placeholder="Lead engineer"
              />
            </Field>
            <Field
              label="Tags"
              htmlFor="tags"
              hint="Comma separated, e.g. Next.js, Postgres, Auth."
            >
              <TextInput
                name="tags"
                defaultValue={project?.tags.join(", ")}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label="Source repository"
                htmlFor="repoUrl"
                hint="Optional. A 'View source on GitHub' link appears under the title when set."
              >
                <TextInput
                  name="repoUrl"
                  type="url"
                  defaultValue={project?.repoUrl}
                  placeholder="https://github.com/username/foodish"
                />
              </Field>
            </div>
          </div>
          <div className="mt-5">
            <Field
              label="Hook"
              htmlFor="hook"
              hint="The bold lead line under the title on the listing and detail pages."
            >
              <TextArea name="hook" defaultValue={project?.hook} rows={2} />
            </Field>
          </div>
        </Card>

        <Card
          title="Content"
          description="Structured blocks describing the work."
        >
          <BlockEditor name="content" initial={project?.content ?? []} />
        </Card>

        <Card
          title="UI gallery"
          description="Screenshots rendered after the content on the project page."
        >
          <GalleryEditor
            name="gallery"
            initial={project?.gallery ?? []}
            // Storage keys are grouped by slug so the bucket stays browsable, and
            // the new-project form has no slug yet, hence the fallback.
            projectSlug={project?.slug ?? "new-project"}
            storageReady={isStorageConfigured()}
          />
        </Card>

        <Card title="Visibility">
          <Checkbox
            name="published"
            defaultChecked={project?.published ?? false}
            label="Published"
            hint="Unpublished projects are hidden from the public index."
          />
          <div className="mt-5">
            <SaveButton>{isNew ? "Create project" : "Save changes"}</SaveButton>
          </div>
        </Card>
      </form>
    </div>
  );
}
