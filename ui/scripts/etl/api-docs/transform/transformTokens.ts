import {createId} from './helpers'

export function transformTokens(tokens: any[]): any {
  return tokens.map((t, idx) => {
    if (t.kind === 'Content') {
      return {
        _type: 'api.text',
        _key: `token${idx}`,
        text: t.text,
      }
    }

    if (t.kind === 'Reference') {
      return {
        _type: 'api.reference',
        _key: `token${idx}`,
        text: t.text,
        reference: {
          _type: 'reference',
          _ref: createId(t.canonicalReference),
          _weak: true,
        },
      }
    }

    throw new Error(`tokens: unknown type: ${t.kind}`)
  })
}
