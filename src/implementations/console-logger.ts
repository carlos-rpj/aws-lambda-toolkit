import Logger from "@interfaces/logger.interface";

class ConsoleLogger implements Logger {
  info(message: string, ...params: any) {
    if (params?.length) console.info(message, ...params)
    else console.info(message)
  }

  debug(scope: string, message: string, ...params: any) {
    if (!process.env.DEBUG || !process.env.DEBUG.includes(scope)) return;
    if (params?.length) console.debug(`[${scope}]`, message, ...params)
    else console.debug(`[${scope}]`, message)
  }
}

export default ConsoleLogger