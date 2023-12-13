import CLIExecAsyncHelper from "./cli-exec-async.helper.js";

class ListResourcesHelper {
  static async list(stackName, options) {
    const params = {
      profile: options.profile,
      region: options.region,
      query: options.query,
    }

    if (options.onlyPhysicalId) params.query = 'StackResources[*].PhysicalResourceId';
    if (options.onlyLogicalId) params.query = 'StackResources[*].LogicalResourceId';

    const result = await CLIExecAsyncHelper.exec(`aws cloudformation describe-stack-resources --stack-name ${stackName}`, params);
    const json = result.toJson();
    const data = json?.StackSummaries || json;

    return data;
  }
}

export default ListResourcesHelper