import {CSSObject} from 'styled-components'
import {_getResponsiveProp, _responsive} from '../helpers'
import {_ThemeProps} from '../types'
import {_ResponsiveTextAlignStyleProps} from './types'

/**
 * Get responsive text align styles.
 * @internal
 */
export function _responsiveTextAlignStyle(
  props: _ResponsiveTextAlignStyleProps & _ThemeProps
): CSSObject[] {
  const {theme} = props

  return _responsive(theme.sanity.media, _getResponsiveProp(props.$align), (textAlign) => {
    return {textAlign}
  })
}
