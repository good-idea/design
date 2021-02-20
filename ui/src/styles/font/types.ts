import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'

/**
 * @internal
 */
export interface _ResponsiveFontSizeStyleProps {
  $size?: number | number[]
}

/**
 * @internal
 */
export interface _FontWeightStyleProps {
  $weight?: ThemeFontWeightKey
}

/**
 * @internal
 */
export interface _ResponsiveTextAlignStyleProps {
  $align?: TextAlign | TextAlign[]
}

/**
 * @internal
 */
export interface _ResponsiveFontStyleProps
  extends _FontWeightStyleProps,
    _ResponsiveFontSizeStyleProps {
  $accent?: boolean
  $muted?: boolean
}
