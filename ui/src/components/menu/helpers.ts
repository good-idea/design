import {_isHTMLAnchorElement, _isHTMLButtonElement} from '../../helpers'

function isFocusable(element: HTMLElement) {
  return (
    (_isHTMLAnchorElement(element) && element.getAttribute('data-disabled') !== 'true') ||
    (_isHTMLButtonElement(element) && !element.disabled)
  )
}

export function getFocusableElements(
  elements: HTMLElement[]
): {element: HTMLElement; focusable: boolean}[] {
  return elements.map((element) => {
    return {element, focusable: isFocusable(element)}
  })
}
