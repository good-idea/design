import React, {useMemo} from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {ThemeColorSchemeKey, ThemeColorName} from './lib/theme'
import {ThemeContext, ThemeContextValue} from './themeContext'
import {RootTheme, Theme} from './types'

export function ThemeProvider(props: {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  theme: RootTheme
  tone?: ThemeColorName
}) {
  const {children, scheme = 'light', theme: rootTheme, tone = 'default'} = props

  const theme: Theme = useMemo(() => {
    const {color: rootColor, ...restTheme} = rootTheme
    const colorScheme = rootColor[scheme] || rootColor.light
    const color = colorScheme[tone] || colorScheme.default

    return {sanity: {...restTheme, color}}
  }, [rootTheme, scheme, tone])

  const value: ThemeContextValue = useMemo(
    () => ({
      version: 0.0,
      theme: rootTheme,
      scheme,
      tone,
    }),
    [rootTheme, scheme, tone]
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
