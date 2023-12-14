import AwsApi from "../interfaces/aws-api.interface";
import Logger from "../interfaces/logger.interface";

class DeleteBucketService {
  constructor(
    private aws: AwsApi,
    private logger: Logger
  ) {}

  async delete(bucketName:string, options: any) {
    const result = await this.aws.deleteBucket(bucketName, options);
    this.logger.info(result);
  }
}

export default DeleteBucketService