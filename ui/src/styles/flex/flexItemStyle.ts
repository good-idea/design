import {CSSObject} from 'styled-components'
import {_getResponsiveProp, _responsive} from '../helpers'
import {_ThemeProps} from '../types'
import {_ResponsiveFlexItemStyleProps} from './types'

const ROOT_STYLE: CSSObject = {minWidth: 0, minHeight: 0}

/**
 * @internal
 */
export function _flexItemStyle(): Array<
  CSSObject | ((props: _ResponsiveFlexItemStyleProps & _ThemeProps) => CSSObject[])
> {
  return [ROOT_STYLE, _responsiveFlexItemStyle]
}

/**
 * @internal
 */
export function _responsiveFlexItemStyle(
  props: _ResponsiveFlexItemStyleProps & _ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, _getResponsiveProp(props.$flex), (flex) => ({flex}))
}
