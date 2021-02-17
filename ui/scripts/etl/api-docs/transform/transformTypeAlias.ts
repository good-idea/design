import {config} from '../config'
import {createId} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'

export function transformTypeAlias(node: any): any {
  return {
    _type: 'api.typeAlias',
    _id: createId(node.canonicalReference),
    name: node.name,
    comment: transformDocComment(node.docComment),
    type: transformTokens(
      node.excerptTokens.slice(node.typeTokenRange.startIndex, node.typeTokenRange.endIndex)
    ),
    releaseTag: config.releaseTags[node.releaseTag],
  }
}
