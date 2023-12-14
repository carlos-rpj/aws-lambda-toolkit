import { exec } from 'node:child_process'
import Logger from '../interfaces/logger.interface';

class ExecResult<T> {
  constructor(private data: string) {
  }

  toJson(): T {
    return JSON.parse(this.data)
  }

  toString() {
    return this.data
  }
}

class CLIService {
  constructor(
    private logger: Logger
  ) {}

  async exec<T = any>(command:string, options: any): Promise<ExecResult<T>> {
    const commandTree = [command];

    for (const key in options) {
      if (options[key]) commandTree.push(`--${key}`, options[key])
    }

    return new Promise((resolve, reject) => {
      const commandLine = commandTree.join(' ');
      this.logger.debug('command-exec', 'exec >', commandLine) 

      exec(commandLine, (error, stdout, stderr) => {
        if (error) return reject(error);

        this.logger.debug('command-exec', 'result >', stdout)      
        resolve(new ExecResult(stdout))
      })
    })
  }
}

export default CLIService