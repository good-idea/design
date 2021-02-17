import crypto from 'crypto'
import {config} from '../config'

export function hash(key: string): string {
  return crypto.createHash('md5').update(key).digest('hex')
}

export function createId(key: string): string {
  return hash(`${config.package.scope}/${config.package.name}/${config.package.version}${key}`)
}
