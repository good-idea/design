import {css, CSSObject, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeFontWeightKey} from '../../theme'
import {_focusRingBorderStyle, _focusRingStyle} from '../focusRing'
import {_getResponsiveProp, rem, _responsive} from '../helpers'
import {_ThemeProps} from '../types'

/**
 * @internal
 */
export interface _TextInputInputStyleProps {
  $fontSize?: number | number[]
  $weight?: ThemeFontWeightKey
}

/**
 * @internal
 */
export interface _TextInputRepresentationStyleProps {
  $border?: boolean
  $hasPrefix?: boolean
  $hasSuffix?: boolean
}

const ROOT_STYLE = css`
  &:not([hidden]) {
    display: flex;
  }
`

/**
 * @internal
 */
export const _textInputStyle: {
  root: FlattenSimpleInterpolation
  input: ((props: _TextInputInputStyleProps & _ThemeProps) => FlattenSimpleInterpolation)[]
  representation: ((
    props: _TextInputRepresentationStyleProps & _ThemeProps
  ) => FlattenSimpleInterpolation)[]
} = {
  root: ROOT_STYLE,
  input: [inputBaseStyle, inputFontSizeStyle],
  representation: [representationStyle],
}

function inputBaseStyle(
  props: _TextInputInputStyleProps & _ThemeProps
): FlattenSimpleInterpolation {
  const {theme, $weight} = props
  const font = theme.sanity.fonts.text
  const color = theme.sanity.color.input

  return css`
    --input-placeholder-color: ${color.default.enabled.placeholder};

    appearance: none;
    background: none;
    border: 0;
    border-radius: 0;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-family: ${font.family};
    font-weight: ${($weight && font.weights[$weight]) || font.weights.regular};
    margin: 0;
    position: relative;
    z-index: 1;
    display: block;

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    /* &:is(textarea) */
    &[data-as='textarea'] {
      resize: none;
    }

    /* enabled */
    &:not(:invalid):not(:disabled) {
      color: ${color.default.enabled.fg};
      --input-placeholder-color: ${color.default.enabled.placeholder};
    }

    /* disabled */
    &:not(:invalid):disabled {
      color: ${color.default.disabled.fg};
      --input-placeholder-color: ${color.default.disabled.placeholder};
    }

    /* invalid */
    &:invalid {
      color: ${color.invalid.enabled.fg};
      --input-placeholder-color: ${color.invalid.enabled.placeholder};
    }
  `
}

function inputFontSizeStyle(props: _TextInputInputStyleProps & _ThemeProps): CSSObject[] {
  const {theme} = props
  const {fonts, media} = theme.sanity

  return _responsive(media, _getResponsiveProp(props.$fontSize, [2]), (sizeIndex) => {
    const size = fonts.text.sizes[sizeIndex] || fonts.text.sizes[2]

    return {
      fontSize: rem(size.fontSize),
      lineHeight: size.lineHeight / size.fontSize,
    }
  })
}

function representationStyle(
  props: _TextInputRepresentationStyleProps & _ThemeProps
): FlattenSimpleInterpolation {
  const {$border, $hasPrefix, $hasSuffix, theme} = props
  const {focusRing, input} = theme.sanity
  const color = theme.sanity.color.input

  return css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    pointer-events: none;
    z-index: 0;

    /* enabled */
    *:not(:disabled) + & {
      --card-bg-color: ${color.default.enabled.bg};
      --card-fg-color: ${color.default.enabled.fg};
      background-color: ${color.default.enabled.bg};
      box-shadow: ${$border
        ? _focusRingBorderStyle({color: color.default.enabled.border, width: input.border.width})
        : undefined};
    }

    /* invalid */
    *:not(:disabled):invalid + & {
      --card-bg-color: ${color.invalid.enabled.bg};
      --card-fg-color: ${color.invalid.enabled.fg};
      background-color: ${color.invalid.enabled.bg};
      box-shadow: ${$border
        ? _focusRingBorderStyle({color: color.invalid.enabled.border, width: input.border.width})
        : 'none'};
    }

    /* focused */
    *:not(:disabled):not(:read-only):focus + & {
      box-shadow: ${_focusRingStyle({
        border: $border
          ? {color: color.default.enabled.border, width: input.border.width}
          : undefined,
        focusRing,
      })};
    }

    /* disabled */
    *:disabled + & {
      --card-bg-color: ${color.default.disabled.bg};
      --card-fg-color: ${color.default.disabled.fg};
      background-color: ${color.default.disabled.bg};
      box-shadow: ${$border
        ? _focusRingBorderStyle({
            color: color.default.disabled.border,
            width: input.border.width,
          })
        : 'none'};
    }

    /* hovered */
    @media (hover: hover) {
      *:not(:disabled):not(:read-only):not(:invalid):hover + & {
        --card-bg-color: ${color.default.hovered.bg};
        --card-fg-color: ${color.default.hovered.fg};
        background-color: ${color.default.hovered.bg};
      }

      *:not(:disabled):not(:read-only):not(:invalid):not(:focus):hover + & {
        box-shadow: ${$border
          ? _focusRingBorderStyle({
              color: color.default.hovered.border,
              width: input.border.width,
            })
          : 'none'};
      }
    }

    border-top-left-radius: ${$hasPrefix ? 0 : undefined};
    border-bottom-left-radius: ${$hasPrefix ? 0 : undefined};
    border-top-right-radius: ${$hasSuffix ? 0 : undefined};
    border-bottom-right-radius: ${$hasSuffix ? 0 : undefined};
  `
}
