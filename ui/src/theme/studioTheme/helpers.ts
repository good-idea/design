import {
  _parseColor,
  _rgbToHex,
  _screen as __screen,
  _multiply as __multiply,
} from '../lib/color-fns'

export function multiply(bg: string, fg: string): string {
  const b = _parseColor(bg)
  const s = _parseColor(fg)
  const hex = _rgbToHex(__multiply(b, s))

  return hex
}

export function screen(bg: string, fg: string): string {
  const b = _parseColor(bg)
  const s = _parseColor(fg)
  const hex = _rgbToHex(__screen(b, s))

  return hex
}
