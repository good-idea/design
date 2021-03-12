import slugify from 'slugify'
import {config} from '../config'
import {createId, hash} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'

export function transformInterface(node: any, releaseDoc: any): any {
  return {
    _type: 'api.interface',
    _id: createId(node.canonicalReference),
    release: {_type: 'reference', _ref: releaseDoc._id, _weak: true},
    name: node.name,
    slug: {current: slugify(node.name).toLowerCase()},
    comment: transformDocComment(node.docComment),
    extends: node.extendsTokenRanges.map((range: any, idx: number) => {
      return {
        _type: 'api.extend',
        _key: `extend${idx}`,
        type: transformTokens(node.excerptTokens.slice(range.startIndex, range.endIndex)),
      }
    }),
    members: node.members.map((m: any) => {
      if (m.kind === 'PropertySignature') {
        return {
          _type: 'api.property',
          _key: hash(m.canonicalReference),
          type: transformTokens(
            m.excerptTokens.slice(
              m.propertyTypeTokenRange.startIndex,
              m.propertyTypeTokenRange.endIndex
            )
          ),
          name: m.name,
          optional: m.isOptional,
          releaseTag: config.releaseTags[m.releaseTag],
        }
      }

      throw new Error(`unknown interface member kind: ${m.kind}`)
    }),
    releaseTag: config.releaseTags[node.releaseTag],
    typeParameters: (node.typeParameters || []).map((p: any, idx: number) => {
      return {
        _type: 'api.typeParameter',
        _key: `typeParameter${idx}`,
        name: p.typeParameterName,
        constraintType: transformTokens(
          node.excerptTokens.slice(
            p.constraintTokenRange.startIndex,
            p.constraintTokenRange.endIndex
          )
        ),
        defaultTypeType: transformTokens(
          node.excerptTokens.slice(
            p.defaultTypeTokenRange.startIndex,
            p.defaultTypeTokenRange.endIndex
          )
        ),
      }
    }),
  }
}
