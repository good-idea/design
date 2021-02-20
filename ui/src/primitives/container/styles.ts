import {CSSObject} from 'styled-components'
import {_getResponsiveProp, rem, _responsive, _ThemeProps} from '../../styles'
import {_ResponsiveWidthStyleProps} from './types'

export function containerBaseStyle(): CSSObject {
  return {width: '100%', margin: '0 auto'}
}

export function responsiveContainerWidthStyle(
  props: _ResponsiveWidthStyleProps & _ThemeProps
): CSSObject[] {
  const {theme} = props
  const {container, media} = theme.sanity

  return _responsive(media, _getResponsiveProp(props.$width), (val) => ({
    maxWidth: val === 'auto' ? 'none' : rem(container[val]),
  }))
}
