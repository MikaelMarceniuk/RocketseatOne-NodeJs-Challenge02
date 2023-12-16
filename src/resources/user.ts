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

    const [newUser] = await knex("user")
      .insert({ id: randomUUID(), name })
      .returning("*")

    res.statusCode = 201
    res.setCookie("sessionId", newUser.id, {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  })
}
