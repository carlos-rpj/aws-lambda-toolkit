import CLIExecAsyncHelper from "./cli-exec-async.helper.js";

class DeleteStackHelper {
  static async delete(stackName, options) {
    const params = {
      profile: options.profile,
      region: options.region,
    }

    const result = await CLIExecAsyncHelper.exec(`aws cloudformation delete-stack --stack-name ${stackName}`, params);
    return result.toString();
  }
}

export default DeleteStackHelper