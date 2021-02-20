import {
  _isHTMLElement,
  _isHTMLAnchorElement,
  _isHTMLInputElement,
  _isHTMLButtonElement,
  _isHTMLSelectElement,
  _isHTMLTextAreaElement,
} from './element'

// const globalFocusState = {
//   IgnoreUtilFocusChanges: false,
// }

/**
 * @internal
 */
export function _isFocusable(element: HTMLElement): boolean {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)
  ) {
    return true
  }

  if (_isHTMLAnchorElement(element)) {
    return Boolean(element.href) && element.rel !== 'ignore'
  }

  if (_isHTMLInputElement(element)) {
    return element.type !== 'hidden' && element.type !== 'file' && !element.disabled
  }

  if (
    _isHTMLButtonElement(element) ||
    _isHTMLSelectElement(element) ||
    _isHTMLTextAreaElement(element)
  ) {
    return !element.disabled
  }

  return false
}

/**
 * @internal
 */
export function _attemptFocus(element: HTMLElement): boolean {
  if (!_isFocusable(element)) {
    return false
  }

  // globalFocusState.IgnoreUtilFocusChanges = true

  try {
    element.focus()
  } catch (_) {
    // ignore
  }

  // globalFocusState.IgnoreUtilFocusChanges = false

  return document.activeElement === element
}

/**
 * @internal
 */
export function _focusFirstDescendant(element: HTMLElement): boolean {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i]

    if (_isHTMLElement(child) && (_attemptFocus(child) || _focusFirstDescendant(child))) {
      return true
    }
  }

  return false
}

/**
 * @internal
 */
export function _focusLastDescendant(element: HTMLElement): boolean {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i]

    if (_isHTMLElement(child) && (_attemptFocus(child) || _focusLastDescendant(child))) {
      return true
    }
  }

  return false
}
