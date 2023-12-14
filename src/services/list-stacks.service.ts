import Logger from "../interfaces/logger.interface";
import AWSService from "./aws.service";

class ListStacksService {
  constructor(
    private aws: AWSService,
    private logger: Logger
  ) {}

  async list(options: any) {
    const resources = await this.aws.listStacks(options);
    this.logger.info(resources);
  }
}

export default ListStacksService