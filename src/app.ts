import Fastify, { FastifyInstance } from "fastify"
import env from "./config/env"
import knex from "./config/db"

class App {
  app: FastifyInstance

  async init() {
    this.app = Fastify()
    await this.runMigrations()
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
}

export default App
