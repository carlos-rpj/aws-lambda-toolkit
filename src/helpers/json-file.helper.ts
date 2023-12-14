import fs from 'fs'

class JsonFileHelper {
  static read<T = any>(path: string): T {
    const json = fs.readFileSync(path);
    return JSON.parse(json.toString());
  }
}

export default JsonFileHelper