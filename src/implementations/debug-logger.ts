import debug from "debug";
import colorizeJson from "json-colorizer";

import type ILogger from "@interfaces/logger.interface";

const logger = debug("aws-lambda-toolkit");
const logger_info = logger.extend("info");
const logger_debug = logger.extend("debug");
const logger_error = logger.extend("error");

export default class DebugLogger implements ILogger {
	info(message: string, ...params: unknown[]) {
		logger_info(message, ...params);
	}

	debug(scope: string, message: string, ...params: unknown[]) {
		logger_debug(`[${scope}]`, message, ...params);
	}

	error(message: string, ...params: unknown[]) {
		logger_error(message, ...params);
	}

	json(data: unknown): void {
		debug.log(colorizeJson(data as string, { pretty: true }));
	}
}
