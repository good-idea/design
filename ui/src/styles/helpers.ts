import {CSSObject} from 'styled-components'
import {EMPTY_ARRAY} from '../constants'
import {Theme} from '../theme'

/**
 * @internal
 */
export function _fillCSSObject(propKeys: string[], value: unknown): CSSObject {
  return propKeys.reduce((obj: CSSObject, propKey) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj[propKey] = value as any

    return obj
  }, {})
}

/**
 * @public
 */
export function rem(pixelValue: number): string | 0 {
  if (pixelValue === 0) return 0

  return `${pixelValue / 16}rem`
}

/**
 * @internal
 */
export function _responsive<T>(
  media: number[],
  values: T[],
  callback: (value: T, index: number, array: T[]) => CSSObject
): CSSObject[] {
  const statements = values.map(callback)

  return statements.map((statement, mediaIndex) => {
    if (mediaIndex === 0) return statement

    return {[`@media screen and (min-width: ${media[mediaIndex - 1]}px)`]: statement}
  })
}

/**
 * @internal
 */
export function _getResponsiveProp<T = number>(val: T | T[] | undefined, defaultVal?: T[]): T[] {
  if (val === undefined) return defaultVal || EMPTY_ARRAY

  return Array.isArray(val) ? val : [val]
}

/**
 * @internal
 */
export function _getResponsiveSpace(
  theme: Theme,
  props: string[],
  spaceIndexes: number[] = EMPTY_ARRAY
): CSSObject[] | null {
  if (!Array.isArray(spaceIndexes)) {
    throw new Error('the property must be array of numbers')
  }

  if (spaceIndexes.length === 0) {
    return null
  }

  return _responsive(theme.sanity.media, spaceIndexes, (spaceIndex) =>
    _fillCSSObject(props, rem(theme.sanity.space[spaceIndex]))
  )
}
