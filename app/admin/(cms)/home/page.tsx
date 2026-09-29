import { getEducation, getHero, getSections, getTech } from "@/lib/cms/home";
import {
  addEducation,
  addTechItem,
  deleteEducation,
  deleteTechItem,
  moveEducation,
  moveTechItem,
  saveHero,
  saveSection,
  updateEducation,
  updateTechItem,
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
import type { HomeSectionKind } from "@/lib/cms/types";

const KINDS: { value: HomeSectionKind; label: string; hint: string }[] = [
  { value: "heading", label: "Heading", hint: "Large section title only" },
  { value: "text", label: "Text", hint: "Title plus body copy" },
  { value: "contact", label: "Contact", hint: "Title plus body with linkified email/URLs" },
];

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, hero, sections, education, tech] = await Promise.all([
    searchParams,
    getHero(),
    getSections(),
    getEducation(),
    getTech(),
  ]);

  const experience = tech.filter((t) => t.groupName === "experience");
  const stack = tech.filter((t) => t.groupName === "stack");

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Home</h1>
      <SavedFlag show={saved === "1"} />

      <Card
        title="Hero"
        description="The two lines under your name, plus the availability note."
      >
        <form action={saveHero} className="space-y-5">
          <Field label="Availability line" htmlFor="updatedLabel">
            <TextInput name="updatedLabel" defaultValue={hero.updatedLabel} />
          </Field>
          <Field label="Greeting" htmlFor="greeting">
            <TextInput name="greeting" defaultValue={hero.greeting} />
          </Field>
          <Field label="Headline, line one" htmlFor="lineOne">
            <TextInput name="lineOne" defaultValue={hero.lineOne} />
          </Field>
          <Field
            label="Experience prefix"
            htmlFor="experiencePrefix"
            hint="Printed before the years of experience, e.g. “2+ years”."
          >
            <TextInput name="experiencePrefix" defaultValue={hero.experiencePrefix} />
          </Field>
          <SaveButton />
        </form>
      </Card>

      <Card
        title="Sections"
        description="Rendered in order between the hero and the education timeline."
      >
        <div className="space-y-5">
          {sections.map((section) => (
            <form
              key={section.id}
              action={saveSection}
              className="space-y-3 rounded-lg border border-black/15 p-4 dark:border-white/15"
            >
              <input type="hidden" name="id" value={section.id} />
              <div className="grid gap-3 sm:grid-cols-[1fr_12rem]">
                <Field label="Title" htmlFor={`title-${section.id}`}>
                  <TextInput name="title" defaultValue={section.title} required />
                </Field>
                <Field label="Kind" htmlFor={`kind-${section.id}`}>
                  <select
                    id={`kind-${section.id}`}
                    name="kind"
                    defaultValue={section.kind}
                    className="w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[15px] dark:border-white/25"
                  >
                    {KINDS.map((kind) => (
                      <option key={kind.value} value={kind.value}>
                        {kind.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Body" htmlFor={`body-${section.id}`}>
                <TextArea
                  name="body"
                  defaultValue={section.body}
                  rows={3}
                  hint={KINDS.find((k) => k.value === section.kind)?.hint}
                />
              </Field>
              <SaveButton pendingLabel="Saving…" />
            </form>
          ))}
        </div>
      </Card>

      <Card title="Education" description="Timeline entries shown under Experience.">
        <ul className="space-y-3">
          {education.map((row, i) => (
            <li key={row.id}>
              <div className="rounded-lg border border-black/15 p-3 dark:border-white/15">
                <form
                  action={updateEducation}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <input type="hidden" name="id" value={row.id} />
                  <Field label="Period" htmlFor={`edu-period-${row.id}`}>
                    <TextInput name="period" defaultValue={row.period} />
                  </Field>
                  <Field label="GPA / predicate" htmlFor={`edu-gpa-${row.id}`}>
                    <TextInput name="gpa" defaultValue={row.gpa} />
                  </Field>
                  <Field label="Degree" htmlFor={`edu-degree-${row.id}`}>
                    <TextInput name="degree" defaultValue={row.degree} />
                  </Field>
                  <Field label="School" htmlFor={`edu-school-${row.id}`}>
                    <TextInput name="school" defaultValue={row.school} />
                  </Field>
                  <Field
                    label="Predicate"
                    htmlFor={`edu-predicate-${row.id}`}
                    hint="Small qualifier under the school, e.g. “cum laude”."
                  >
                    <TextInput name="predicate" defaultValue={row.predicate} />
                  </Field>
                  <div className="flex items-end justify-end">
                    <SaveButton pendingLabel="…" />
                  </div>
                </form>
                <div className="mt-3 flex items-center justify-end">
                  <RowControls
                    id={row.id}
                    moveAction={moveEducation}
                    deleteAction={deleteEducation}
                    canMoveUp={i > 0}
                    canMoveDown={i < education.length - 1}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <form
          action={addEducation}
          className="mt-5 grid gap-3 border-t border-black/15 pt-5 dark:border-white/15 sm:grid-cols-2"
        >
          <Field label="New period" htmlFor="new-edu-period">
            <TextInput name="period" placeholder="2023 – 2027" />
          </Field>
          <Field label="New GPA / predicate" htmlFor="new-edu-gpa">
            <TextInput name="gpa" placeholder="3.94 / 4.00" />
          </Field>
          <Field label="New degree" htmlFor="new-edu-degree">
            <TextInput name="degree" placeholder="B.S. Computer Science" />
          </Field>
          <Field label="New school" htmlFor="new-edu-school">
            <TextInput name="school" placeholder="Universitas" />
          </Field>
          <Field label="New predicate" htmlFor="new-edu-predicate">
            <TextInput name="predicate" placeholder="cum laude" />
          </Field>
          <div className="flex items-end">
            <SaveButton pendingLabel="Adding…">Add education</SaveButton>
          </div>
        </form>
      </Card>

      <Card
        title="Technology pills"
        description="“Experience” renders in the homepage pill row. “Stack” is kept for reference and is not shown publicly."
      >
        <TechGroup
          heading="Experience"
          items={experience}
          addAction={addTechItem}
          updateAction={updateTechItem}
          deleteAction={deleteTechItem}
          moveAction={moveTechItem}
          groupName="experience"
        />
        <div className="mt-8">
          <TechGroup
            heading="Stack"
            items={stack}
            addAction={addTechItem}
            updateAction={updateTechItem}
            deleteAction={deleteTechItem}
            moveAction={moveTechItem}
            groupName="stack"
          />
        </div>
      </Card>
    </div>
  );
}

function TechGroup({
  heading,
  items,
  addAction,
  updateAction,
  deleteAction,
  moveAction,
  groupName,
}: {
  heading: string;
  items: { id: string; label: string }[];
  addAction: (data: FormData) => Promise<void>;
  updateAction: (data: FormData) => Promise<void>;
  deleteAction: (data: FormData) => Promise<void>;
  moveAction: (data: FormData) => Promise<void>;
  groupName: "experience" | "stack";
}) {
  return (
    <div>
      <h3 className="font-mono text-sm uppercase tracking-wide opacity-60">{heading}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={item.id}>
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-black/15 p-2.5 dark:border-white/15">
              <form action={updateAction} className="flex flex-1 flex-wrap items-center gap-3">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="groupName" value={groupName} />
                <TextInput name="label" defaultValue={item.label} required />
                <SaveButton pendingLabel="…" />
              </form>
              <RowControls
                id={item.id}
                moveAction={moveAction}
                deleteAction={deleteAction}
                canMoveUp={i > 0}
                canMoveDown={i < items.length - 1}
              />
            </div>
          </li>
        ))}
        {items.length === 0 ? (
          <p className="text-sm opacity-60">Nothing in this group yet.</p>
        ) : null}
      </ul>

      <form
        action={addAction}
        className="mt-3 flex flex-wrap items-end gap-3"
      >
        <input type="hidden" name="groupName" value={groupName} />
        <div className="min-w-48 flex-1">
          <Field label={`Add to ${heading.toLowerCase()}`} htmlFor={`new-tech-${groupName}`}>
            <TextInput name="label" placeholder="TypeScript" />
          </Field>
        </div>
        <SaveButton pendingLabel="Adding…">Add</SaveButton>
      </form>
    </div>
  );
}
