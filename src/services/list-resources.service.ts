import Logger from "../interfaces/logger.interface";
import AWSService from "./aws.service";

class ListResourcesService {
  constructor(
    private aws: AWSService,
    private logger: Logger
  ){}

  async list(stackName: string, options: any) {
    const resources = await this.aws.listResources(stackName, options);
    this.logger.info(resources);
  }
}

export default ListResourcesService