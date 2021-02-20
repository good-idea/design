import {CSSObject} from 'styled-components'
import {_ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {_ResponsiveFontStyleProps} from './types'

/**
 * Get responsive CSS for the `text` font style.
 * @internal
 */
export function _responsiveTextFont(props: _ResponsiveFontStyleProps & _ThemeProps): CSSObject[] {
  return responsiveFont('text', props)
}
