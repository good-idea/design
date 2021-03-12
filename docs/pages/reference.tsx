import {Badge, Box, Card, Container, Flex, Inline, Label, Select, Stack, Text} from '@sanity/ui'
import groq from 'groq'
import React, {useCallback, useEffect, useState} from 'react'
import {NavLink} from '$components'
import {ReferenceArticle} from '$components/reference/article'
import {getClient} from '$sanity'

const PACKAGES_QUERY = groq`
  * [_type == "api.package"] {
    name,
    releases[]->{
      version,
      members[]->
    }
  }
`

export async function getServerSideProps(opts: {preview?: boolean}) {
  const packages: unknown = await getClient(opts.preview).fetch(PACKAGES_QUERY)

  return {
    props: {packages},
  }
}

function getMenu(currRelease: any) {
  const reactComponentTypeMembers = currRelease.members.filter((member: any) => {
    return member.isReactComponentType
  })

  const members = currRelease.members.filter((member: any) => {
    return !member.isReactComponentType
  })

  return [
    {
      name: 'component',
      title: 'React components',
      items: reactComponentTypeMembers.map((member: any) => {
        return {
          name: member.name,
          slug: member.slug.current,
          releaseTag: member.releaseTag,
        }
      }),
    },
    {
      name: 'class',
      title: 'Classes',
      items: members
        .filter((member: any) => member._type === 'api.class')
        .map((member: any) => ({
          name: member.name,
          slug: member.slug.current,
          releaseTag: member.releaseTag,
        })),
    },
    {
      name: 'variable',
      title: 'Variables',
      items: members
        .filter((member: any) => member._type === 'api.variable')
        .map((member: any) => ({
          name: member.name,
          slug: member.slug.current,
          releaseTag: member.releaseTag,
        })),
    },
    {
      name: 'type',
      title: 'Types',
      items: members
        .filter((member: any) => member._type === 'api.typeAlias')
        .map((member: any) => ({
          name: member.name,
          slug: member.slug.current,
          releaseTag: member.releaseTag,
        })),
    },
    {
      name: 'function',
      title: 'Functions',
      items: members
        .filter((member: any) => member._type === 'api.function')
        .map((member: any) => ({
          name: member.name,
          slug: member.slug.current,
          releaseTag: member.releaseTag,
        })),
    },
    {
      name: 'interface',
      title: 'Interfaces',
      items: members
        .filter((member: any) => member._type === 'api.interface')
        .map((member: any) => ({
          name: member.name,
          slug: member.slug.current,
          releaseTag: member.releaseTag,
        })),
    },
  ]
}

function ReferencePage(props: any) {
  const {packages = []} = props

  // pkg
  const [pkgName, setPkgName] = useState<string | null>(packages[0]?.name || null)
  const currPackage = packages.find((pkg: any) => pkg.name === pkgName)

  // release
  const [releaseVersion, setReleaseVersion] = useState<string | null>(
    currPackage?.releases[0]?.version || null
  )
  const currRelease = currPackage?.releases?.find(
    (release: any) => release.version === releaseVersion
  )
  const menu = currRelease ? getMenu(currRelease) : null

  // member
  const [memberName, setMemberName] = useState<string | null>(currRelease?.members[0]?.name || null)
  const currMember = currRelease?.members?.find((member: any) => member.name === memberName)

  const handlePkgChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setPkgName(event.currentTarget.value)
  }, [])

  const handleReleaseChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setReleaseVersion(event.currentTarget.value)
  }, [])

  // When package change
  useEffect(() => {
    setMemberName(currPackage?.releases[0]?.name || null)
  }, [currPackage])

  // When release change
  useEffect(() => {
    setMemberName(currRelease?.members[0]?.name || null)
  }, [currRelease])

  return (
    <Card>
      <Flex>
        <Box padding={[3, 4, 5]} style={{width: 300}}>
          <Inline space={1}>
            <Select onChange={handlePkgChange} value={pkgName || ''}>
              {packages.map((pkg: any) => {
                return <option key={pkg.name}>{pkg.name}</option>
              })}
            </Select>
            {currPackage && (
              <Select onChange={handleReleaseChange} value={releaseVersion || ''}>
                {currPackage.releases.map((release: any) => {
                  return <option key={release.version}>{release.version}</option>
                })}
              </Select>
            )}

            {menu && (
              <Stack marginTop={5} space={[4, 5, 6]}>
                {menu.map((section) => {
                  return <NavSection key={section.name} section={section} />
                })}
              </Stack>
            )}
          </Inline>
        </Box>
        <Box flex={1}>
          <Container>
            <Box padding={[3, 4, 5]}>{currMember && <ReferenceArticle data={currMember} />}</Box>
          </Container>
        </Box>
      </Flex>
    </Card>
  )
}

export default ReferencePage

function NavSection({section}: {section: any}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Box key={section.name}>
      <Label onClick={() => setExpanded((v) => !v)}>
        {section.title} ({section.items.length})
      </Label>

      <Stack hidden={!expanded} marginTop={[3, 4]} space={[3, 4]}>
        {section.items.map((item: any) => {
          return (
            <Flex align="center" key={item.name}>
              <NavLink href={`/reference/${item.slug}`}>{item.name}</NavLink>
              {item.releaseTag !== 'public' && (
                <Box marginLeft={2}>
                  <Badge
                    fontSize={0}
                    style={{margin: '-2px 0', verticalAlign: 'top'}}
                    tone="caution"
                  >
                    {item.releaseTag}
                  </Badge>
                </Box>
              )}
            </Flex>
          )
        })}
      </Stack>
    </Box>
  )
}
