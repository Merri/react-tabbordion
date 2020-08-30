import { h, renderToString } from './deno/lib/render.js'
import { listenRoutes } from './deno/routes.js'

function getTitle(title) {
    const hasPostfix = !title || title === 'Tabbordion'
    const titlePrefix = !hasPostfix ? `${title} – ` : ''
    const titlePostfix = hasPostfix ? ' — React component for managing state of tabs and accordions' : ''
    return `${titlePrefix}Tabbordion${titlePostfix}`
}

function renderPage(Page) {
    const { headers, index = false, lang, preload, script, status, title } = Page.meta || {}
    const hasScript = typeof script === 'string'
    const render = preloadProps =>
        '<!DOCTYPE html>' + renderToString(h`
<html lang=${lang ?? 'en'}>
    <head>
        <meta charset="UTF-8" />
        <title>${getTitle(title)}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        ${index === false && h`<meta name="robots" content="noindex,nofollow" />`}
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://merri.net/styles/fonts.css" />
        <link href="/style/index.css" rel="stylesheet" />
        <link href="/demo/accordion.css" rel="stylesheet" />
        <link href="/demo/option-list.css" rel="stylesheet" />
        <link href="/demo/traditional-tabs.css" rel="stylesheet" />
        <link href="/index.css" rel="stylesheet" type="text/css" />
        <style>.sr-only{clip:rect(0 0 0 0);position:absolute;z-index:-1}</style>
        ${hasScript && h`
            <script crossorigin src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>
            <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
            <script crossorigin src="https://unpkg.com/htm@3.0.4/dist/htm.umd.js"></script>
            <!--script crossorigin src="https://cdn.jsdelivr.net/npm/react-tabbordion@1.0.5/dist/umd/react-tabbordion.js"></script-->
            <script src="./dist/index.umd.js"></script>
            <script src="./${script}.js" type="module"></script>`
        }
    </head>
    <body>
        <nav class="main-navigation">
            <a class="sr-only" href="#app">Jump to content</a>
        </nav>
        <${Page} preloadProps=${preloadProps != null && typeof preloadProps === 'object' ? preloadProps : undefined} />
    </body>
</html>`)

    function setResponse(ctx, body) {
        if (headers) {
            for (let [key, value] of Object.entries(headers)) {
                ctx.response.headers.set(key, value)
            }
        }
        if (status) ctx.response.status = status
        ctx.response.type = 'html'
        ctx.response.body = body
    }

    const hasPreload = typeof preload === 'function'
    const prerenderedBody = !hasPreload && render()

    return hasPreload
        ? async ctx => {
            setResponse(ctx, render(await preload(ctx)))
        }
        : ctx => setResponse(ctx, prerenderedBody)
}

await listenRoutes({ hostname: '127.0.0.1', port: 80, renderPage })
