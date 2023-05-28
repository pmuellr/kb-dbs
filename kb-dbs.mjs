#!/usr/bin/env node

import { promises as fs } from 'fs'

import { log } from './lib/log.mjs'
import { getOptions } from './lib/options.mjs'
import { processDirectory } from './lib/process_directory.mjs'

const { dirs, debug } = getOptions(process.argv)
log.debug(`options; ${JSON.stringify({ dirs, debug })}`)

if (debug) log.setDebug(true)

main()

async function main() {
  await Promise.all(dirs.map(async dir => processDirectory(dir)))
}
