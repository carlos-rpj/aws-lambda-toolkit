class LoggerHelper {
  static info(message, ...params) {
    if (params?.length) console.info(message, ...params)
    else console.info(message)
  }

  static debug(scope, message, ...params) {
    if (!process.env.DEBUG || !process.env.DEBUG.includes(scope)) return;
    if (params?.length) console.debug(`[${scope}]`, message, ...params)
    else console.debug(`[${scope}]`, message)
  }
}

export default LoggerHelper