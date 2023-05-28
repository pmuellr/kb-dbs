/** @typedef { import('../page.mjs').PageWriter } PageWriter  */

import { log } from '../log.mjs'

/** @type { (dir: string, pw: PageWriter) => Promise<void> } */
export async function processStats(dir, pw) {
  const iFileName = `${dir}/kibana_stats.json`
  log.debug(`processing file "${iFileName}"`)
}
