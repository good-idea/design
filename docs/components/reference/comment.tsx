import {Box, Card, Code, Heading, Stack} from '@sanity/ui'
import React from 'react'
import {Content} from './content'

export function Comment(props: any) {
  const {member} = props

  return (
    <>
      <Card borderTop borderBottom>
        {member.comment && <TSDocComment comment={member.comment} />}
      </Card>
      <Box marginTop={6}>
        <Code language="json">{JSON.stringify(member, null, 2)}</Code>
      </Box>
    </>
  )
}

export function TSDocComment(props: any) {
  const {comment} = props

  return (
    <Stack space={[4, 5, 6]}>
      {comment.summary && (
        <Box>
          <Content blocks={comment.summary} />
        </Box>
      )}

      {comment.remarks?.content && (
        <Box>
          <Content blocks={comment.remarks?.content} />
        </Box>
      )}

      {comment.exampleBlocks &&
        comment.exampleBlocks.map((exampleBlock: any, idx: number) => (
          <Box key={exampleBlock._key}>
            <Heading>Example {idx + 1}</Heading>
            <Content blocks={exampleBlock.content} />
          </Box>
        ))}

      <Code language="json">{JSON.stringify(comment, null, 2)}</Code>
    </Stack>
  )
}
