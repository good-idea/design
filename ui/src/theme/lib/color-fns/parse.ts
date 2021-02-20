import {_hexToRgb, _hslToRgb} from './convert'
import {_HSL, _RGB} from './types'

const HEX_CHARS = '0123456789ABCDEFabcdef'

const HSL_RE = /hsl\(\s*(\d+)\s*,\s*((\d+(?:\.\d+)?)%)\s*,\s*((\d+(?:\.\d+)?)%)\s*\)/i

/**
 * @internal
 */
function _isHexChars(str: string) {
  for (const c of str) {
    if (HEX_CHARS.indexOf(c) === -1) {
      return false
    }
  }

  return true
}

/**
 * @internal
 */
function _isHex(str: string) {
  if (str[0] !== '#') return false

  // Accept both #000 and #000000
  if (!(str.length === 4 || str.length === 7)) return false

  return _isHexChars(str.slice(1))
}

/**
 * @internal
 */
function _parseHsl(str: string): _HSL {
  const res = HSL_RE.exec(str)

  if (!res) {
    throw new Error(`parseHsl: string is not a HSL color: "${str}"`)
  }

  return {h: parseInt(res[1]), s: parseFloat(res[3]), l: parseFloat(res[5])}
}

/**
 * @internal
 */
export function _parseColor(color: unknown): _RGB {
  if (!color) return {r: 0, g: 0, b: 0}

  if (typeof color !== 'string') {
    throw new Error('parseColor: expected a string')
  }

  if (_isHex(color)) {
    return _hexToRgb(color)
  }

  if (color.startsWith('hsl(')) {
    return _hslToRgb(_parseHsl(color))
  }

  throw new Error(`parseColor: unexpected color format: "${color}"`)
}
