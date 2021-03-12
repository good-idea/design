import slugify from 'slugify'
import {config} from '../config'
import {createId} from './helpers'
import {transformDocComment} from './transformDocComment'

export function transformClass(node: any, releaseDoc: any): any {
  return {
    _type: 'api.class',
    _id: createId(node.canonicalReference),
    release: {_type: 'reference', _ref: releaseDoc._id, _weak: true},
    name: node.name,
    slug: {current: slugify(node.name).toLowerCase()},
    comment: transformDocComment(node.docComment),
    releaseTag: config.releaseTags[node.releaseTag],
  }
}
