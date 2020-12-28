// patch(Element, vnode) -> window.
// Updates an existing DOM element to match the given vnode.
// The returned element may be used in case the element's tag changes,
// at which point a new element needs to be created.
export default function patch (elem, node) {
  if (!(elem instanceof window.Element || elem instanceof window.Text)) {
    throw new Error('Patch operation failed: Provided target is not an Element or Text node')
  }

  if (Array.isArray(node)) {
    throw new Error('Patch operation failed: Cannot patch from an array of nodes')
  }

  let tag = elem.tagName
  let props = elem.attributes
  let content = elem.childNodes

  // just create a new element if the new tag is different
  if (!tag
  || typeof tag !== typeof node.tag
  || tag !== node.tag.toUpperCase()
  || elem.key !== node.props.key
  ) {
    const newelem = manifest(node)
    if (elem.parentNode) {
      elem.parentNode.replaceChild(newelem, elem)
    }
    return newelem
  }

  // leave keyed elements alone
  // TODO: use keys when rearranging child configurations
  if (elem.key) return elem

  // remove attributes on old element
  // if they are missing from new node
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const key = prop.name
    if (!node.props[key]) {
      elem.removeAttribute(key)
    }
  }

  // add new node attributes to old element
  // if they are missing from old element
  for (const key in node.props) {
    const val = node.props[key]
    if (typeof val === 'function') {
      if (elem[key] === val) continue
      elem[key] = val
    } else if (key === 'key') {
      elem.key = val
    } else if (elem.getAttribute(key) !== val.toString()) {
      elem.setAttribute(key, val)
    }
  }

  // ignore whitespace in old element
  for (let i = 0; i < content.length; i++) {
    const child = content[i]
    if (child instanceof window.Text && !child.data.trim()) {
      elem.removeChild(child)
    }
  }

  // remove null children in new node
  for (let i = 0; i < node.content.length; i++) {
    if (node.content[i] == null) {
      node.content.splice(i--, 1)
    }
  }

  // remove extra children from old element
  // if they are missing from new element
  // TODO: determine if there's a faster way
  //   to find which elements were removed
  while (content.length > node.content.length) {
    elem.removeChild(content[content.length - 1])
  }

  // patch remaining children
  for (let i = 0; i < node.content.length; i++) {
    let child = content[i]
    const newchild = node.content[i]
    if (!child) {
      // nothing to patch, add a new element
      child = manifest(newchild)
      if (child) el.appendChild(child)
    } else if (child instanceof window.Element || typeof newchild === 'object') {
      // general situation: patch existing child to reflect new child data
      patch(child, newchild)
    } else if (child.data !== newchild) {
      // for textnode: just change content
      child.data = newchild
    }
  }

  return el
}

// manifest(node) -> Element
// Converts a vnode and all its children to a DOM element.
function manifest (node) {
  // ignore if node is already an element
  // useful for stateful elements eg. canvas
  if (node instanceof window.Element) return node

  // convert strings to text nodes
  if (typeof node === 'string') {
    return document.createTextNode(node)
  }

  const tag = node.tag
  const props = node.props
  const content = node.content
  const el = document.createElement(tag)

  // assign attributes
  for (const name in props) {
    const value = props[name]
    el[name] = value
    // don't display eg. event handlers as attributes
    if (typeof value !== 'function') {
      el.setAttribute(name, value)
    }
  }

  // handle children
  for (let i = 0; i < content.length; i++) {
    // ignore null and undefined children
    if (content[i] == null) continue

    // recurse until all children are DOM elements
    const child = manifest(content[i])
    if (!child) continue

    el.appendChild(child)
  }

  return el
}
