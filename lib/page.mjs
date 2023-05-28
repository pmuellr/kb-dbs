/** @typedef { import('./types/task_manager_health.js').Percentiles } Percentiles */
/** @typedef { import('./types/task_manager_health.js').PercentilesNamed } PercentilesNamed */

import { log } from './log.mjs'

export function getPageWriter() {
  return new PageWriter()
}

export const e = escapeHtml

/** @type { (output: string[], tailCode: string[]) => string } */
function getPage(output, tailCode) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAQMAAAD58POIAAAAAXNSR0IArs4c6QAAAAZQTFRFIBMg5ojlq+xWMwAAAT9JREFUSMft0zFuwzAQBMA9sFCKAEzpIgDzBJcuAu+XXKoILHb5FvMTPYHlFYIuhSyZpIHAXVyY5YAg9lY6WHPwhLtAQwkjTf2jgFQQ+1cMJUBfwAKOUCAU8CktOAV8AYdOXS5h77XTroCPoH4qAbwLXAlBw/w3eA1TA/Wju66BT3cLdfSjaKe+BqmmJZo+iL5ujLFHVTLTYVd/hnR4R/uPfT9X7N8h07UgjwAxU0Za8heYcaJEb3AXmLCnoJuBCyhAwE0b5AUUGNZ9AQFRn1YIkTiLhpELJCbCkCsQi8s+wMzSMFIsZteAItTQb0nTkOksfW3BomU6S+ct2HIjDhGs3rDcwoxQg40rcFyi51DOIlcYPYijZJ9ZFiRZItvGuHb6RqCbtqQT9nTw19ZnnOhisLhOaz9mls1yeK7YDfwC3wXKOu5mu1cAAAAASUVORK5CYII=">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>kibana diagnostic bundle summary</title>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>  
  <link  href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>
<body>
<h1>kibana diagnostic bundle summary</h1>

${output.join('\n')}

</body>
<script>
${tailCode.join('\n')}
</script>
</html>
  `.trim()
}

export class PageWriter {
  constructor() {
    this._output = []
    this._tailCode = []
    this._id = 0
  }

  /** @type { () => string } */
  getPage() { return getPage(this._output, this._tailCode) }

  /** @type { () => string } */
  newId() { return `id${this._id++}` }

  /** @type { (string: string) => void } */
  w(string) { this._output.push(string) }

  /** @type { (string: string) => void } */
  tailCode(string) { this._tailCode.push(string) }

  /** @type { () => void } */
  hr() { this.w(`<hr/>`) }

  /** @type { (string: string) => void } */
  head2(string) { this.w(`<h2>${e(string)}</h2>`) }

  /** @type { (string: string) => void } */
  head3(string) { this.w(`<h3>${e(string)}</h3>`) }

  /** @type { (object: Record<string, any>) => void } */
  asTable(object) {
    this.w('<table>')
    for (const [key, value] of Object.entries(object)) {
      this.w(`<tr><td>${e(key)}</td><td>${e(value.toString())}</td></tr>`)
    }
    this.w('</table>')
  }

  /** @type { (title: string, json: any) => void } */
  json(title, json) {
    this.w(`<details><summary>${e(title)}</summary>`)
    this.w('<pre><code class="language-json">')
    this.w(e(JSON.stringify(json, null, 4)))
    this.w('</code></pre></details>')
  }

  /** @type { (string: string) => void } */
  error(string) {
    this.w(`<p class="error">${e(string)}</p>`)
    log(string)
  }

  /** @type { (object: Record<string, Percentiles>) => void } */
  percentileStackedGraph(object) {
    const id = this.newId()
    const data = transFormPercentiles(object)

    const spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: data },
      mark: 'bar',
      width: 500,
      encoding: {
        x: { aggregate: 'sum', field: 'value', title: "seconds" },
        y: { field: 'name', title: null },
        color: {
          field: 'type',
          type: 'nominal',
          scale: {
            domain: ['p50', 'p90', 'p95', 'p99'],
            range: ["#0f0", "#00f", "#ff0", "#f00"]
          },
        }
      }
    }

    this.w(`<button onclick="">sort by name</button>`)
    this.w(`<button onclick="">sort by time</button>`)
    this.w(`<div id="${id}"></div>`)
    this.tailCode(`vegaEmbed('#${id}', ${JSON.stringify(spec)});`)
  }
}

/** @type { (string: string) => string } */
function escapeHtml(string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** @type { (p: Record<string, Percentiles>) => PercentilesNamed[] } */
function transFormPercentiles(p) {
  return Object.entries(p).flatMap(([key, value]) => [
    { name: key, type: 'p50', max: value.p99, value: ((value.p50) / 1000)},
    { name: key, type: 'p90', max: value.p99, value: ((value.p90 - value.p50) / 1000)},
    { name: key, type: 'p95', max: value.p99, value: ((value.p95 - value.p90) / 1000)},
    { name: key, type: 'p99', max: value.p99, value: ((value.p99 - value.p95) / 1000)},
  ]).sort((a, b) => b.max - a.max)
}

