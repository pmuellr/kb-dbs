/**  */

import fs from 'node:fs/promises'

import { log } from './log.mjs'
import { eVal } from './val_or_error.mjs'
import { getPageWriter } from './page.mjs'
import { processStats } from './processors/stats.mjs'
import { processTaskManagerHealth } from './processors/task_manager_health.mjs'

const OUTPUT_FILE_NAME = 'kb-diagnostics-summary.html'

/** @type { (dir: string) => Promise<void> } */
export async function processDirectory(dir) {
  const statsV = await eVal(fs.stat(dir))
  if (statsV.isErr()) {
    log('parameter "${dir}" is not a valid file or directory')
    return
  }

  const stats = await statsV.asVal()
  if (!stats.isDirectory()) {
    log('parameter "${dir}" is not a directory')
    return
  }

  log.debug(`processing directory "${dir}"`)

  const pw = getPageWriter()

  await processStats(dir, pw)
  await processTaskManagerHealth(dir, pw)

  const page = pw.getPage()

  const oFile = `${dir}/index.html`
  log(`generating "${oFile}"`)

  const res = await eVal(fs.writeFile(`${dir}/${OUTPUT_FILE_NAME}`, page))
  if (res.isErr()) {
    log('error writing output file "${oFile}": ${res.asErr()}')
    return
  }
}