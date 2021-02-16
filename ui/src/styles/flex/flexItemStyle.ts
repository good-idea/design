import {CSSObject} from 'styled-components'
import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexItemStyleProps} from './types'

const ROOT_STYLE: CSSObject = {minWidth: 0, minHeight: 0}

export function flexItemStyle(): Array<
  CSSObject | ((props: ResponsiveFlexItemStyleProps & ThemeProps) => CSSObject[])
> {
  return [ROOT_STYLE, responsiveFlexItemStyle]
}

export function responsiveFlexItemStyle(
  props: ResponsiveFlexItemStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$flex), (flex) => ({flex}))
}
