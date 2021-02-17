import {Box, Card, Container, Inline, Select} from '@sanity/ui'
import groq from 'groq'
import React, {useCallback, useEffect, useState} from 'react'
import {Comment} from '$components/reference/comment'
import {getClient} from '$sanity'

const PACKAGES_QUERY = groq`
  * [_type == "api.package"] {
    name,
    releases[]->{
      name,
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

function ReferencePage(props: any) {
  const {packages = []} = props
  const [pkgName, setPkgName] = useState<string | null>(packages[0]?.name || null)
  const currPackage = packages.find((pkg: any) => pkg.name === pkgName)
  const [releaseName, setReleaseName] = useState<string | null>(
    currPackage?.releases[0]?.name || null
  )
  const currRelease = currPackage?.releases?.find((release: any) => release.name === releaseName)
  const [memberName, setMemberName] = useState<string | null>(currRelease?.members[0]?.name || null)
  const currMember = currRelease?.members?.find((member: any) => member.name === memberName)

  const handlePkgChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setPkgName(event.currentTarget.value)
  }, [])

  const handleReleaseChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setReleaseName(event.currentTarget.value)
  }, [])

  const handleMemberChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setMemberName(event.currentTarget.value)
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
      <Container>
        <Box padding={[3, 4, 5]}>
          <Inline space={1}>
            <Select onChange={handlePkgChange} value={pkgName || ''}>
              {packages.map((pkg: any) => {
                return <option key={pkg.name}>{pkg.name}</option>
              })}
            </Select>
            {currPackage && (
              <Select onChange={handleReleaseChange} value={releaseName || ''}>
                {currPackage.releases.map((release: any) => {
                  return <option key={release.name}>{release.name}</option>
                })}
              </Select>
            )}
            {currRelease && (
              <Select onChange={handleMemberChange} value={memberName || ''}>
                {currRelease.members.map((member: any) => {
                  return <option key={member.name}>{member.name}</option>
                })}
              </Select>
            )}
          </Inline>
        </Box>

        <Box padding={[3, 4, 5]}>{currMember && <Comment member={currMember} />}</Box>
      </Container>
    </Card>
  )
}

export default ReferencePage
