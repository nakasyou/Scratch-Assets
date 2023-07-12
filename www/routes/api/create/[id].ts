import { HandlerContext } from "$fresh/server.ts"

export const handler = (req: Request, ctx: HandlerContext): Response => {
  return new Response(ctx.params.id)
}
