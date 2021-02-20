import {CSSObject} from 'styled-components'
import {_getResponsiveProp, rem, _responsive, _ThemeProps} from '../../styles'

export interface ResponsiveStackSpaceStyleProps {
  $space?: number | number[]
}

export function stackBaseStyle(): CSSObject {
  return {
    '&:not([hidden])': {
      display: 'grid',
    },
    '&[data-as="ul"],&[data-as="ol"]': {
      listStyle: 'none',
    },
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridAutoRows: 'min-content',
  }
}

export function responsiveStackSpaceStyle(
  props: ResponsiveStackSpaceStyleProps & _ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media, space} = theme.sanity

  return _responsive(media, _getResponsiveProp(props.$space), (spaceIndex) => ({
    gridGap: rem(space[spaceIndex]),
  }))
}
