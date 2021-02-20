import {CSSObject} from 'styled-components'
import {_getResponsiveProp, _getResponsiveSpace} from '../helpers'
import {_ThemeProps} from '../types'
import {_ResponsiveMarginStyleProps} from './types'

/**
 * @internal
 */
export function _responsiveMarginStyle(
  props: _ResponsiveMarginStyleProps & _ThemeProps
): CSSObject[][] {
  const {theme} = props

  return [
    _getResponsiveSpace(theme, ['margin'], _getResponsiveProp(props.$margin)),
    _getResponsiveSpace(theme, ['marginLeft', 'marginRight'], _getResponsiveProp(props.$marginX)),
    _getResponsiveSpace(theme, ['marginTop', 'marginBottom'], _getResponsiveProp(props.$marginY)),
    _getResponsiveSpace(theme, ['marginTop'], _getResponsiveProp(props.$marginTop)),
    _getResponsiveSpace(theme, ['marginRight'], _getResponsiveProp(props.$marginRight)),
    _getResponsiveSpace(theme, ['marginBottom'], _getResponsiveProp(props.$marginBottom)),
    _getResponsiveSpace(theme, ['marginLeft'], _getResponsiveProp(props.$marginLeft)),
  ].filter(Boolean) as CSSObject[][]
}
