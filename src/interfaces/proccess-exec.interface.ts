export default interface IProcessExec {
  exec<T = any>(command: string, options: any): Promise<IExecResult<T>>
}

export interface IExecResult<T> {
  toJson(): T;
  toString(): string;
}
