import Fastify, { FastifyInstance } from "fastify"
import env from "./config/env"

class App {
  app: FastifyInstance

  async init() {
    this.app = Fastify()
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
}

export default App
