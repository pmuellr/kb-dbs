/** @typedef { import('./types').Options } Options  */

import fs from 'node:fs'
import path from 'node:path'

import meow from 'meow'

/** @type { (argv: string[]) => Options } */
export function getOptions(argv) {
  const { dirs, help, version, debug } = getCliOptions(argv)
  /** @type { Options } */
  const result = {
    help:    false,
    version: false,
    debug:   false,
    dirs:    []
  }

  if (help) return { ...result, help: true }
  if (version) return { ...result, version: true }

  if (debug) result.debug = true

  result.dirs = dirs?.length > 0 ? dirs : ['.']

  return result
}

export function getHelp() {
  const thisFile = new URL(import.meta.url).pathname
  const thisDir = path.dirname(thisFile)
  return fs.readFileSync(`${thisDir}/README.md`, 'utf-8')
}

/** @type { (argv: string[] ) => Options } */
function getCliOptions(argv) {
  const cliOptions = meow({
    flags: {
      help:    { shortFlag: 'h', type: 'boolean', default: false },
      version: { shortFlag: 'v', type: 'boolean', default: false },
      debug  : { shortFlag: 'd', type: 'boolean', default: false },
    },
    importMeta: import.meta,
  })

  const flags = cliOptions.flags
  const dirs = cliOptions.input

  return {
    dirs: cliOptions.input,
    help: flags.help,
    version: flags.version,
    debug: flags.debug,
  }
}