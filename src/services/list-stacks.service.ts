import type IAwsApi from "@interfaces/aws-api.interface";
import type ILogger from "@interfaces/logger.interface";

class ListStacksService {
  constructor(
    private aws: IAwsApi,
    private logger: ILogger
  ) {}

  async list(options: any) {
    const resources = await this.aws.listStacks(options);
    this.logger.json(resources);
  }
}

export default ListStacksService