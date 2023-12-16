import Knexlib, { Knex } from "knex"
import path from "node:path"
import env from "../env"

export const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: env.DB_URL,
  },
  migrations: {
    extension: "ts",
    directory: path.resolve(__dirname, "migrations"),
  },
  useNullAsDefault: true,
}

const knex = Knexlib(config)

export default knex
