import AwsApi from "@interfaces/aws-api.interface";
import Logger from "@interfaces/logger.interface";

class ListResourcesService {
  constructor(
    private aws: AwsApi,
    private logger: Logger
  ) {}

  async list(stackName: string, options: any) {
    const resources = await this.aws.listResources(stackName, options);
    this.logger.info(resources);
  }
}

export default ListResourcesService