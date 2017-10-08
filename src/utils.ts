export function setAttributes(el, attrs) {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

export function isTouchDeivce() {
  return 'ontouchstart' in document.documentElement;
}
