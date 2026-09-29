import { getAllPageSettings } from "@/lib/cms/pages";
import { savePageSettings } from "@/lib/admin/actions";
import {
  Card,
  Field,
  SavedFlag,
  SaveButton,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { PageHeader } from "@/components/admin/page-header";

const TOKENS = [
  { token: "{date}", meaning: "formatted entry date" },
  { token: "{readMinutes}", meaning: "journey read time" },
  { token: "{title}", meaning: "entry title" },
  { token: "{year}", meaning: "project year" },
  { token: "{role}", meaning: "project role" },
  { token: "{indexLabel}", meaning: "project index label" },
  { token: "{tags}", meaning: "comma-joined project tags" },
  { token: "{count}", meaning: "number of items on the page" },
];

export default async function AdminPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, pages] = await Promise.all([
    searchParams,
    getAllPageSettings(),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Page copy"
        description="Headings, intro text, empty states and metadata templates for each public page."
      />
      <SavedFlag show={saved === "1"} />

      <Card
        title="Metadata tokens"
        description="Available inside the list and detail meta templates below."
      >
        <ul className="grid gap-x-8 gap-y-1.5 font-mono text-sm sm:grid-cols-2">
          {TOKENS.map((t) => (
            <li key={t.token} className="flex gap-2">
              <span className="opacity-70">{t.token}</span>
              <span className="opacity-50">— {t.meaning}</span>
            </li>
          ))}
        </ul>
      </Card>

      {pages.map((page) => (
        <Card
          key={page.pageKey}
          title={`/${page.pageKey}`}
          description={`Page key: ${page.pageKey}`}
        >
          <form action={savePageSettings} className="space-y-5">
            <input type="hidden" name="pageKey" value={page.pageKey} />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="SEO title" htmlFor={`${page.pageKey}-seoTitle`}>
                <TextInput
                  name="seoTitle"
                  defaultValue={page.seoTitle}
                  placeholder="Leave blank to use the site name"
                />
              </Field>
              <Field label="Heading" htmlFor={`${page.pageKey}-heading`}>
                <TextInput name="heading" defaultValue={page.heading} />
              </Field>
            </div>

            <Field label="SEO description" htmlFor={`${page.pageKey}-seoDescription`}>
              <TextArea
                name="seoDescription"
                defaultValue={page.seoDescription}
                rows={2}
              />
            </Field>

            <Field label="Intro" htmlFor={`${page.pageKey}-intro`}>
              <TextArea name="intro" defaultValue={page.intro} rows={3} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Back link label" htmlFor={`${page.pageKey}-backLabel`}>
                <TextInput name="backLabel" defaultValue={page.backLabel} />
              </Field>
              <Field label="Back link href" htmlFor={`${page.pageKey}-backHref`}>
                <TextInput name="backHref" defaultValue={page.backHref} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="List meta template"
                htmlFor={`${page.pageKey}-listMetaFormat`}
              >
                <TextInput
                  name="listMetaFormat"
                  defaultValue={page.listMetaFormat}
                />
              </Field>
              <Field
                label="Detail meta template"
                htmlFor={`${page.pageKey}-detailMetaFormat`}
              >
                <TextInput
                  name="detailMetaFormat"
                  defaultValue={page.detailMetaFormat}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="All link label" htmlFor={`${page.pageKey}-allLabel`}>
                <TextInput name="allLabel" defaultValue={page.allLabel} />
              </Field>
              <Field label="Empty state" htmlFor={`${page.pageKey}-emptyMessage`}>
                <TextInput
                  name="emptyMessage"
                  defaultValue={page.emptyMessage}
                />
              </Field>
            </div>

            <SaveButton />
          </form>
        </Card>
      ))}
    </div>
  );
}
