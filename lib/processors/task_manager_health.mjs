/** @typedef { import('../page.mjs').PageWriter } PageWriter  */
/** @typedef { import('../types/task_manager_health.js').KbfTaskManagerHealth } KbfTaskManagerHealth */

import fs from 'node:fs/promises'

import { log } from '../log.mjs'
import { niceDate } from '../util.mjs'    
import { getPageWriter } from '../page.mjs'    
import { eVal, eValFn } from '../val_or_error.mjs'

/** @type { (dir: string, pw: PageWriter) => Promise<void> } */
export async function processTaskManagerHealth(dir, pw) {
  const iFileName = `${dir}/kibana_task_manager_health.json`
  log.debug(`processing file "${iFileName}"`)

  pw.hr()
  pw.w('<h2>Task Manager Health</h2>')

  const contentsV = await eVal(fs.readFile(iFileName, 'utf8'))
  if (contentsV.isErr()) {
    return pw.error(`error reading file "${iFileName}": ${contentsV.asErr()}`)
  }

  const contents = contentsV.asVal()
  const jsonV = eValFn(() => JSON.parse(contents))
  if (jsonV.isErr()) {
    return pw.error(`error reading file "${iFileName}": ${contentsV.asErr()}`)
  }

  /** @type { KbfTaskManagerHealth } */
  const json = jsonV.asVal()

  const { id, timestamp, status, last_update } = json
  pw.asTable({id, status, timestamp, last_update})

  pw.head2('configuration')
  const config = json.stats.configuration
  pw.asTable({
    timestamp: config.timestamp,
    poll_interval: `${config.value.poll_interval}`,
    max_workers: `${config.value.max_workers}`,
  })

  pw.head2('runtime')
  const runtime = json.stats.runtime
  const { drift, drift_by_type, execution } = runtime.value

  pw.head3('overall drift')
  pw.percentileStackedGraph({ 'overall drift': drift })

  pw.head3('drift by type')
  pw.percentileStackedGraph(drift_by_type)

  pw.head3('execution by type')
  pw.percentileStackedGraph(execution.duration)

  pw.json('original file contents', json)
}
