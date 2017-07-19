module.exports = function h(tag, attributes, children) {
  if (!children && (typeof attributes !== 'object' || Array.isArray(attributes))) {
    children = attributes
    attributes = null
  }
  var element = document.createElement(tag)
  for (var key in attributes) {
    var value = attributes[key]
    element.setAttribute(key, value)
  }
  for (var i = 0; i < children.length; i++) {
    var child = children[i]
    if (child instanceof Element) {
      element.appendChild(child)
    } else {
      element.appendChild(document.createTextNode(child))
    }
  }
  return element
}
