import React, {forwardRef} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {
  _responsiveBorderStyle,
  _ResponsiveBorderStyleProps,
  _responsiveRadiusStyle,
  _ResponsiveRadiusStyleProps,
  _responsiveShadowStyle,
  _ResponsiveShadowStyleProps,
} from '../../styles'
import {ThemeColorProvider, ThemeColorSchemeKey, ThemeColorToneKey, useRootTheme} from '../../theme'
import {Box, BoxProps} from '../box'
import {ResponsiveBorderProps, ResponsiveRadiusProps, ResponsiveShadowProps} from '../types'
import {cardStyle} from './styles'
import {_CardStyleProps} from './types'

/**
 * @public
 */
export type CardTone = ThemeColorToneKey | 'inherit'

/**
 * @public
 */
export interface CardProps
  extends BoxProps,
    ResponsiveBorderProps,
    ResponsiveRadiusProps,
    ResponsiveShadowProps {
  scheme?: ThemeColorSchemeKey
  tone?: CardTone
}

const Root = styled(Box)<
  _CardStyleProps &
    _ResponsiveRadiusStyleProps &
    _ResponsiveBorderStyleProps &
    _ResponsiveShadowStyleProps
>(_responsiveBorderStyle, _responsiveRadiusStyle, _responsiveShadowStyle, cardStyle)

/**
 * @public
 */
export const Card = forwardRef(
  (props: CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>, ref) => {
    const {
      as: asProp,
      border,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      radius = 0,
      scheme,
      shadow,
      tone: toneProp = 'default',
      ...restProps
    } = props
    const as = isValidElementType(asProp) ? asProp : 'div'
    const rootTheme = useRootTheme()
    const tone = toneProp === 'inherit' ? rootTheme.tone : toneProp

    return (
      <ThemeColorProvider scheme={scheme} tone={tone}>
        <Root
          data-as={typeof as === 'string' ? as : undefined}
          data-scheme={rootTheme.scheme}
          data-ui="Card"
          data-tone={tone}
          {...restProps}
          $border={border}
          $borderTop={borderTop}
          $borderRight={borderRight}
          $borderBottom={borderBottom}
          $borderLeft={borderLeft}
          $radius={radius}
          $shadow={shadow}
          $tone={tone}
          forwardedAs={as}
          ref={ref}
        />
      </ThemeColorProvider>
    )
  }
)

Card.displayName = 'Card'
