import {CSSObject} from 'styled-components'
import {_ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {_ResponsiveFontStyleProps} from './types'

/**
 * Get responsive CSS for the `heading` font style.
 * @internal
 */
export function _responsiveHeadingFont(
  props: _ResponsiveFontStyleProps & _ThemeProps
): CSSObject[] {
  return responsiveFont('heading', props)
}
