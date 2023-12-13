import { exec } from 'node:child_process'
import LoggerHelper from './logger.helper.js'

class ExecResult {
  constructor(data) {
    this.data = data
  }

  toJson() {
    return JSON.parse(this.data)
  }

  toString() {
    return this.data
  }
}

class CLIExecAsyncHelper {
  /**
   * @param {string} command Command to be executed
   * @returns {Promise<ExecResult>} Object of a command result
   */
  static async exec(command, options) {
    const commandTree = [command];

    for (const key in options) {
      if (options[key]) commandTree.push(`--${key}`, options[key])
    }

    return new Promise((resolve, reject) => {
      const commandLine = commandTree.join(' ');
      LoggerHelper.debug('command-exec', 'exec >', commandLine) 

      exec(commandLine, (error, stdout, stderr) => {
        if (error) return reject(error);

        LoggerHelper.debug('command-exec', 'result >', stdout)      
        resolve(new ExecResult(stdout))
      })
    })
  }
}

export default CLIExecAsyncHelper