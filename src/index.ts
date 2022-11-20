import {Kysely, Generated, Migrator, FileMigrationProvider} from 'kysely'
import {PlanetScaleDialect} from 'kysely-planetscale'
import {fetch} from 'undici'
import * as dotenv from 'dotenv'
import path from 'path'
import fs from 'fs/promises';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

// Keys of this interface are table names.
interface Database {
  movie: MovieTable
}

interface MovieTable {
  id: Generated<number>;
  stars?: number
  name: string
}

const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: process.env.DATABASE_HOST!,
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    fetch,
  }),
})

async function migrate() {
  console.log("migrating")
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../src/migrations'),
    })
  });

 const { error, results} = await migrator.migrateToLatest()

 console.log("error", error)
 console.log("results", results)
}

async function main() {
  await migrate()

  const result = await db.insertInto('movie').values({ stars: 5, name: "Rush Hour"}).execute()
  console.log(result)
  const movie = await db.selectFrom('movie').selectAll().where("stars", "=", 5).execute()
  console.log(movie)
}

main().catch(console.log)
