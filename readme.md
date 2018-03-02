# morph
> simple diff and patch operation for DOM elements

```js
let element = document.createElement("h1")
element.innerText = "hello world"
document.body.appendChild(element)

morph(element, {
  tag: "h1",
  attributes: {},
  children: [ "goodbye world" ]
})
```

## usage
[![npm badge]][npm package]

### `result = morph(element, node)`
Alters the properties of `element` to match those specified by `node`, and returns `result`.

* `element`: the `HTMLElement` to be morphed
* `node`: a virtual node of the structure `{ tag, attributes, children }` against which `element` is compared

Note that if `element.tagName !== node.tag`, `element` and `result` will be different as there is no way to alter an element's tag once it is created. If there is even a slight chance of `node.tag` being changed, you may want to set `element` to the return value of the function just to be safe.

[npm package]: https://npmjs.com/package/@semibran/morph
[npm badge]:   https://nodei.co/npm/@semibran/morph.png?mini
