import { FastifyInstance } from "fastify"
import z from "zod"
import knex from "../config/db"
import cookieValidator from "../middlewares/cookieValidator"
import { randomUUID } from "crypto"
import moment from "moment"

export default async (app: FastifyInstance) => {
  app.addHook("preHandler", cookieValidator)

  app.get("/", async (req) => {
    const { sessionId } = req.cookies

    const dbMeals = await knex("meal").where({ userId: sessionId })

    return { meals: dbMeals }
  })

  app.get("/:id", async (req) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramSchema.parse(req.params)
    const { sessionId } = req.cookies

    const dbMeal = await knex("meal").where({ id, userId: sessionId }).first()

    return { meal: dbMeal }
  })

  app.get("/summary", async (req) => {
    const { sessionId } = req.cookies

    const dbMeal = await knex("meal").where({ userId: sessionId })

    let mealInDiet = 0
    let mealNotInDiet = 0
    let bestMealSequence = 0

    let currentMealSequence = 0
    let lastMealInDietDate: moment.Moment | undefined
    dbMeal.forEach((meal) => {
      if (!meal.inDiet) {
        mealNotInDiet += 1

        currentMealSequence = 0
        lastMealInDietDate = undefined
        return
      }

      mealInDiet += 1
      const currentMealDate = moment(meal.mealTime)
      if (!lastMealInDietDate) {
        lastMealInDietDate = currentMealDate
        currentMealSequence += 1
        return
      }

      const isSameDay = lastMealInDietDate.isSame(currentMealDate, "day")
      const isDayBefore = currentMealDate.isAfter(lastMealInDietDate, "day")
      if (isSameDay || isDayBefore) {
        currentMealSequence += 1
        lastMealInDietDate = currentMealDate
      }

      if (currentMealSequence > bestMealSequence) {
        bestMealSequence = currentMealSequence
      }
    })

    return {
      count: dbMeal.length,
      mealInDiet,
      mealNotInDiet,
      bestMealSequence,
    }
  })

  app.post("/", async (req, res) => {
    const mealSchema = z.object({
      name: z.string(),
      description: z.string(),
      mealTime: z.string().datetime(),
      inDiet: z.boolean(),
    })

    const { name, description, mealTime, inDiet } = mealSchema.parse(req.body)
    const { sessionId } = req.cookies

    await knex("meal").insert({
      id: randomUUID(),
      userId: sessionId,
      name,
      description,
      mealTime,
      inDiet,
    })

    res.statusCode = 201
  })

  app.put("/:id", async (req, res) => {
    const mealSchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      mealTime: z.string().datetime().optional(),
      inDiet: z.boolean().optional(),
    })

    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { name, description, mealTime, inDiet } = mealSchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)
    const { sessionId } = req.cookies

    const dbMeal = await knex("meal").where({ id, userId: sessionId }).first()
    if (!dbMeal) {
      res.statusCode = 404
      return
    }

    await knex("meal")
      .where({ id, userId: sessionId })
      .update({
        name: name || dbMeal.name,
        description: description || dbMeal.description,
        mealTime: mealTime || dbMeal.mealTime,
        inDiet: inDiet || dbMeal.inDiet,
      })
  })

  app.delete("/:id", async (req, res) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramSchema.parse(req.params)
    const { sessionId } = req.cookies

    const dbMeal = await knex("meal").where({ id, userId: sessionId }).first()
    if (!dbMeal) {
      res.statusCode = 404
      return
    }

    await knex("meal").where({ id, userId: sessionId }).del()
  })
}
