import type ILogger from "@interfaces/logger.interface";
import colorizeJson from "json-colorizer";

class ConsoleLogger implements ILogger {
	info(message: string, ...params: unknown[]) {
		if (params?.length) console.info(message, ...params);
		else console.info(message);
	}

	debug(scope: string, message: string, ...params: unknown[]) {
		if (!process.env.DEBUG || !process.env.DEBUG.includes(scope)) return;
		if (params?.length) console.debug(`[${scope}]`, message, ...params);
		else console.debug(`[${scope}]`, message);
	}

	json(data: unknown) {
		console.log(colorizeJson(<string>data, { pretty: true }));
	}
}

export default ConsoleLogger;
