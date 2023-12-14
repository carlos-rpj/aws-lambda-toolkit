import Logger from "../interfaces/logger.interface";
import AWSService from "./aws.service";

class DeleteBucketService {
  constructor(
    private aws: AWSService,
    private logger: Logger
  ){}

  async delete(bucketName:string, options: any) {
    const result = await this.aws.deleteBucket(bucketName, options);
    this.logger.info(result);
  }
}

export default DeleteBucketService