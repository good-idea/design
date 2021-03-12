import slugify from 'slugify'
import {config} from '../config'
import {createId, hash} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'

export function transformFunction(node: any, releaseDoc: any): any {
  return {
    _type: 'api.function',
    _id: createId(node.canonicalReference),
    release: {_type: 'reference', _ref: releaseDoc._id, _weak: true},
    name: node.name,
    slug: {current: slugify(node.name).toLowerCase()},
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
    isReactComponentType: _functionIsReactComponentType(node),
  }
}

function _functionIsReactComponentType(node: any) {
  const returnTypeTokens: any[] = node.excerptTokens.slice(
    node.returnTypeTokenRange.startIndex,
    node.returnTypeTokenRange.endIndex
  )

  const returnTypeCode = returnTypeTokens
    .map((t) => t.text)
    .join('')
    .trim()

  const returnsReactElement = returnTypeCode === 'React.ReactElement'
  const returnsReactNode = returnTypeCode === 'React.ReactNode'

  if (returnsReactElement || returnsReactNode) {
    return true
  }

  return false
}
