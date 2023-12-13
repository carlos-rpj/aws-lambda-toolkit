import CLIExecAsyncHelper from "./cli-exec-async.helper.js";
import LoggerHelper from "./logger.helper.js";

class ListStacksHelper {
  static async list(options) {
    const params = {
      profile: options.profile,
      region: options.region,
      query: options.query,
      'stack-status-filter': options.status,
    }

    if (options.onlyName) params.query = 'StackSummaries[*].StackName';

    const result = await CLIExecAsyncHelper.exec(`aws cloudformation list-stacks`, params);
    const json = result.toJson();
    const data = json?.StackSummaries || json;

    if (!params.query && options.filterName) {
      LoggerHelper.info('Filter by name:', options.filterName)
      return data.filter(stack => stack.StackName.includes(options.filterName));
    }

    return data;
  }
}

export default ListStacksHelper