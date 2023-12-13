import DeleteBucketHelper from "../helpers/delete-bucket.helper.js";
import DeleteStackHelper from "../helpers/delete-stack.helper.js";
import ListResourcesHelper from "../helpers/list-resources.helper.js";
import LoggerHelper from "../helpers/logger.helper.js";

class DeleteStackAction {
  static async delete(stackName, options) {
    const resources = await ListResourcesHelper.list(stackName, options);
    const bucket = resources.find((resource) => resource.LogicalResourceId === 'ServerlessDeploymentBucket');

    await DeleteBucketHelper.delete(bucket.PhysicalResourceId, options);
    await DeleteStackHelper.delete(stackName, options);

    LoggerHelper.info(`The stack '${stackName}' was successfully deleted!`);
  }
}

export default DeleteStackAction