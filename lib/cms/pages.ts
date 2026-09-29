import "server-only";
import sql from "@/lib/db";
import { cached, cachedBy, TAGS } from "@/lib/cms/cache";
import type { PageSettings } from "@/lib/cms/types";

const COLUMNS = `
  page_key, seo_title, seo_description, heading, intro,
  back_label, back_href, all_label, list_meta_format, detail_meta_format, empty_message
`;

type Row = Omit<PageSettings, "pageKey" | "listMetaFormat" | "detailMetaFormat"> & {
  page_key: string;
  list_meta_format: string;
  detail_meta_format: string;
};

function map(row: Row): PageSettings {
  return {
    ...row,
    pageKey: row.page_key,
    listMetaFormat: row.list_meta_format,
    detailMetaFormat: row.detail_meta_format,
  };
}

/** Falls back to an all-blanks row so a missing key never throws a page. */
function blank(pageKey: string): PageSettings {
  return {
    pageKey,
    seoTitle: "",
    seoDescription: "",
    heading: "",
    intro: "",
    backLabel: "",
    backHref: "",
    allLabel: "",
    listMetaFormat: "",
    detailMetaFormat: "",
    emptyMessage: "",
  };
}

export const getPageSettings = cachedBy(
  (args: [string]) => {
    const [pageKey] = args;
    return async () => {
      const rows = await sql.unsafe<Row[]>(
        `select ${COLUMNS} from page_settings where page_key = $1`,
        [pageKey],
      );
      const row = rows[0];
      return row ? map(row) : blank(pageKey);
    };
  },
  "page-settings",
  () => [TAGS.pages, TAGS.site],
);

export const getPages = cached(
  async (): Promise<PageSettings[]> => {
    const rows = await sql.unsafe<Row[]>(
      `select ${COLUMNS} from page_settings order by page_key`,
    );
    return rows.map(map);
  },
  ["page-settings-all"],
  [TAGS.pages],
);

/** Uncached. Admin screens only. */
export async function getAllPageSettings(): Promise<PageSettings[]> {
  const rows = await sql.unsafe<Row[]>(
    `select ${COLUMNS} from page_settings order by page_key`,
  );
  return rows.map(map);
}

export async function updatePageSettings(values: PageSettings): Promise<void> {
  await sql`
    update page_settings set
      seo_title = ${values.seoTitle}, seo_description = ${values.seoDescription},
      heading = ${values.heading}, intro = ${values.intro},
      back_label = ${values.backLabel}, back_href = ${values.backHref},
      all_label = ${values.allLabel}, list_meta_format = ${values.listMetaFormat},
      detail_meta_format = ${values.detailMetaFormat}, empty_message = ${values.emptyMessage}
    where page_key = ${values.pageKey}
  `;
}
