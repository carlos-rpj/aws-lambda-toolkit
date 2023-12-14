import Logger from "../interfaces/logger.interface";
import AWSService from "./aws.service";

class DeleteStackService {
  constructor(
    private aws: AWSService,
    private logger: Logger,
  ){}

  async delete(stackName: string, options: any) {
    const resources = await this.aws.listResources(stackName, options);
    const bucket = resources.find((resource) => resource.LogicalResourceId === 'ServerlessDeploymentBucket');

    await this.aws.deleteBucket(bucket.PhysicalResourceId, options);
    await this.aws.deleteStack(stackName, options);

    this.logger.info(`The stack '${stackName}' was successfully deleted!`);
  }
}

export default DeleteStackService