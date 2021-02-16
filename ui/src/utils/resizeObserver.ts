import {ResizeObserver as ResizeObserverPolyfill} from '@juggle/resize-observer'

export const RO: typeof ResizeObserver = (typeof window !== 'undefined' && window.ResizeObserver
  ? window.ResizeObserver
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResizeObserverPolyfill) as any

export {RO as ResizeObserver}
