import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import z from "zod"

const cookieValidator = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const cookiesSchema = z.object({
    sessionId: z.string().uuid(),
  })
  cookiesSchema.parse(req.cookies)

  done()
}

export default cookieValidator
