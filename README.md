[![Build Status](https://travis-ci.org/RGRU/ScreenViewer.svg?branch=master)](https://travis-ci.org/RGRU/ScreenViewer)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# RxJS ScreenViewer
Module for definition screen type by RXJS. There is Flow in code.

For why? More comfortably using adaptive site created by screen types, than using particular sizes. This addition absctract layer give to you flexible and maintainable.

## How it works
Module define some kind of size (in this case it's screen width), that it receive and compare it with needed screen type.

For example, module receive value 940, that corresponds screen type tablet. All corresponds values are shown below. If value is 1300, then it will be desktop.

```js
/**
 * Screen types map
 * @type {Object}
 */
screenMap = { // EVERYTHING IS LESS AND EQUAL
    '768': 'mobile',
    '990': 'tablet',
    '1260': 'tabletLandscape',
    '1760': 'desktop',
    '1761': 'desktopFull'
}
```

Module works by Rx streams. In our case it works with resizes of screen. Which is stream will be observable decide developer.

In common cases uses free streams by three events:
    - Full page loaded (onload)
    - Full document loaded (DOMContentLoaded)
    - Resize screen (onresize)

## Usage
Set module (it use RxJS, that why module shold be accessible in environment).

index.js:

```js
import screenViewer from './screenViewer';
```

You can set up types map, if you need it.

```js
screenViewer.setup({
    '320': 'mobile',
    '700': 'tablet',
    '1200': 'desktop'
})
```

init$ method receive array of streams filtered by size of screen.

```js
import { Observable } from 'rxjs/Rx';

const targetEventList = [
    Observable.fromEvent(window, 'load'),
    Observable.fromEvent(document, 'DOMContentLoaded'),
    Observable.fromEvent(window, 'resize')
]

const screen$ = screenViewer.init$(targetEventList)
```

Now we can subscribe to stream, that will change data in moment when type of screen changed.

```js
screen$.subscribe(console.log)
```
