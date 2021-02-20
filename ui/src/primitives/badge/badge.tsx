import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {_responsiveRadiusStyle, _ResponsiveRadiusStyleProps} from '../../styles'
import {Box, BoxProps} from '../box'
import {Label} from '../label'
import {ResponsiveRadiusProps} from '../types'
import {badgeStyle} from './styles'
import {BadgeStyleProps, BadgeMode, BadgeTone} from './types'

/**
 * @public
 */
export interface BadgeProps extends BoxProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  mode?: BadgeMode
  tone?: BadgeTone
}

const Root = styled(Box)<BadgeStyleProps & _ResponsiveRadiusStyleProps>(
  _responsiveRadiusStyle,
  badgeStyle
)

/**
 * @public
 */
export const Badge = forwardRef((props: BadgeProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {
    children,
    fontSize,
    mode = 'default',
    padding = 1,
    radius = 2,
    tone = 'default',
    ...restProps
  } = props

  return (
    <Root
      data-ui="Badge"
      {...restProps}
      $mode={mode}
      $tone={tone}
      $radius={radius}
      padding={padding}
      ref={ref}
    >
      <Label size={fontSize}>{children}</Label>
    </Root>
  )
})

Badge.displayName = 'Badge'
