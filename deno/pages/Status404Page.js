import { h } from '../lib/render.js'

export function Status404Page() {
    return h`
        <h2>Not Found</h2>
        <p>I requested a SPA. Gave me a SSR + SPA.</p>
        <p>
            <img alt="Gimli" src="https://25.media.tumblr.com/tumblr_ma0ac1ohzh1qdyrbwo4_250.gif" height="140" width="245" />
        </p>
    `
}

Status404Page.meta = {
    headers: { 'Cache-Control': 'no-cache' },
    status: 404,
    title: '404 Not Found'
}
