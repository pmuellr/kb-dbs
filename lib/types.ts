// only types, used for validation in vscode

export { KbfTaskManagerHealth } from './types/task_manager_health'

interface Val<V> { val: V;     err: undefined; isVal: () => boolean; isErr: () => boolean; }
interface Err    { err: Error; val: undefined; isVal: () => boolean; isErr: () => boolean; }
export type ValOrErr<V> = (Val<V> | Err) & {
  isVal: () => boolean;
  isErr: () => boolean;
  asVal: () => V;
  asErr: () => Error;
}

export interface Options {
  help:    boolean
  version: boolean
  debug:   boolean
  dirs:    string[]
}

