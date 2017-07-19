var convert = require("./h/node/convert")
var h = require("./h/element")

module.exports = function morph(element, node) {
  var tag = element.tagName
  var attributes = element.attributes
  var children = element.childNodes
  if (typeof tag !== typeof node.tag || tag !== node.tag.toUpperCase()) {
    if (typeof node === "string") {
      var newElement = document.createTextNode(node)
    } else {
      var newElement = convert(h, node)
    }
    element.parentNode.replaceChild(newElement, element)
  } else {
    for (var i = 0; i < attributes.length; i++) {
      var attribute = attributes[i]
      var name = attribute.name
      if (!(name in node.attributes)) {
        element.removeAttribute(attribute.name)
      }
    }
    for (var name in node.attributes) {
      var value = node.attributes[name]
      element.setAttribute(name, value)
    }
    for (var i = node.children.length; i < children.length; i++) {
      var child = children[i]
      var newChild = node.children[i]
      if (!newChild) {
        element.removeChild(child)
      }
    }
    for (var i = 0; i < node.children.length; i++) {
      var child = children[i]
      var newChild = node.children[i]
      if (!child) {
        element.appendChild(convert(h, newChild))
      } else if (child instanceof Element || typeof newChild === "object") {
        morph(child, newChild)
      } else {
        child.data = newChild
      }
    }
  }
  return element
}
