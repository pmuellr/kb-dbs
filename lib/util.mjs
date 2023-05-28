/** @type { (isoString: string) => string } */
export function niceDate(isoString) {
  return isoString.replace('T', ' ')
}
