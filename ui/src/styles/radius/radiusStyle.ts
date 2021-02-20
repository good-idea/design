import {CSSObject} from 'styled-components'
import {_getResponsiveProp, rem, _responsive} from '../helpers'
import {_ThemeProps} from '../types'
import {_ResponsiveRadiusStyleProps} from './types'

/**
 * @internal
 */
export function _responsiveRadiusStyle(
  props: _ResponsiveRadiusStyleProps & _ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media, radius} = theme.sanity

  return _responsive(media, _getResponsiveProp(props.$radius), (radiusIndex) => ({
    borderRadius: rem(radius[radiusIndex]),
  }))
}
