/**
 * @public
 */
export type AvatarPosition = 'top' | 'bottom' | 'inside'

/**
 * @public
 */
export type AvatarSize = 0 | 1 | 2

/**
 * @public
 */
export type AvatarStatus = 'online' | 'editing' | 'inactive'

/**
 * @internal
 */
export interface _AvatarRootStyleProps {
  $color: string
}

/**
 * @internal
 */
export interface _ResponsiveAvatarSizeStyleProps {
  $size: AvatarSize[]
}
