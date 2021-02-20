/**
 * @internal
 */
export function _isHTMLElement(node: unknown): node is HTMLElement {
  return node instanceof Node && node.nodeType === Node.ELEMENT_NODE
}

/**
 * @internal
 */
export function _isHTMLAnchorElement(element: unknown): element is HTMLAnchorElement {
  return _isHTMLElement(element) && element.nodeName === 'A'
}

/**
 * @internal
 */
export function _isHTMLInputElement(element: unknown): element is HTMLInputElement {
  return _isHTMLElement(element) && element.nodeName === 'INPUT'
}

/**
 * @internal
 */
export function _isHTMLButtonElement(element: unknown): element is HTMLButtonElement {
  return _isHTMLElement(element) && element.nodeName === 'BUTTON'
}

/**
 * @internal
 */
export function _isHTMLSelectElement(element: unknown): element is HTMLSelectElement {
  return _isHTMLElement(element) && element.nodeName === 'SELECT'
}

/**
 * @internal
 */
export function _isHTMLTextAreaElement(element: unknown): element is HTMLTextAreaElement {
  return _isHTMLElement(element) && element.nodeName === 'TEXTAREA'
}
