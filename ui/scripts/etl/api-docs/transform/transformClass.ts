import {config} from '../config'
import {createId} from './helpers'
import {transformDocComment} from './transformDocComment'

export function transformClass(node: any): any {
  return {
    _type: 'api.class',
    _id: createId(node.canonicalReference),
    name: node.name,
    comment: transformDocComment(node.docComment),
    releaseTag: config.releaseTags[node.releaseTag],
  }
}
