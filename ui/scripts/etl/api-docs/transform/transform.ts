import {config} from '../config'
import {hash} from './helpers'
import {transformClass} from './transformClass'
import {transformFunction} from './transformFunction'
import {transformInterface} from './transformInterface'
import {transformTypeAlias} from './transformTypeAlias'
import {transformVariable} from './transformVariable'

function transformPackage(node: any, currPackageDoc: any, releaseDoc: any) {
  let releases = currPackageDoc?.releases ? currPackageDoc.releases.slice(0) : []

  const release = releases.find((r: any) => r._key === releaseDoc._id)

  if (release) {
    // replace
    releases = releases.map((r: any) => {
      if (r === release) {
        return {
          _type: 'reference',
          _key: releaseDoc._id,
          _ref: releaseDoc._id,
          _weak: true,
        }
      }

      return r
    })
  } else {
    // add
    releases.push({
      _type: 'reference',
      _key: releaseDoc._id,
      _ref: releaseDoc._id,
      _weak: true,
    })
  }

  return {
    ...currPackageDoc,
    _type: 'api.package',
    _id: hash(node.canonicalReference),
    name: node.name,
    releases,
    latestRelease: {
      _type: 'reference',
      _ref: releaseDoc._id,
      _weak: true,
    },
  }
}

function transformMember(member: any) {
  if (member.kind === 'Class') {
    return transformClass(member)
  }

  if (member.kind === 'Function') {
    return transformFunction(member)
  }

  if (member.kind === 'Interface') {
    return transformInterface(member)
  }

  if (member.kind === 'TypeAlias') {
    return transformTypeAlias(member)
  }

  if (member.kind === 'Variable') {
    return transformVariable(member)
  }

  throw new Error(`package: unknown member type: ${member.kind}`)
}

export function transform(input: any, currPackageDoc: any): any {
  const {version, scope, name} = config.package

  const releaseDoc = {
    _type: 'api.release',
    _id: hash(`${scope}/${name}@${version}`),
    name: `${scope}/${name}@${version}`,
    members: [] as any[],
  }

  const packageDoc = transformPackage(input, currPackageDoc, releaseDoc)

  const docs: any[] = [releaseDoc]

  for (const member of input.members[0].members) {
    const memberDoc = transformMember(member)

    docs.push(memberDoc)

    releaseDoc.members.push({
      _type: 'reference',
      _key: memberDoc._id,
      _ref: memberDoc._id,
      _weak: true,
    })
  }

  docs.push(packageDoc)

  return docs
}
