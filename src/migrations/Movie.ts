import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('movie')
    .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
    .addColumn('stars', 'integer', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('movie').execute()
}
