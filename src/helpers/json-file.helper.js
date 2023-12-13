import fs from 'fs'

class JsonFileHelper {
  /**
   * Read a JSON from file
   * @param {string} path Path of the file
   * @returns {object} JavaScript object
   */
  static read(path) {
    const json = fs.readFileSync(path);
    return JSON.parse(json);
  }
}

export default JsonFileHelper