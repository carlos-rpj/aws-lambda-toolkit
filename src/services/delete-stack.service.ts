import AwsApi from "../interfaces/aws-api.interface";
import Logger from "../interfaces/logger.interface";

class DeleteStackService {
  constructor(
    private aws: AwsApi,
    private logger: Logger,
  ) {}

  async delete(stackName: string, options: any) {
    const resources = await this.aws.listResources(stackName, options);
    const bucket = resources.find((resource) => resource.LogicalResourceId === 'ServerlessDeploymentBucket');

    await this.aws.deleteBucket(bucket.PhysicalResourceId, options);
    await this.aws.deleteStack(stackName, options);

    this.logger.info(`The stack '${stackName}' was successfully deleted!`);
  }
}

export default DeleteStackService