# patch
> efficient patch operation for HTML elements

```js
let element = document.createElement("h1")
element.innerText = "hello world"
document.body.appendChild(element)

patch(element, {
  tag: "h1",
  attributes: {},
  children: [ "goodbye world" ]
})
```

## usage
[![npm badge]][npm package]

To use this module in your project, package your code together using a bundler like [`rollup`][rollup/rollup] together with [`rollup-plugin-node-resolve`][rollup/rollup-plugin-node-resolve].

### `result = patch(element, node)`
Alters the properties of `element` to match those specified by `node`, and returns `result`.

* `element`: the `HTMLElement` to be patched
* `node`: a virtual node of the structure `{ tag, attributes, children }` against which `element` is compared

Note that if `element.tagName` and `node.tag` are different, `result` will be a brand new element. This behavior is caused by an interesting property of the `HTMLElement` interface that prevents an element's tag from being changed once it is created. The only workaround is to instantiate a new element to replace the old one, meaning that you may want to reset `element` to the return value of the `patch` function every time it is called if there is any chance of `node.tag` being changed. Otherwise, you run the risk of "jamming" the element in question, reaching a state in which any changes made to `element` are no longer reflected onscreen.

## related
* [`semibran/manifest`][semibran/manifest]: convert virtual DOM nodes into HTML elements

[npm package]:                       https://npmjs.com/package/@semibran/patch
[npm badge]:                         https://nodei.co/npm/@semibran/patch.png?mini
[rollup/rollup]:                     https://github.com/rollup/rollup
[rollup/rollup-plugin-node-resolve]: https://github.com/rollup/rollup-plugin-node-resolve
[semibran/manifest]:                 https://github.com/semibran/manifest
