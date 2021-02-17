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
    isReactComponentType: _variableIsReactComponentType(node),
  }
}

function _variableIsReactComponentType(node: any) {
  const typeTokens: any[] = node.excerptTokens.slice(
    node.variableTypeTokenRange.startIndex,
    node.variableTypeTokenRange.endIndex
  )

  const typeCode = typeTokens
    .map((t) => t.text)
    .join('')
    .trim()

  const isNamedExoticComponent = typeCode.startsWith('React.NamedExoticComponent<')
  const isForwardRefExoticComponent = typeCode.startsWith('React.ForwardRefExoticComponent<')
  const isStyledComponent = typeCode.startsWith('StyledComponent<')
  const returnsReactElement = typeCode.endsWith('=> React.ReactElement')

  if (
    isNamedExoticComponent ||
    isForwardRefExoticComponent ||
    isStyledComponent ||
    returnsReactElement
  ) {
    return true
  }

  return false
}
