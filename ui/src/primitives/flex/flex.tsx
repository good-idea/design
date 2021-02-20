import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  _flexItemStyle,
  _FlexItemStyleProps,
  _responsiveFlexStyle,
  _ResponsiveFlexStyleProps,
} from '../../styles'
import {Box, BoxProps} from '../box'
import {ResponsiveFlexProps, ResponsiveFlexItemProps} from '../types'

/**
 * @public
 */
export interface FlexProps extends BoxProps, ResponsiveFlexProps, ResponsiveFlexItemProps {}

const Root = styled(Box)<_FlexItemStyleProps & _ResponsiveFlexStyleProps>(
  _flexItemStyle,
  _responsiveFlexStyle
)

/**
 * @public
 */
export const Flex = forwardRef((props: FlexProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {align, as, direction = 'row', justify, wrap, ...restProps} = props

  return (
    <Root
      data-ui="Flex"
      {...restProps}
      $align={align}
      $direction={direction}
      $justify={justify}
      $wrap={wrap}
      forwardedAs={as}
      ref={ref}
    />
  )
})

Flex.displayName = 'Flex'
