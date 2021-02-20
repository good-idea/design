import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {
  _responsiveInputPaddingStyle,
  _responsiveRadiusStyle,
  _ResponsiveRadiusStyleProps,
  _textInputStyle,
  _TextInputResponsivePaddingStyleProps,
  _TextInputInputStyleProps,
  _TextInputRepresentationStyleProps,
} from '../../styles'
import {ThemeFontWeightKey} from '../../theme'
import {ResponsiveRadiusProps} from '../types'

/**
 * @public
 */
export interface TextAreaProps extends ResponsiveRadiusProps {
  border?: boolean
  customValidity?: string
  fontSize?: number | number[]
  padding?: number | number[]
  weight?: ThemeFontWeightKey
}

const Root = styled.span(_textInputStyle.root as any)

const InputRoot = styled.span`
  flex: 1;
  min-width: 0;
  display: block;
  position: relative;
`

const Input = styled.textarea<_TextInputResponsivePaddingStyleProps & _TextInputInputStyleProps>(
  _responsiveInputPaddingStyle,
  _textInputStyle.input
)

const Presentation = styled.div<_ResponsiveRadiusStyleProps & _TextInputRepresentationStyleProps>(
  _responsiveRadiusStyle,
  _textInputStyle.representation
)

/**
 * @public
 */
export const TextArea = forwardRef(
  (
    props: TextAreaProps & Omit<React.HTMLProps<HTMLTextAreaElement>, 'as'>,
    forwardedRef: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const {
      border = true,
      customValidity,
      disabled = false,
      fontSize = 2,
      padding = 3,
      radius = 1,
      ...restProps
    } = props

    const ref = useForwardedRef(forwardedRef)

    useCustomValidity(ref, customValidity)

    return (
      <Root data-ui="TextArea">
        <InputRoot>
          <Input
            data-as="textarea"
            {...restProps}
            $fontSize={fontSize}
            $padding={padding}
            disabled={disabled}
            ref={ref}
          />
          <Presentation $border={border} $radius={radius} />
        </InputRoot>
      </Root>
    )
  }
)

TextArea.displayName = 'TextArea'
