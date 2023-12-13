import CLIExecAsyncHelper from "./cli-exec-async.helper.js";

class DeleteBucketHelper {
  static async delete(bucketName, options) {
    const params = {
      profile: options.profile,
      region: options.region,
    }

    const result = await CLIExecAsyncHelper.exec(`aws s3 rm s3://${bucketName} --recursive`, params);
    return result.toString();
  }
}

export default DeleteBucketHelper