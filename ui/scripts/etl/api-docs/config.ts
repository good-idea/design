import path from 'path'
import pkg from '../../../package.json'

export const config = {
  context: path.resolve(__dirname, '../../..'),

  publish: {
    fs: true,
    sanity: true,
  },

  package: {
    scope: '@sanity',
    name: 'ui',
    version: process.env.PACKAGE_VERSION || pkg.version,
  },

  releaseTags: {
    Beta: 'beta',
    Public: 'public',
  } as {[key: string]: 'beta' | 'public'},
}
