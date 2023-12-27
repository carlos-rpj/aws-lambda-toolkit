interface ILogger {
	info(...params: unknown[]): void;
	info(message: string, ...params: unknown[]): void;

	debug(scope: string, ...params: unknown[]): void;
	debug(scope: string, message: string, ...params: unknown[]): void;

	json(data: unknown): void;
}

export default ILogger;
