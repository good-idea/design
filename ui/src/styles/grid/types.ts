// Grid

/**
 * @internal
 */
export type _GridAutoRows = 'auto' | 'min' | 'max' | 'fr'

/**
 * @internal
 */
export type _GridAutoCols = 'auto' | 'min' | 'max' | 'fr'

/**
 * @internal
 */
export type _GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'

/**
 * @internal
 */
export interface _ResponsiveGridStyleProps {
  $autoRows?: _GridAutoRows | _GridAutoRows[]
  $autoCols?: _GridAutoCols | _GridAutoCols[]
  $autoFlow?: _GridAutoFlow | _GridAutoFlow[]
  $columns?: number | number[]
  $gap?: number | number[]
  $gapX?: number | number[]
  $gapY?: number | number[]
  $rows?: number | number[]
}

// GridItem

/**
 * @internal
 */
export type _GridItemColumn = 'auto' | 'full' | number

/**
 * @internal
 */
export type _GridItemColumnStart = 'auto' | number

/**
 * @internal
 */
export type _GridItemColumnEnd = 'auto' | number

/**
 * @internal
 */
export type _GridItemRow = 'auto' | 'full' | number

/**
 * @internal
 */
export type _GridItemRowStart = 'auto' | number

/**
 * @internal
 */
export type _GridItemRowEnd = 'auto' | number

/**
 * @internal
 */
export interface _ResponsiveGridItemStyleProps {
  $column?: _GridItemColumn | _GridItemColumn[]
  $columnStart?: _GridItemColumnStart | _GridItemColumnStart[]
  $columnEnd?: _GridItemColumnEnd | _GridItemColumnEnd[]
  $row?: _GridItemRow | _GridItemRow[]
  $rowStart?: _GridItemRowStart | _GridItemRowStart[]
  $rowEnd?: _GridItemRowEnd | _GridItemRowEnd[]
}
