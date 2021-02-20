import {css, CSSObject, FlattenSimpleInterpolation} from 'styled-components'
import {_getResponsiveProp, rem, _responsive, _ThemeProps} from '../../styles'
import {
  _focusRingBorderStyle,
  _focusRingStyle,
  _responsiveInputPaddingIconRightStyle,
  _responsiveRadiusStyle,
} from '../../styles'
import {ThemeFontSize} from '../../theme'

export const selectStyle = {
  root: rootStyle,
  input: [
    _responsiveRadiusStyle,
    inputBaseStyle,
    inputColorStyle,
    inputTextSizeStyle,
    _responsiveInputPaddingIconRightStyle,
  ],
  iconBox: iconBoxStyle,
}

function rootStyle(): FlattenSimpleInterpolation {
  return css`
    position: relative;
    width: stretch;

    &:not([hidden]) {
      display: inline-block;
    }
  `
}

function inputBaseStyle(props: _ThemeProps): FlattenSimpleInterpolation {
  const {theme} = props
  const font = theme.sanity.fonts.text

  return css`
    -webkit-font-smoothing: antialiased;
    appearance: none;
    border: 0;
    font-family: ${font.family};
    color: inherit;
    width: 100%;
    outline: none;
    margin: 0;

    &:disabled {
      opacity: 1;
    }
  `
}

function inputColorStyle(props: _ThemeProps): FlattenSimpleInterpolation {
  const {theme} = props
  const {focusRing, input} = theme.sanity
  const color = theme.sanity.color.input

  return css`
    /* enabled */
    background-color: ${color.default.enabled.bg};
    color: ${color.default.enabled.fg};
    box-shadow: ${_focusRingBorderStyle({
      color: color.default.enabled.border,
      width: input.border.width,
    })};

    /* hovered */
    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${color.default.hovered.bg};
        color: ${color.default.hovered.fg};
        box-shadow: ${_focusRingBorderStyle({
          color: color.default.hovered.border,
          width: input.border.width,
        })};
      }
    }

    /* focused */
    &:not(:disabled):focus {
      box-shadow: ${_focusRingStyle({
        border: {width: input.border.width, color: color.default.enabled.border},
        focusRing,
      })};
    }

    /* disabled */
    &:not([data-read-only]):disabled {
      background-color: ${color.default.disabled.bg};
      color: ${color.default.disabled.fg};
      box-shadow: ${_focusRingBorderStyle({
        color: color.default.disabled.border,
        width: input.border.width,
      })};
    }
  `
}

function textSize(size: ThemeFontSize): CSSObject {
  return {fontSize: rem(size.fontSize), lineHeight: rem(size.lineHeight)}
}

function inputTextSizeStyle(props: {$fontSize?: number | number[]} & _ThemeProps): CSSObject[] {
  const {theme, $fontSize} = props
  const {sizes} = theme.sanity.fonts.text

  return _responsive(theme.sanity.media, _getResponsiveProp($fontSize), (sizeIndex) =>
    textSize(sizes[sizeIndex] || sizes[2])
  )
}

function iconBoxStyle(props: _ThemeProps): FlattenSimpleInterpolation {
  const {theme} = props
  const color = theme.sanity.color.input

  return css`
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;

    /* enabled */
    --card-fg-color: ${color.default.enabled.fg};

    /* hover */
    @media (hover: hover) {
      select:not(disabled):not(:read-only):hover + & {
        --card-fg-color: ${color.default.hovered.fg};
      }
    }

    /* disabled */
    select:disabled + & {
      --card-fg-color: ${color.default.disabled.fg};
    }

    /* read-only */
    select[data-read-only] + & {
      opacity: 0;
    }
  `
}
