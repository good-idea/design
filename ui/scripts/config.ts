export const config = {
  sanity: {
    projectId: getEnv('SCRIPT_SANITY_PROJECT_ID'),
    dataset: getEnv('SCRIPT_SANITY_DATASET'),
    token: getEnv('SCRIPT_SANITY_WRITE_TOKEN'),
  },
}

console.log(JSON.stringify(config, null, 2))

function getEnv(key: string): string {
  const value = process.env[key]

  if (!value) {
    console.error(`Missing process.env.${key}`)
    process.exit(1)
  }

  return value
}
