/**
 * @internal
 */
export type _BoxSizing = 'content' | 'border'

/**
 * @internal
 */
export type _BoxDisplay = 'none' | 'block' | 'grid' | 'flex' | 'inline-block'

/**
 * @internal
 */
export type _BoxHeight = 'stretch' | 'fill'

/**
 * @internal
 */
export type _BoxOverflow = 'visible' | 'hidden' | 'auto'

/**
 * @internal
 */
export interface _ResponsiveBoxStyleProps {
  $display?: _BoxDisplay | _BoxDisplay[]
  $height?: _BoxHeight | _BoxHeight[]
  $overflow?: _BoxOverflow | _BoxOverflow[]
  $sizing?: _BoxSizing | _BoxSizing[]
}
