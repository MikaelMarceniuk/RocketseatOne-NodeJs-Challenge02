require("dotenv").config()
import z from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DB_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success == false) {
  console.error("⚠️ Invalid environment variables", _env.error.format())
  throw new Error("Invalid environment variables.")
}

export default _env.data
