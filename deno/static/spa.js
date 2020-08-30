/* global React, ReactDOM, h */
import './lib/render.js'

import { DemoApp } from './demo/DemoApp.js'

ReactDOM.render(
	h`<${DemoApp} />`,
	document.getElementById('app')
)
