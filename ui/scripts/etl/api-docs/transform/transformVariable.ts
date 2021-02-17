import {config} from '../config'
import {createId} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'

export function transformVariable(node: any): any {
  return {
    _type: 'api.variable',
    _id: createId(node.canonicalReference),
    name: node.name,
    comment: transformDocComment(node.docComment),
    releaseTag: config.releaseTags[node.releaseTag],
    type: transformTokens(
      node.excerptTokens.slice(
        node.variableTypeTokenRange.startIndex,
        node.variableTypeTokenRange.endIndex
      )
    ),
  }
}
