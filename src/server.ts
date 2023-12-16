require("dotenv").config()
import App from "./app"
;(async () => {
  const server = new App()
  await server.init()
  await server.listen()
})()
