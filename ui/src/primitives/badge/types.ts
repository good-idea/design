/**
 * @public
 */
export type BadgeMode = 'default' | 'outline'

/**
 * @public
 */
export type BadgeTone = 'default' | 'primary' | 'positive' | 'caution' | 'critical'

/**
 * @public
 */
export interface BadgeStyleProps {
  $mode: BadgeMode
  $tone: BadgeTone
}
