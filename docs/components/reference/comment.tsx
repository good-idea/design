import {Badge, Box, Card, Code, Heading, Inline, Stack} from '@sanity/ui'
import React from 'react'
import {Content} from './content'

export function Comment(props: any) {
  const {member} = props

  return (
    <>
      <Card borderTop borderBottom>
        <Box paddingY={[3, 4, 5]}>
          <Stack space={4}>
            <Heading size={3}>
              <code>{member.name}</code>
            </Heading>

            <Inline space={1}>
              <Badge>{member._type}</Badge>
              {member.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
              {member.releaseTag === 'public' && <Badge tone="positive">Public</Badge>}
            </Inline>
          </Stack>
        </Box>

        {member.comment && <TSDocComment comment={member.comment} />}

        {member._type === 'api.interface' && (
          <div>
            <Box marginBottom={2}>
              <Heading>Members</Heading>
            </Box>
            {member.members.map((m: any) => (
              <Card borderTop key={m._key} paddingY={2}>
                <Code>{m.name}</Code>
                <Inline space={1}>
                  {m.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
                  {m.releaseTag === 'public' && <Badge tone="positive">Public</Badge>}
                </Inline>
              </Card>
            ))}
          </div>
        )}
      </Card>
      <Box marginTop={6}>
        <Code language="json">{JSON.stringify(member, null, 2)}</Code>
      </Box>
    </>
  )
}

function TSDocComment(props: any) {
  const {comment} = props

  return (
    <div>
      {comment.summary && (
        <Card borderTop paddingY={[3, 4, 5]}>
          <Content blocks={comment.summary} />
        </Card>
      )}

      {comment.remarks?.content && (
        <Card borderTop paddingY={[3, 4, 5]}>
          <Content blocks={comment.remarks?.content} />
        </Card>
      )}

      {comment.exampleBlocks &&
        comment.exampleBlocks.map((exampleBlock: any, idx: number) => (
          <Card borderTop key={exampleBlock._key} paddingY={[3, 4, 5]}>
            <Heading>Example {idx + 1}</Heading>
            <Content blocks={exampleBlock.content} />
          </Card>
        ))}
    </div>
  )
}
