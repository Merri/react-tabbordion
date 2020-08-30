import { Application, Router, h, send } from './lib/render.js'

import { SPA } from './pages/SPA.js'
import { Status404Page } from './pages/Status404Page.js'

function logListen({ hostname, port, secure }) {
    console.info(`Listening on: ${secure ? 'https' : 'http'}://${hostname || 'localhost'}:${port}`)
}

function logUnhandledError(event) {
    console.error(event.error)
}

async function staticRoutes(ctx, next) {
    try {
        await send(ctx, ctx.request.url.pathname, { root: Deno.cwd() + '/deno/static' })
    } catch (error) {
        next()
    }
}

async function serveUMD(ctx, next) {
    try {
        ctx.response.status = 200
        ctx.response.type = 'application/javascript'
        ctx.response.body = await Deno.readFile('./dist/index.umd.js')
    } catch (error) {
        next()
    }
}

export async function listenRoutes({ hostname, port, renderPage }) {
    const defaultRoute = renderPage(Status404Page)
    const router = new Router()
        .get('/', renderPage(SPA))
        .get('/dist/index.umd.js', serveUMD)
    const app = new Application()
    app.addEventListener('error', logUnhandledError)
    app.addEventListener('listen', logListen)
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.use(staticRoutes)
    app.use(defaultRoute)
    return app.listen({ hostname, port })
}
