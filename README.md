[![Build Status](https://travis-ci.org/RGRU/ScreenViewer.svg?branch=master)](https://travis-ci.org/RGRU/ScreenViewer)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![npm version](https://badge.fury.io/js/screen-viewer.svg)](https://badge.fury.io/js/screen-viewer)

# RxJS ScreenViewer
Module for definition screen type by RXJS. There is Flow in code.

For why? More comfortably using adaptive site created by screen types, than using particular sizes. This addition absctract layer give to you flexible and maintainable.

# Installation

### ES6 via npm
```sh
npm i screen-viewer
```
### Dependencies
For compile code with babel, we should install package:
```sh
# For using ES6 import
npm i babel-plugin-syntax-dynamic-import

# For compile with flowtype
npm i babel-preset-flow

# For strip flowtype declarations
npm i babel-plugin-transform-flow-strip-types

# Module use object spread operator
npm i babel-plugin-transform-object-rest-spread
```

# How it works
Module define some kind of size (in this case it's screen width), that it receive and compare it with needed screen type.

For example, module receive value 940, that corresponds screen type tablet. All corresponds values are shown below. If value is 1300, then it will be desktop.

```js
/**
 * Screen types map
 * @type {Object}
 */
screenMap = {

    // Everything is less
    map: {
        '768': 'mobile',
        '1280': 'tablet'
    },

    // type as default
    default: 'desktop'
}
```

Module works by Rx streams. In our case it works with resizes of screen. Which is stream will be observable decide developer.

In common cases uses free streams by three events:
    - Full page loaded (onload)
    - Full document loaded (DOMContentLoaded)
    - Resize screen (onresize)

# Usage
Set module (it use RxJS, that why module shold be accessible in environment).

index.js:

```js
// ES6 modules
import screenViewer from 'screen-viewer';

// or CommonJS
const screenViewer = require('screen-viewer').default;
```

You can set up types map, if you need it.

```js
screenViewer.setup({

    // Common types
    map: {
        '320': 'mobile',
        '700': 'tablet'
    },

    // As default
    default: 'desktop'
})
```

init$ method receive array of streams filtered by size of screen.

```js
import { Observable } from 'rxjs/Rx';

/**
 * Observable after full load page
 * @type {Rx}
 */
const load$ = Observable
  .fromEvent(window, 'load')
  .map(() => window.innerWidth)

/**
 * Observable from DOMContentLoaded event (as ready event jQuery)
 * @type {Rx}
 */
const ready$ = Observable
  .fromEvent(document, 'DOMContentLoaded')
  .map(event => event.target.innerWidth)

/**
 * Observable from resize event
 * @type {Rx}
 */
const resize$ = Observable
  .fromEvent(window, 'resize')
  .map(event => event.target.innerWidth)

/**
 * Init module
 * @type {Rx}
 */
const screen$ = screenViewer.init$([ load$, ready$, resize$ ])
```

Now we can subscribe to stream, that will change data in moment when type of screen changed.

```js
screen$.subscribe(console.log)
```
