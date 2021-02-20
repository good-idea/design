import {CSSObject} from 'styled-components'
import {BaseTheme, ThemeColor, ThemeColorName, ThemeColorSchemeKey} from './lib/theme'

/**
 * @public
 */
export type RootTheme = BaseTheme<ThemeCustomStyles>

/**
 * @public
 */
export interface ThemeCustomStyles {
  /**
   * @beta
   */
  __unstable_button?: {
    root?: CSSObject
  }

  /**
   * @beta
   */
  __unstable_card?: {
    root?: CSSObject
  }
}

/**
 * @public
 */
export interface Theme {
  sanity: Omit<RootTheme, 'color'> & {
    color: ThemeColor
  }
}

/**
 * @public
 */
export interface ThemeContextValue {
  version: 0.0
  scheme: ThemeColorSchemeKey
  theme: RootTheme
  tone: ThemeColorName
}
