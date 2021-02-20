import React, {useMemo} from 'react'
import {BoundaryElementContext} from './boundaryElementContext'
import {BoundaryElementContextValue} from './types'

/**
 * @public
 */
export function BoundaryElementProvider(props: {
  children: React.ReactNode
  element: HTMLElement | null
}): React.ReactElement {
  const {children, element} = props
  const value: BoundaryElementContextValue = useMemo(() => ({version: 0.0, element}), [element])

  return <BoundaryElementContext.Provider value={value}>{children}</BoundaryElementContext.Provider>
}
