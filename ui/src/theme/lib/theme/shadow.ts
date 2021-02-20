/**
 * @public
 */
export type BoxShadow = [
  // offsetX, offsetY, blurRadius, spreadRadius
  number,
  number,
  number,
  number
]

/**
 * @public
 */
export interface ThemeShadow {
  umbra: BoxShadow
  penumbra: [number, number, number, number]
  ambient: [number, number, number, number]
}
