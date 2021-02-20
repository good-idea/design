import {_hexToRgb, _multiply, _parseColor, _rgba, _screen} from '@sanity/ui'

const hues = {
  gray: {
    600: '#6e7683',
  },
  blue: {
    500: '#2276fc',
  },
}

describe('color-fns', () => {
  describe('hexToRgb', () => {
    it('should convert hex to RGB', () => {
      const hex = '#ff0000'
      const rgb = _hexToRgb(hex)

      expect(rgb).toEqual({r: 255, g: 0, b: 0})
    })
  })

  describe('screen', () => {
    it('should blend color using the "screen" mode', () => {
      const backdrop = _hexToRgb(hues.blue[500])
      const source = _hexToRgb(hues.gray[600])
      const rgb = _screen(backdrop, source)

      expect(rgb).toEqual({r: 129, g: 181, b: 254})
    })
  })

  describe('multiply', () => {
    it('should blend color using the "multiply" mode', () => {
      const backdrop = _hexToRgb(hues.blue[500])
      const source = _hexToRgb(hues.gray[600])
      const rgb = _multiply(backdrop, source)

      expect(rgb).toEqual({r: 15, g: 55, b: 129})
    })
  })

  describe('_parseColor', () => {
    it('should parse a hex to RGB', () => {
      const rgb = _parseColor('#ccc')

      expect(rgb).toEqual({r: 204, g: 204, b: 204})
    })

    it('should parse a HSL to RGB', () => {
      const rgb1 = _parseColor('hsl(210, 20%, 50%)')
      const rgb2 = _parseColor('hsl(210, 10%, 0%)')

      expect(rgb1).toEqual({r: 102, g: 128, b: 153})
      expect(rgb2).toEqual({r: 0, g: 0, b: 0})
    })
  })

  describe('helpers/rgba', () => {
    it('should convert hex to RGBA string', () => {
      expect(_rgba('#f00', 0.5)).toBe(`rgba(255,0,0,0.5)`)
    })
  })
})
