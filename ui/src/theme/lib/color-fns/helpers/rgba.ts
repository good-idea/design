import {_parseColor} from '../parse'

/**
 * @internal
 */
export function _rgba(color: unknown, a: number): string {
  const rgb = _parseColor(color)

  return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`
}
