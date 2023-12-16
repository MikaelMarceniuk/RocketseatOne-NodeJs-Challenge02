import Fastify, { FastifyInstance } from "fastify"
import env from "./config/env"
import knex from "./config/db"
import userRouter from "./resources/user"

class App {
  app: FastifyInstance

  async init() {
    this.app = Fastify()
    await this.runMigrations()
    await this.loadRoutes()
  }

  async listen() {
    await this.app.listen({ port: env.PORT }, (err, address) => {
      if (err) {
        this.app.log.error(err)
        process.exit(1)
      }

      console.log("Server is up and running")
    })
  }

  private async runMigrations() {
    await knex.migrate.latest()
  }

  private async loadRoutes() {
    this.app.get("/api", async () => "Hello World!")
    await this.app.register(userRouter, { prefix: "/api/user" })
  }
}

export default App
