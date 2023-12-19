import debug from 'debug'
import colorizeJson from 'json-colorizer';

import type ILogger from "@interfaces/logger.interface";

const logger = debug('aws-lambda-toolkit')
const logger_info = logger.extend('info')
const logger_debug = logger.extend('debug')
const logger_error = logger.extend('error')

export default class DebugLogger implements ILogger {
  info(message: string, ...params: any) {
    logger_info(message, ...params);
  }

  debug(scope: string, message: string, ...params: any) {
    logger_debug(`[${scope}]`, message, ...params);
  }

  error(message: string, ...params: any) {
    logger_error(message, ...params);
  }

  json(data: any): void {
    debug.log(colorizeJson(data, { pretty: true }))
  }
}