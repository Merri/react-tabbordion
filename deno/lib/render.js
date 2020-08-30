import { default as htm } from 'https://cdn.skypack.dev/htm'
import { h as preact } from 'https://cdn.skypack.dev/preact'

export { hydrate } from 'https://cdn.skypack.dev/preact'
export const h = htm.bind(preact)

export { renderToString } from 'https://cdn.skypack.dev/preact-render-to-string'
export { Application, Router, send } from 'https://deno.land/x/oak/mod.ts'
