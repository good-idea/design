import client from 'part:@sanity/base/client'

const apiTypes = [
  'api.class',
  'api.function',
  'api.interface',
  'api.package',
  'api.release',
  'api.type',
  'api.variable',
]

async function deleteApiDocs() {
  const refs = await client.fetch(`*[_type in $apiTypes]{_id}[0..100]`, {apiTypes})

  let tx = client.transaction()

  for (const ref of refs) {
    tx = tx.delete(ref._id)
  }

  await tx.commit()

  console.log('deleted', refs.length, 'docs')

  if (refs.length === 100) {
    await deleteApiDocs()
  }
}

deleteApiDocs().catch((err) => {
  console.error(err)
  process.exit(1)
})
