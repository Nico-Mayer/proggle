const isItIn = function (parent, child) {
  let parentBounds = parent.getBoundingClientRect()
  let childBounds = child.getBoundingClientRect()

  if (
    childBounds.top < parentBounds.top ||
    childBounds.right > parentBounds.right ||
    childBounds.bottom > parentBounds.bottom ||
    childBounds.left < parentBounds.left
  ) {
    return false
  }
  return true
}

export default isItIn
