import { Observable } from 'rxjs/Rx'
import screenViewer from './lib/screenViewer'

/**
 * Observable after full load page
 *
 * @type {Rx}
 */
const load$ = Observable
  .fromEvent(window, 'load')
  .map(() => window.innerWidth)

/**
 * Observable from DOMContentLoaded event (as ready event jQuery)
 *
 * @type {Rx}
 */
const ready$ = Observable
  .fromEvent(document, 'DOMContentLoaded')
  .map(event => event.target.innerWidth)

/**
 * Observable from resize event
 *
 * @type {Rx}
 */
const resize$ = Observable
  .fromEvent(window, 'resize')
  .map(event => event.target.innerWidth)

/**
 * Init module
 * @type {Rx}
 */
let screen$ = screenViewer.init$([ load$, ready$, resize$ ])

/**
 * Element for display type screen
 * @type {DOM Node}
 */
let infoTypeEl = document.getElementById('infoType')

/**
 * Element for display width page
 * @type {DOM Node}
 */
let infoWidthEl = document.getElementById('infoWidth')

// Listen changes
screen$.subscribe(({ type }) => {
  // Display info
  infoTypeEl.innerHTML = type
})

// Listen screen changes
Observable.merge(load$, resize$)
  .subscribe(width => {
    // Display screen width
    infoWidthEl.innerHTML = width
  })
