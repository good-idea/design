import slugify from 'slugify'
import {config} from '../config'
import {createId} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'

export function transformTypeAlias(node: any, releaseDoc: any): any {
  return {
    _type: 'api.typeAlias',
    _id: createId(node.canonicalReference),
    release: {_type: 'reference', _ref: releaseDoc._id, _weak: true},
    name: node.name,
    slug: {current: slugify(node.name).toLowerCase()},
    comment: transformDocComment(node.docComment),
    type: transformTokens(
      node.excerptTokens.slice(node.typeTokenRange.startIndex, node.typeTokenRange.endIndex)
    ),
    releaseTag: config.releaseTags[node.releaseTag],
  }
}
