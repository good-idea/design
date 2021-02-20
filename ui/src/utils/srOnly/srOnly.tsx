import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  overflow: hidden;
`

/**
 * @public
 */
export function SrOnly(props: {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  children?: React.ReactNode
}): React.ReactElement {
  const {as, children} = props

  return (
    <Root aria-hidden as={as} data-ui="SrOnly">
      {children}
    </Root>
  )
}
