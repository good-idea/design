import {CSSObject} from 'styled-components'
import {_getResponsiveProp, rem, _responsive} from '../helpers'
import {_ThemeProps} from '../types'

/**
 * @internal
 */
export interface _TextInputResponsivePaddingStyleProps {
  $fontSize?: number | number[]
  $iconLeft?: boolean
  $iconRight?: boolean
  $padding?: number | number[]
  $space?: number | number[]
}

/**
 * @internal
 */
export function _responsiveInputPaddingStyle(
  props: _TextInputResponsivePaddingStyleProps & _ThemeProps
): CSSObject[] {
  const {$iconLeft, $iconRight, theme} = props
  const {fonts, media, space: spaceScale} = theme.sanity
  const padding = _getResponsiveProp(props.$padding, [0])
  const space = _getResponsiveProp(props.$space, [0])
  const size = _getResponsiveProp(props.$fontSize, [0])
  const len = Math.max(padding.length, space.length, size.length)
  const _padding: number[] = []
  const _space: number[] = []
  const _size: number[] = []

  for (let i = 0; i < len; i += 1) {
    _padding[i] = padding[i] === undefined ? _padding[i - 1] : padding[i]
    _space[i] = space[i] === undefined ? _space[i - 1] : space[i]
    _size[i] = size[i] === undefined ? _size[i - 1] : size[i]
  }

  return _responsive(media, _padding, (_, i) => {
    const fontSize = fonts.text.sizes[_size[i]] || fonts.text.sizes[2]
    const emSize = fontSize.lineHeight - fontSize.ascenderHeight - fontSize.descenderHeight
    const p = spaceScale[_padding[i]]
    const s = spaceScale[_space[i]]

    const styles = {
      paddingTop: rem(p - fontSize.ascenderHeight),
      paddingRight: rem(p),
      paddingBottom: rem(p - fontSize.descenderHeight),
      paddingLeft: rem(p),
    }

    if ($iconRight) styles.paddingRight = rem(p + emSize + s)
    if ($iconLeft) styles.paddingLeft = rem(p + emSize + s)

    return styles
  })
}

/**
 * @internal
 */
export function _responsiveInputPaddingIconsStyle(
  props: {
    padding?: number | number[]
    size?: number | number[]
    space?: number | number[]
  } & _ThemeProps
): CSSObject[] {
  return _responsiveInputPaddingStyle({...props, $iconLeft: true, $iconRight: true})
}

/**
 * @internal
 */
export function _responsiveInputPaddingIconLeftStyle(
  props: {
    padding?: number | number[]
    size?: number | number[]
    space?: number | number[]
  } & _ThemeProps
): CSSObject[] {
  return _responsiveInputPaddingStyle({...props, $iconLeft: true})
}

/**
 * @internal
 */
export function _responsiveInputPaddingIconRightStyle(
  props: {
    padding?: number | number[]
    size?: number | number[]
    space?: number | number[]
  } & _ThemeProps
): CSSObject[] {
  return _responsiveInputPaddingStyle({...props, $iconRight: true})
}
