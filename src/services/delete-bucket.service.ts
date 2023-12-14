import type IAwsApi from "@interfaces/aws-api.interface";
import type ILogger from "@interfaces/logger.interface";

class DeleteBucketService {
  constructor(
    private aws: IAwsApi,
    private logger: ILogger
  ) {}

  async delete(bucketName:string, options: any) {
    const result = await this.aws.deleteBucket(bucketName, options);
    this.logger.info(result);
  }
}

export default DeleteBucketService