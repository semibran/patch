module.exports = function convert(h, node) {
  if (!node) return undefined
  if (typeof node !== "object") {
    return node
  }
  var tag = node.tag
  var attributes = node.attributes
  var length = node.children.length
  var children = new Array(length)
  for (var i = 0; i < length; i++) {
    var child = node.children[i]
    children[i] = convert(h, child)
  }
  return h(tag, attributes, children)
}
