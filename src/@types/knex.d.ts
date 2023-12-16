import { Knex } from "knex"

declare module "knex/types/tables" {
  interface User {
    id: string
    name: string
  }

  interface Meal {
    id: string
    userId: string
    name: string
    description: string
    mealTime: string
    inDiet: boolean
  }

  interface Tables {
    user: User
    meal: Meal
  }
}
