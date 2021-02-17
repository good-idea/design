import fs from 'fs'
import path from 'path'
import util from 'util'
import chalk from 'chalk'
import yargs from 'yargs'

const readFile = util.promisify(fs.readFile)

const ROOT_PATH = path.resolve(__dirname, '../..')

function diff(prev: any, curr: any) {
  const diffs = []

  const currNames = curr.map((doc: any) => doc.name)
  const prevNames = prev.map((doc: any) => doc.name)

  for (const prevName of prevNames) {
    const currIdx = currNames.indexOf(prevName)
    const prevIdx = prevNames.indexOf(prevName)

    if (currIdx === -1) {
      diffs.push({
        type: 'del',
        name: prevName,
        releaseTag: prev[prevIdx]?.releaseTag || 'public',
      })
    } else {
      diffs.push({
        type: 'unchanged',
        name: prevName,
        releaseTag: prev[prevIdx]?.releaseTag || 'public',
      })
    }
  }

  for (const currName of currNames) {
    const currIdx = currNames.indexOf(currName)
    const prevIdx = prevNames.indexOf(currName)

    if (prevIdx === -1) {
      diffs.push({
        type: 'ins',
        name: currName,
        releaseTag: curr[currIdx]?.releaseTag || 'public',
      })
    }
  }

  return diffs
}

async function diffApi() {
  const {argv} = yargs(process.argv)
  const args = argv._.slice(2)

  let prevVersion = '0.33.4'
  let currVersion = '0.34.0'

  if (args.length > 0) {
    const arg = String(args.shift())
    const p = arg.split('..')

    prevVersion = p[0]
    currVersion = p[1]
  }

  const features = {
    showUnchanged: argv.showUnchanged || false,
  }

  const prevBuf = await readFile(path.resolve(ROOT_PATH, `temp/ui-${prevVersion}.json`))
  const currBuf = await readFile(path.resolve(ROOT_PATH, `temp/ui-${currVersion}.json`))

  const prev = JSON.parse(prevBuf.toString())
  const current = JSON.parse(currBuf.toString())

  const diffs = diff(prev, current)

  diffs.sort((a, b) => {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()

    if (aName < bName) {
      return -1
    }

    if (aName > bName) {
      return 1
    }

    return 0
  })

  for (const d of diffs) {
    if (features.showUnchanged) {
      if (d.type === 'unchanged') {
        console.log('   ', d.name, chalk.gray(`@${d.releaseTag}`))
      }
    }

    if (d.type === 'del') {
      console.log(chalk.red('del'), d.name, chalk.gray(`@${d.releaseTag}`))
    }

    if (d.type === 'ins') {
      console.log(chalk.green('ins'), d.name, chalk.gray(`@${d.releaseTag}`))
    }
  }
}

diffApi().catch((err) => {
  console.log(err)
  process.exit(1)
})
