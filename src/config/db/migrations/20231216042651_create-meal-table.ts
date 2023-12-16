import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meal", (table) => {
    table.uuid("id").primary()
    table
      .uuid("userId")
      .unsigned()
      .notNullable()
      .index()
      .references("id")
      .inTable("user")
    table.string("name")
    table.string("description")
    table.string("mealTime")
    table.boolean("inDiet")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meal")
}
