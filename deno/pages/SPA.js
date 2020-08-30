import { h } from '../lib/render.js'

export function SPA() {
    return h`
        <h1>React Tabbordion Demo</h1>
        <div id="app">
            <h2>Does your browser support JavaScript modules?</h2>
            <noscript>
                <h2>Sheesh, enable JavaScript in your browser!</h2>
            </noscript>
        </div>
        <h2>Why would you like to use this?</h2>
        <dl class="about">
            <dt class="about__title">State management</dt>
            <dd class="about__content">
                <p>
                    You can use Tabbordion in both controlled and uncontrolled mode. There are also three different
                    modes which allow the component to work as expected as tabs or as an accordion. You could even give
                    it incomplete, conflicting, or invalid state and it'll find a way to survive as a usable component.
                </p>
                <p>
                    Tabbordion is also built for universal rendering so you can throw it SPA and SSR and it will do the
                    job. The biggest gotcha is to give it unique id and name props so your client-side render can always
                    agree with server-side render upon hydration.
                </p>
                <p>
                    A lot of care has also been put into details such as to detect when the state has truly changed.
                    Tabbordion does the best it can to only render when needed to.
                </p>
            </dd>
            <dt class="about__title">CSS freedom</dt>
            <dd class="about__content">
                <p>
                    The only recommended to use CSS is for hiding internal radios/checkboxes in an accessible way. With
                    classNames Tabbordion defaults to <a href="https://css-tricks.com/bem-101/">BEM convention</a> and
                    you have lots of modifiers which make it easy to write targetted styles without specificity issues.
                    Alternatively you can also use CSS-in-JS libraries and disable the BEM entirely.
                </p>
                <p>
                    While not highly important Tabbordion has been built in a rare way which also allows the component
                    to work in CSS-only mode. This means you can write static Server Side Render without client-side
                    JavaScript and still achieve a visually working component. In this case there will be issues with
                    screen readers due to missing ARIA assistance, but these are impossible to implement when no
                    JavaScript is available.
                </p>
            </dd>
            <dt class="about__title">Minimal dependencies</dt>
            <dd class="about__content">
                <p>
                    The only external dependency is <code>fast-deep-equal</code>. On this demo however the accordion is
                    also using <a href="http://fortawesome.github.io/Font-Awesome/">Font Awesome</a> and CSS differences
                    across browsers are dealt with <a href="http://necolas.github.io/normalize.css/">Normalize.css</a>.
                </p>
            </dd>
            <dt class="about__title">Long track record</dt>
            <dd class="about__content">
                <p>
                    In React terms this component has been around for a long time and has kept on evolving as times have
                    changed. The earliest release in 2015 worked on React version 0.13 when <code>createClass
                    </code> and <code>createFactory</code> were a thing! Since then React has evolved a lot and
                    Tabbordion has had to keep up with the deprecations. All the other tooling has also greatly
                    improved.
                </p>
                <p>
                    From the other point of view I've had the chance to grow as a maintainer and developer which means
                    things are now better focused and there are (hopefully) less mistakes being made in the future :)
                </p>
            </dd>
        </dl>
        <footer>
            <nav>
                <a href="https://github.com/Merri/react-tabbordion">
                    <span class="fa-stack fa-lg">
                        <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-github fa-stack-1x fa-lg"></i>
                    </span> GitHub: react-tabbordion
                </a> | <a href="https://www.npmjs.com/package/react-tabbordion">
                    <span class="fa-stack fa-lg">
                        <i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-download fa-stack-1x fa-lg"></i>
                    </span> npm: react-tabbordion
                </a>
            </nav>
        </footer>
    `
}

SPA.meta = {
    headers: { 'Cache-Control': 'public, max-age=60' },
    index: true,
    script: 'spa'
}
