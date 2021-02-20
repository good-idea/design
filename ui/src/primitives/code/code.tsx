import React, {forwardRef} from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components'
import {_responsiveCodeFontStyle, _ResponsiveFontStyleProps} from '../../styles'
import {codeBaseStyle} from './styles'

/**
 * @public
 */
export interface CodeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  language?: string
  size?: number | number[]
  weight?: string
}

const Root = styled.pre<_ResponsiveFontStyleProps>(codeBaseStyle, _responsiveCodeFontStyle)

/**
 * @public
 */
export const Code = forwardRef(
  (props: CodeProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {children, language: languageProp, size = 2, weight, ...restProps} = props
    const language = typeof languageProp === 'string' ? languageProp : undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const registered = language ? Refractor.hasLanguage(language as any) : false

    return (
      <Root data-ui="Code" {...restProps} $size={size} $weight={weight} ref={ref}>
        {!(language && registered) && <code>{children}</code>}
        {language && registered && (
          <Refractor inline language={language} value={String(children)} />
        )}
      </Root>
    )
  }
)

Code.displayName = 'Code'
