/**
 * @public
 */
export type BadgeMode = 'default' | 'outline'

/**
 * @public
 */
export type BadgeTone = 'default' | 'primary' | 'positive' | 'caution' | 'critical'

/**
 * @internal
 */
export interface _BadgeStyleProps {
  $mode: BadgeMode
  $tone: BadgeTone
}
