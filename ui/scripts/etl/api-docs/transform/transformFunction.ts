import {config} from '../config'
import {createId, hash} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'

export function transformFunction(node: any): any {
  return {
    _type: 'api.function',
    _id: createId(node.canonicalReference),
    name: node.name,
    // docComment: node.docComment,
    comment: transformDocComment(node.docComment),
    parameters: node.parameters.map((p: any) => ({
      _type: 'api.functionParameter',
      _key: hash(p.parameterName),
      name: p.parameterName,
      type: transformTokens(
        node.excerptTokens.slice(
          p.parameterTypeTokenRange.startIndex,
          p.parameterTypeTokenRange.endIndex
        )
      ),
    })),
    returnType: transformTokens(
      node.excerptTokens.slice(
        node.returnTypeTokenRange.startIndex,
        node.returnTypeTokenRange.endIndex
      )
    ),
    releaseTag: config.releaseTags[node.releaseTag],
  }
}
