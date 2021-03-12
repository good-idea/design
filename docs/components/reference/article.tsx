import {Badge, Box, Card, Code, Heading, Inline, Label, Stack} from '@sanity/ui'
import React from 'react'
import {TSDocComment} from './comment'
import {runPrettier} from '$lib/ide/codeEditor/prettier'

function prettify(code: string) {
  try {
    return runPrettier({code, cursorOffset: 0})?.formatted || code
  } catch (err) {
    console.log(err)

    return code
  }
}

export function ReferenceArticle(props: {data: any}) {
  const {data} = props

  if (data._type === 'api.function') {
    return <ReferenceFunctionArticle data={data} />
  }

  if (data._type === 'api.interface') {
    return <ReferenceInterfaceArticle data={data} />
  }

  if (data._type === 'api.variable') {
    return <ReferenceVariableArticle data={data} />
  }

  return (
    <Box>
      <Box paddingY={[3, 4, 5]}>
        <Stack space={4}>
          <Heading size={3}>
            <code>{data.name}</code>
          </Heading>

          <Inline space={1}>
            <Badge>{data._type}</Badge>
            {data.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
            {data.releaseTag === 'public' && <Badge tone="positive">Public</Badge>}
          </Inline>
        </Stack>
      </Box>

      {data.comment && (
        <Stack space={3}>
          <Label>TSDoc comment</Label>
          <Card padding={4} tone="transparent">
            <TSDocComment comment={data.comment} />
          </Card>
        </Stack>
      )}

      <Card marginTop={5} overflow="auto" padding={4} tone="transparent">
        <Code language="json">{JSON.stringify(data, null, 2)}</Code>
      </Card>
    </Box>
  )
}

function ReferenceFunctionArticle(props: {data: any}) {
  const {data} = props

  return (
    <Box>
      <Box paddingY={[3, 4, 5]}>
        <Stack space={4}>
          <Stack space={3}>
            {data.isReactComponentType ? <Label>React component</Label> : <Label>Function</Label>}
            <Heading size={3}>
              <code>{data.name}</code>
            </Heading>
          </Stack>

          <Inline space={1}>
            {data.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
          </Inline>
        </Stack>
      </Box>

      {data.comment && (
        <Stack space={3}>
          <Label>TSDoc comment</Label>
          <Card padding={4} tone="transparent">
            <TSDocComment comment={data.comment} />
          </Card>
        </Stack>
      )}

      {data.returnType && (
        <Stack marginTop={5} space={3}>
          <Label>Type</Label>
          <Card overflow="auto" padding={4} tone="transparent">
            <Code language="typescript">
              {prettify(
                `type ${data.name} = (` +
                  data.parameters
                    .map((param: any) => {
                      return `${param.name}: ${param.type.map((t: any) => t.text).join('')}`
                    })
                    .join(', ') +
                  `) => ` +
                  data.returnType.map((t: any) => t.text).join('')
              )}
            </Code>
          </Card>
        </Stack>
      )}

      <Card marginTop={5} overflow="auto" padding={4} tone="transparent">
        <Code language="json">{JSON.stringify(data, null, 2)}</Code>
      </Card>
    </Box>
  )
}

function ReferenceInterfaceArticle(props: {data: any}) {
  const {data} = props

  return (
    <Box>
      <Box paddingY={[3, 4, 5]}>
        <Stack space={4}>
          <Stack space={3}>
            <Label>Function</Label>
            <Heading size={3}>
              <code>{data.name}</code>
            </Heading>
          </Stack>

          <Inline space={1}>
            {data.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
          </Inline>
        </Stack>
      </Box>

      <div>
        <Box marginBottom={2}>
          <Heading>Members</Heading>
        </Box>
        {data.members.map((m: any) => (
          <Card borderTop key={m._key} paddingY={2}>
            <Code>{m.name}</Code>
            <Inline space={1}>
              {m.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
              {m.releaseTag === 'public' && <Badge tone="positive">Public</Badge>}
            </Inline>
          </Card>
        ))}
      </div>

      {/* <Comment member={data} /> */}

      {data.comment && (
        <Stack space={3}>
          <Label>TSDoc comment</Label>
          <Card padding={4} tone="transparent">
            <TSDocComment comment={data.comment} />
          </Card>
        </Stack>
      )}

      <Card marginTop={5} overflow="auto" padding={4} tone="transparent">
        <Code language="json">{JSON.stringify(data, null, 2)}</Code>
      </Card>
    </Box>
  )
}

function ReferenceVariableArticle(props: {data: any}) {
  const {data} = props

  return (
    <Box>
      <Box paddingY={[3, 4, 5]}>
        <Stack space={4}>
          <Stack space={3}>
            {data.isReactComponentType ? <Label>React component</Label> : <Label>Variable</Label>}
            <Heading size={3}>
              <code>{data.name}</code>
            </Heading>
          </Stack>

          <Inline space={1}>
            {data.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
          </Inline>
        </Stack>
      </Box>

      {data.comment && (
        <Stack space={3}>
          <Label>TSDoc comment</Label>
          <Card padding={4} tone="transparent">
            <TSDocComment comment={data.comment} />
          </Card>
        </Stack>
      )}

      {data.type && (
        <Stack marginTop={5} space={3}>
          <Label>Type</Label>
          <Card overflow="auto" padding={4} tone="transparent">
            <Code language="typescript">
              {prettify(`const ${data.name}: ` + data.type.map((t: any) => t.text).join(''))}
            </Code>
          </Card>
        </Stack>
      )}

      <Card marginTop={5} overflow="auto" padding={4} tone="transparent">
        <Code language="json">{JSON.stringify(data, null, 2)}</Code>
      </Card>
    </Box>
  )
}
