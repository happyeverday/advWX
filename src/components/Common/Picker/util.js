export function getElement (expr) {
  return (typeof expr === 'string') ? document.querySelector(expr) : expr
}

export function getComputedStyle (el, key) {
  var computedStyle = window.getComputedStyle(el)
  return computedStyle[key] || ''
}

export function easeOutCubic (pos) {
  return (Math.pow((pos - 1), 3) + 1)
}

export function easeInOutCubic (pos) {
  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(pos, 3)
  }
  return 0.5 * (Math.pow((pos - 2), 3) + 2)
}
