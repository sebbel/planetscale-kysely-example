import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("movie")
    .addColumn("name", "varchar(255)", col => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("movie").dropColumn("name").execute()
}
