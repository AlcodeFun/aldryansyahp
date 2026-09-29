import "server-only";
import sql from "@/lib/db";

/** Tables whose display order is carried entirely by the `position` column. */
export type OrderedTable = "nav_items" | "education" | "tech_items";

/**
 * Swap a row's `position` with its neighbour in one transaction.
 *
 * Doing the read and both writes inside a single `begin`/`commit` is what stops
 * two simultaneous reorder submissions from interleaving into a duplicated
 * position value.
 */
export async function swapPositions(
  table: OrderedTable,
  id: string,
  direction: -1 | 1,
): Promise<void> {
  await sql.begin(async (tx) => {
    const [row] = await tx<{ position: number }[]>`
      select position from ${tx(table)} where id = ${id}
    `;
    if (!row) return;

    const target = row.position + direction;
    const [other] = await tx<{ id: string; position: number }[]>`
      select id, position from ${tx(table)}
      where position = ${target}
      order by abs(position - ${row.position}), position
      limit 1
    `;
    if (!other) return;

    await tx`update ${tx(table)} set position = ${other.position} where id = ${other.id}`;
    await tx`update ${tx(table)} set position = ${row.position} where id = ${id}`;
  });
}

/** Next free slot at the end of the table. */
export async function nextPosition(table: "education" | "tech_items"): Promise<number> {
  const [row] = await sql<{ n: number }[]>`
    select coalesce(max(position), -1) + 1 as n from ${sql(table)}
  `;
  return Number(row.n);
}

/** Next free slot at the end of one group within a table. */
export async function nextPositionInGroup(
  table: "tech_items",
  groupValue: string,
): Promise<number> {
  const [row] = await sql<{ n: number }[]>`
    select coalesce(max(position), -1) + 1 as n from ${sql(table)}
    where group_name = ${groupValue}
  `;
  return Number(row.n);
}
