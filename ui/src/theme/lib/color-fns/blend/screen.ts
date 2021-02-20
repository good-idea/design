import {_clamp} from '../internal'
import {_RGB} from '../types'

/**
 * Apply the `screen` blend mode
 *
 * @see {@link https://www.w3.org/TR/compositing-1/#blendingscreen|The W3C screen blend mode specification}
 *
 * @internal
 */
export function _screen(b: _RGB, s: _RGB): _RGB {
  return {
    r: Math.round(_clamp(_screenChannel(b.r / 255, s.r / 255) * 255)),
    g: Math.round(_clamp(_screenChannel(b.g / 255, s.g / 255) * 255)),
    b: Math.round(_clamp(_screenChannel(b.b / 255, s.b / 255) * 255)),
  }
}

/**
 * @internal
 */
function _screenChannel(b: number, s: number) {
  return b + s - b * s
}
