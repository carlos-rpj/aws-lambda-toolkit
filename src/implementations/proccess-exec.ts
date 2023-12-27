import { exec } from "node:child_process";

import type ILogger from "@interfaces/logger.interface";
import type IProcessExec from "@interfaces/proccess-exec.interface";
import type { IExecResult } from "@interfaces/proccess-exec.interface";

export class ExecResult<T> implements IExecResult<T> {
	constructor(private data: string) {}

	toJson(): T {
		return JSON.parse(this.data);
	}

	toString() {
		return this.data;
	}
}

export default class ProcessExec implements IProcessExec {
	constructor(private logger: ILogger) {}

	async exec<T = unknown>(
		command: string,
		options: Record<string, string>,
	): Promise<ExecResult<T>> {
		const commandTree = [command];

		for (const key in options) {
			if (options[key]) commandTree.push(`--${key}`, options[key]);
		}

		return new Promise((resolve, reject) => {
			const commandLine = commandTree.join(" ");
			this.logger.debug("command-exec", "exec >", commandLine);

			exec(commandLine, (error, stdout, stderr) => {
				if (error) return reject(error);

				this.logger.debug("command-exec", "result >", stdout);
				resolve(new ExecResult(stdout));
			});
		});
	}
}
