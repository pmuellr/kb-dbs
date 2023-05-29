// see: https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/

/** @typedef { { name: string; version: string; homepage: string } } Package */

import { createRequire } from "node:module"
const require = createRequire(import.meta.url)

/** @type { Package } */
export const pkg = require("../package.json")

// @ts-ignore
// import pkg from '../package.json' assert { type: 'json' }
// export { pkg }
