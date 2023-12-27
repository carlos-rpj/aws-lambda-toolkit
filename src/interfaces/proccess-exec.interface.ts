export default interface IProcessExec {
	exec<T = unknown>(command: string, options: unknown): Promise<IExecResult<T>>;
}

export interface IExecResult<T> {
	toJson(): T;
	toString(): string;
}
