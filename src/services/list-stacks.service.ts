import AwsApi from "@interfaces/aws-api.interface";
import Logger from "@interfaces/logger.interface";

class ListStacksService {
  constructor(
    private aws: AwsApi,
    private logger: Logger
  ) {}

  async list(options: any) {
    const resources = await this.aws.listStacks(options);
    this.logger.json(resources);
  }
}

export default ListStacksService