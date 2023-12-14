interface Logger {
  info(...params: any): void;
  info(message: string, ...params: any): void;

  debug(scope: string, ...params: any): void;
  debug(scope: string, message: string, ...params: any): void;

  json(data: any): void;
}

export default Logger