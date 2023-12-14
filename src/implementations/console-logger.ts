import colorizeJson from "json-colorizer";
import type ILogger from "@interfaces/logger.interface";

class ConsoleLogger implements ILogger {
  info(message: string, ...params: any) {
    if (params?.length) console.info(message, ...params)
    else console.info(message)
  }

  debug(scope: string, message: string, ...params: any) {
    if (!process.env.DEBUG || !process.env.DEBUG.includes(scope)) return;
    if (params?.length) console.debug(`[${scope}]`, message, ...params)
    else console.debug(`[${scope}]`, message)
  }

  json(data: any) {
    console.log(colorizeJson(data, { pretty: true }))
  }
}

export default ConsoleLogger