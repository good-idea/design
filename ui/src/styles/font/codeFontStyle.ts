import {CSSObject} from 'styled-components'
import {_ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {_ResponsiveFontStyleProps} from './types'

/**
 * Get responsive CSS for the `code` font style.
 * @internal
 */
export function _responsiveCodeFontStyle(
  props: _ResponsiveFontStyleProps & _ThemeProps
): CSSObject[] {
  return responsiveFont('code', props)
}
