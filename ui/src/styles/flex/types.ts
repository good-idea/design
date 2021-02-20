// Flex

/**
 * @public
 */
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'

/**
 * @public
 */
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

/**
 * @public
 */
export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

/**
 * @public
 */
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap'

/**
 * @internal
 */
export interface _ResponsiveFlexStyleProps {
  $align?: FlexAlign | FlexAlign[]
  $direction?: FlexDirection | FlexDirection[]
  $justify?: FlexJustify | FlexJustify[]
  $wrap?: FlexWrap | FlexWrap[]
}

// FlexItem

/**
 * @internal
 */
export interface _ResponsiveFlexItemStyleProps {
  $flex?: number | number[]
}

/**
 * @internal
 */
export interface _FlexItemStyleProps extends _ResponsiveFlexItemStyleProps {}
