import DeleteBucketHelper from "../helpers/delete-bucket.helper.js";
import LoggerHelper from "../helpers/logger.helper.js";

class DeleteBucketAction {
  static async delete(bucketName, options) {
    const result = await DeleteBucketHelper.delete(bucketName, options);
    LoggerHelper.info(result);
  }
}

export default DeleteBucketAction