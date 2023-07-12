import { HandlerContext } from "$fresh/server.ts"

export const handler = async (req: Request, ctx: HandlerContext): Response => {
  const id = ctx.params.id
  const projectData = await fetch(`https://trampoline.turbowarp.org/api/projects/${id}`).then(res=>res.json())
  
  const token = projectData.project_token

  const projectJson = await fetch(`https://projects.scratch.mit.edu/${id}?token=${token}`).then(res=>res.json())
  let assets = [];
  function assetsSearch(arg) {
    if (arg === null) {
      return
    }
    Object.keys(arg).forEach((key) => {
      if (typeof arg[key] === "object") {
        if (key === "sounds" || key === "costumes") {
          const data = arg[key]
          data.forEach((elem) => {
            elem.type = key
          });
          assets = assets.concat(data)
        } else {
          assetsSearch(arg[key])
        }
      }
    })
  }
  assetsSearch(projectJson)
  return new Response(JSON.stringify(assets))
}
