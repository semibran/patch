module.exports = function convert(h, element) {
  if (element instanceof Text) {
    return element.data
  }
  if (element instanceof Element) {
    var tag = element.tagName
    var attributes = {}
    var length = element.childNodes.length
    var children = new Array(length)
    for (var i = 0; i < element.attributes.length; i++) {
      var attribute = element.attributes[i]
      attributes[attribute.name] = attribute.value
    }
    for (var i = 0; i < length; i++) {
      var child = element.childNodes[i]
      children[i] = convert(h, child)
    }
    return h(tag, attributes, children)
  }
}
