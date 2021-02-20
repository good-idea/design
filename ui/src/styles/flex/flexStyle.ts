import {CSSObject} from 'styled-components'
import {_getResponsiveProp, _responsive} from '../helpers'
import {_ThemeProps} from '../types'
import {_ResponsiveFlexStyleProps} from './types'

const ROOT_STYLE: CSSObject = {'&:not([hidden])': {display: 'flex'}}

/**
 * @internal
 */
export function _responsiveFlexStyle(): Array<
  CSSObject | ((props: _ResponsiveFlexStyleProps & _ThemeProps) => CSSObject[])
> {
  return [
    ROOT_STYLE,
    _responsiveFlexAlignStyle,
    _responsiveFlexWrapStyle,
    _responsiveFlexJustifyStyle,
    _responsiveFlexDirectionStyle,
  ]
}

/**
 * @internal
 */
export function _responsiveFlexAlignStyle(
  props: _ResponsiveFlexStyleProps & _ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, _getResponsiveProp(props.$align), (align) => {
    return {alignItems: align}
  })
}

/**
 * @internal
 */
export function _responsiveFlexWrapStyle(
  props: _ResponsiveFlexStyleProps & _ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, _getResponsiveProp(props.$wrap), (wrap) => {
    return {flexWrap: wrap}
  })
}

/**
 * @internal
 */
export function _responsiveFlexJustifyStyle(
  props: _ResponsiveFlexStyleProps & _ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, _getResponsiveProp(props.$justify), (justify) => {
    return {justifyContent: justify}
  })
}

/**
 * @internal
 */
export function _responsiveFlexDirectionStyle(
  props: _ResponsiveFlexStyleProps & _ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, _getResponsiveProp(props.$direction), (direction) => {
    return {flexDirection: direction}
  })
}
