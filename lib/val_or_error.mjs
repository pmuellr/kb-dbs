
// ---------------------------------------------------------------------
// await a promise on V, returning ValOrErr<V>
// - good to use for an async function, just don't await it
// ---------------------------------------------------------------------
/**
 *  @template V 
 *  @typedef { import('./types').ValOrErr<V> } ValOrErr */
 /** @type { <V>(p: Promise<V>) => Promise<ValOrErr<V>> } */
export async function eVal(p) {
  try {
    return asVal(await p)
  } catch (err) {
    return asErr(err)
  }
}

// ---------------------------------------------------------------------
// call a function returning V, returning ValOrErr<V>
// - good for a sync lambda that can throw
// ---------------------------------------------------------------------
/** @type { <V>(fn: () => V) => ValOrErr<V> } */
 export function eValFn(fn) {
  try {
    return asVal(fn())
  } catch (err) {
    return asErr(err)
  }
}

// ---------------------------------------------------------------------
// create a ValOrErr object as val
// ---------------------------------------------------------------------
/** @type { <V>(val: V) => ValOrErr<V> } */
export function asVal(val) {
  return { 
    val, 
    err: undefined, 
    isVal: () => true, 
    isErr: () => false,
    asVal: () => val, 
    asErr: () => { throw new Error('not an err') }
  }
}

// ---------------------------------------------------------------------
// create a ValOrErr object as err
// ---------------------------------------------------------------------
/** @type { <V>(errParm: string | Error) => ValOrErr<V> } */
export function asErr(errParm) {
  /** @type { Error } */
  let err
  if (typeof errParm === 'string') {
    err = new Error(errParm)
  } else {
    err = errParm
  }
  
  return { 
    val: undefined, 
    err, 
    isVal: () => false, 
    isErr: () => true,
    asVal: () => { throw new Error('not a val') }, 
    asErr: () => err,
  }
}

// ---------------------------------------------------------------------
// access a ValOrErr object
// ---------------------------------------------------------------------

/** @type { <V>(x: ValOrErr<V>) => boolean } */
export function isVal(x) {
  return x.isVal()
}

/** @type { <V>(x: ValOrErr<V>) => boolean } */
export function isErr(x) {
  return x.isErr()
}

/** @type { <V>(x: ValOrErr<V>) => V } */
export function getVal(x) {
  return x.asVal()
}

/** @type { <V>(x: ValOrErr<V>) => Error } */
export function getErr(x) {
  return x.asErr()
}
