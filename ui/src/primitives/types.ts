import {FlexAlign, FlexDirection, FlexJustify, FlexWrap} from '../styles'

// Border

/**
 * @public
 */
export interface ResponsiveBorderProps {
  border?: boolean | boolean[]
  borderTop?: boolean | boolean[]
  borderRight?: boolean | boolean[]
  borderBottom?: boolean | boolean[]
  borderLeft?: boolean | boolean[]
}

// Box

/**
 * @public
 */
export type BoxSizing = 'content' | 'border'

/**
 * @public
 */
export type BoxDisplay = 'none' | 'block' | 'grid' | 'flex' | 'inline-block'

/**
 * @public
 */
export type BoxHeight = 'stretch' | 'fill'

/**
 * @public
 */
export type BoxOverflow = 'visible' | 'hidden' | 'auto'

/**
 * @public
 */
export interface ResponsiveBoxProps {
  display?: BoxDisplay | BoxDisplay[]
  height?: BoxHeight | BoxHeight[]
  overflow?: BoxOverflow | BoxOverflow[]
  sizing?: BoxSizing | BoxSizing[]
}

/**
 * @public
 */
export interface ResponsiveFlexProps {
  align?: FlexAlign | FlexAlign[]
  direction?: FlexDirection | FlexDirection[]
  justify?: FlexJustify | FlexJustify[]
  wrap?: FlexWrap | FlexWrap[]
}

// FlexItem

/**
 * @public
 */
export interface ResponsiveFlexItemProps {
  flex?: number | number[]
}

// Grid

/**
 * @public
 */
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'

/**
 * @public
 */
export type GridAutoCols = 'auto' | 'min' | 'max' | 'fr'

/**
 * @public
 */
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'

/**
 * @public
 */
export interface ResponsiveGridProps {
  autoRows?: GridAutoRows | GridAutoRows[]
  autoCols?: GridAutoCols | GridAutoCols[]
  autoFlow?: GridAutoFlow | GridAutoFlow[]
  columns?: number | number[]
  gap?: number | number[]
  gapX?: number | number[]
  gapY?: number | number[]
  rows?: number | number[]
}

// GridItem

/**
 * @public
 */
export type GridItemColumn = 'auto' | 'full' | number

/**
 * @public
 */
export type GridItemColumnStart = 'auto' | number

/**
 * @public
 */
export type GridItemColumnEnd = 'auto' | number

/**
 * @public
 */
export type GridItemRow = 'auto' | 'full' | number

/**
 * @public
 */
export type GridItemRowStart = 'auto' | number

/**
 * @public
 */
export type GridItemRowEnd = 'auto' | number

/**
 * @public
 */
export interface ResponsiveGridItemProps {
  column?: GridItemColumn | GridItemColumn[]
  columnStart?: GridItemColumnStart | GridItemColumnStart[]
  columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]
  row?: GridItemRow | GridItemRow[]
  rowStart?: GridItemRowStart | GridItemRowStart[]
  rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}

// Margin

/**
 * @public
 */
export interface ResponsiveMarginProps {
  margin?: number | number[]
  marginX?: number | number[]
  marginY?: number | number[]
  marginTop?: number | number[]
  marginRight?: number | number[]
  marginBottom?: number | number[]
  marginLeft?: number | number[]
}

// Padding

/**
 * @public
 */
export interface ResponsivePaddingProps {
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  paddingTop?: number | number[]
  paddingRight?: number | number[]
  paddingBottom?: number | number[]
  paddingLeft?: number | number[]
}

// Radius

/**
 * @public
 */
export interface ResponsiveRadiusProps {
  radius?: number | number[]
}

// Shadow

/**
 * @public
 */
export interface ResponsiveShadowProps {
  shadow?: number | number[]
}

// Width

/**
 * @public
 */
export interface ResponsiveWidthProps {
  width?: number | number[] | 'auto'
}
