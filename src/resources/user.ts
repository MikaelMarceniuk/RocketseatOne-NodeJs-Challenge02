import { FastifyInstance } from "fastify"
import z from "zod"
import knex from "../config/db"
import { randomUUID } from "crypto"

export default async (app: FastifyInstance) => {
  app.post("/", async (req, res) => {
    const userSchema = z.object({
      name: z.string(),
    })
    const { name } = userSchema.parse(req.body)

    await knex("user").insert({ id: randomUUID(), name })

    res.statusCode = 201
  })
}
