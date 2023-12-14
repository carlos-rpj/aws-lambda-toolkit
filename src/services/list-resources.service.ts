import type IAwsApi from "@interfaces/aws-api.interface";
import type ILogger from "@interfaces/logger.interface";

class ListResourcesService {
  constructor(
    private aws: IAwsApi,
    private logger: ILogger
  ) {}

  async list(stackName: string, options: any) {
    const resources = await this.aws.listResources(stackName, options);
    this.logger.json(resources);
  }
}

export default ListResourcesService