<h1 align="center">houdini-toolkit - convenient set of useful tools for working with the CSS Houdini APIs</h1>

<div align="center">

[![npm-version](https://img.shields.io/npm/v/houdini-toolkit?logo=npm&color=0183ff&style=for-the-badge)](https://www.npmjs.com/package/houdini-toolkit)
[![discussions](https://img.shields.io/badge/discussions-0183ff?style=for-the-badge&logo=github&labelColor=555555)](https://github.com/houdini-toolkit/houdini-toolkit/discussions)
[![license](https://img.shields.io/badge/MIT-0183ff?style=for-the-badge&label=license&logoColor=FFF&labelColor=555555)](https://github.com/houdini-toolkit/houdini-toolkit/blob/main/LICENSE)

</div>

<div align="center"><a href="https://github.com/houdini-toolkit/examples/tree/main/paint">Paint API examples</a> • <a href="https://github.com/houdini-toolkit/examples">Examples</a></div>

## About

An actively developed set of tools for working with the CSS Houdini APIs, simplifying the coding process. All tools are based on the [documentation on this topic](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Houdini).

## Example
A small example of the module in action (It is worth considering that this example uses import. In order for the code to work, needs to rebuild the file. JavaScript module builders are suitable for this):

### TypeScript
```typescript
/* checkboardWorklet.ts */
import {
  DOMString,
  PaintFunction,
  PaintGeometry,
  createPaint
} from "houdini-toolkit";

const paintName: DOMString = "checkerboard";
const paintFunction: PaintFunction = (
  ctx: CanvasRenderingContext2D,
  geom: PaintGeometry,
  properties: StylePropertyMapReadOnly
) => {
  const colors = ["red", "green", "blue"];
  const size = 32;
  for (let y = 0; y < geom.height / size; y++) {
    for (let x = 0; x < geom.width / size; x++) {
      const color = colors[(x + y) % colors.length];
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.rect(x * size, y * size, size, size);
      ctx.fill();
    }
  }
};
createPaint(paintName, paintFunction);
```

### Javascript
```javascript
/* checkboardWorklet.js */
import { createPaint } from "houdini-toolkit";

createPaint("checkerboard", (ctx, geom, properties) => {
  const colors = ["red", "green", "blue"];
  const size = 32;
  for (let y = 0; y < geom.height / size; y++) {
    for (let x = 0; x < geom.width / size; x++) {
      const color = colors[(x + y) % colors.length];
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.rect(x * size, y * size, size, size);
      ctx.fill();
    }
  }
});
```

### HTML

```html
<script>
  CSS.paintWorklet.addModule("checkboardWorklet.js");
</script>
```

### CSS

```css
li {
  background-image: paint(checkerboard);
}
```

The example is based on the code from [this section](https://developer.mozilla.org/en-US/docs/Web/API/PaintWorkletGlobalScope/registerPaint#examples) of the documentation.

## Table of contents

1. <a href="#installation">Installation</a>
2. <a href="#compability">Compability</a>
3. <a href="#documentation">Documentation:</a>
    - <a href="#createPaint">createPaint</a>
    - <a href="#isPaintSupported">isPaintSupported</a>
4. <a href="#inspiration">Inspiration</a>
5. <a href="#license">License</a>

<div id="installation"></div>

## Installation

The installation process occurs by entering the following command in the terminal:

```bash
npm i houdini-toolkit
```

Access to npm occurs by installing [Node.js](https://nodejs.org/en).

<div id="compability"></div>

## Compability

CSS Houdini is a set of APIs that expose parts of the CSS engine. Some or all parts of the API may not be supported in browsers. Let's say the browser compatibility of the CSS Painting API is as follows (at the time of writing the README):

<table>
    <tr>
        <td></td>
        <td colspan="5">Desktop</td>
        <td colspan="6">Phone</td>
    </tr>
    <tr>
        <td></td>
        <td>Chrome</td>
        <td>Edge</td>
        <td>Firefox</td>
        <td>Opera</td>
        <td>Safari</td>
        <td>Chrome Android</td>
        <td>Firefox for Android</td>
        <td>Opera Android</td>
        <td>Safari on iOS</td>
        <td>Samsung Internet</td>
        <td>WebView Android</td>
    </tr>
    <tr>
      <td>PaintWorkletGlobalScope</td>
      <td>:white_check_mark: 65+</td>
      <td>:white_check_mark: 79+</td>
      <td>:x:</td>
      <td>:white_check_mark: 52+</td>
      <td>:x:</td>
      <td>:white_check_mark: 65+</td>
      <td>:x:</td>
      <td>:white_check_mark: 47+</td>
      <td>:x:</td>
      <td>:white_check_mark: 9.0+</td>
      <td>:white_check_mark: 65+</td>
    </tr>
    <tr>
      <td>devicePixelRatio</td>
      <td>:white_check_mark: 65+</td>
      <td>:white_check_mark: 79+</td>
      <td>:x:</td>
      <td>:white_check_mark: 52+</td>
      <td>:x:</td>
      <td>:white_check_mark: 65+</td>
      <td>:x:</td>
      <td>:white_check_mark: 47+</td>
      <td>:x:</td>
      <td>:white_check_mark: 9.0+</td>
      <td>:white_check_mark: 65+</td>
    </tr>
    <tr>
      <td>registerPaint</td>
      <td>:white_check_mark: 65+</td>
      <td>:white_check_mark: 79+</td>
      <td>:x:</td>
      <td>:white_check_mark: 52+</td>
      <td>:x:</td>
      <td>:white_check_mark: 65+</td>
      <td>:x:</td>
      <td>:white_check_mark: 47+</td>
      <td>:x:</td>
      <td>:white_check_mark: 9.0+</td>
      <td>:white_check_mark: 65+</td>
    </tr>
</table>

The results are based on [this table](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API#browser_compatibility) in the documentation.

<div id="documentation"></div>

## Documentation

This section will describe all the functionality of houdini-toolkit. It may be supplemented when new versions are released.

<div id="createPaint"></div>

### createPaint

The createPaint() function registers a class to programmatically generate an image where a CSS property expects a file. This function is based on the [registerPaint()](https://developer.mozilla.org/en-US/docs/Web/API/PaintWorkletGlobalScope/registerPaint) method of the [PaintWorkletGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/PaintWorkletGlobalScope) interface.

#### Arguments
<table>
  <tr>
    <td>Argument name</td>
    <td>Value</td>
  </tr>
  <tr>
    <td>Name</td>
    <td>DOMString</td>
  </tr>
  <tr>
    <td>Paint Function</td>
    <td>VoidFunction</td>
  </tr>
    <tr>
    <td>Options</td>
    <td>Object of values that are found in PaintRenderingContext2DSettings in getters.</td>
  </tr>
</table>

All values must conform to the types described [on this site](https://drafts.css-houdini.org/css-paint-api/#dom-paintworkletglobalscope-registerpaint). A module may not contain exact types.

#### Example:

##### JavaScript
```javascript
import { createPaint } from "houdini-toolkit";

createPaint("checkerboard", (ctx, geom, properties) => {
  const colors = ["red", "green", "blue"];
  const size = 32;
  for (let y = 0; y < geom.height / size; y++) {
    for (let x = 0; x < geom.width / size; x++) {
      const color = colors[(x + y) % colors.length];
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.rect(x * size, y * size, size, size);
      ctx.fill();
    }
  }
}, {
    inputProperties: ['--foo'],
    inputArguments: ['<color>'],
    contextOptions: { alpha: true }
});
```

##### TypeScript

```typescript
import {
  DOMString,
  PaintFunction,
  PaintGeometry,
  ContextOptions,
  InputArguments,
  InputProperties,
  PaintOptions,
  createPaint
} from "houdini-toolkit";

const paintName: DOMString = "checkerboard";
const inputProperties: InputProperties = ["--foo"];
const inputArguments: InputArguments = ["<color>"];
const contextOptions: ContextOptions = { alpha: true };
const paintOptions: PaintOptions = {
  inputProperties,
  inputArguments,
  contextOptions
};
const paintFunction: PaintFunction = (
  ctx: CanvasRenderingContext2D,
  geom: PaintGeometry,
  properties: StylePropertyMapReadOnly
) => {
  const colors = ["red", "green", "blue"];
  const size = 32;
  for (let y = 0; y < geom.height / size; y++) {
    for (let x = 0; x < geom.width / size; x++) {
      const color = colors[(x + y) % colors.length];
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.rect(x * size, y * size, size, size);
      ctx.fill();
    }
  }
};
createPaint(paintName, paintFunction, paintOptions);
```

<div id="isPaintSupported"></div>

### isPaintSupported

`isPaintSupported` checks if the Paint API is supported. Let's say the Safari Paint API is not supported in the browser, so the value will be `false`.

#### Example

```javascript
import { isPaintSupported } from "houdini-toolkit";

if (isPaintSupported) {
  CSS.paintWorklet.addModule("checkboardWorklet.js");
}
```

<div id="inspiration"></div>

## Inspiration

If you like the toolkit, it will be very cool if you rate the repository with a star ★

<div id="license"></div>

## License
[Licensed under MIT](https://github.com/houdini-toolkit/houdini-toolkit/blob/main/README.md)
