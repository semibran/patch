# patch
> efficient patch operation for matching HTML elements to vnodes

```js
let element = document.createElement('h1')
element.innerText = 'hello world'
document.body.appendChild(element)

patch(element, {
  tag: 'h1',
  props: {},
  content: ['goodbye world']
})
```

## usage
[![npm badge]][npm package]

### `result = patch(elem, node)`
Alters `elem` to match `node` and returns `result`.

* `elem`: the `HTMLElement` to be patched
* `node`: a virtual node of the structure `{ tag, props, content }` against which `elem` is compared

Note that if `elem.tagName` and `node.tag` are different, `result` will be a brand new element. This behavior is caused by a property of the `HTMLElement` interface that prevents an element's tag from being changed once it is created. If there is a chance of the tag name being altered during runtime, make sure to update your element reference to match `result`; otherwise, any changes you make to the new element will not be reflected onscreen.

[npm package]:                       https://npmjs.com/package/@semibran/patch
[npm badge]:                         https://nodei.co/npm/@semibran/patch.png?mini
