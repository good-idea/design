import {_clamp} from '../internal'
import {_RGB} from '../types'

/**
 * Apply the `multiply` blend mode
 *
 * @see {@link https://www.w3.org/TR/compositing-1/#blendingmultiply|The W3C screen multiply mode specification}
 *
 * @internal
 */
export function _multiply(b: _RGB, s: _RGB): _RGB {
  return {
    r: Math.round(_clamp(_multiplyChannel(b.r / 255, s.r / 255) * 255)),
    g: Math.round(_clamp(_multiplyChannel(b.g / 255, s.g / 255) * 255)),
    b: Math.round(_clamp(_multiplyChannel(b.b / 255, s.b / 255) * 255)),
  }
}

/**
 * @internal
 */
function _multiplyChannel(b: number, s: number) {
  return b * s
}
