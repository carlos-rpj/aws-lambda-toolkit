import ListResourcesHelper from "../helpers/list-resources.helper.js";
import LoggerHelper from "../helpers/logger.helper.js";

class ListResourcesAction {
  static async list(stackName, options) {
    const resources = await ListResourcesHelper.list(stackName, options);
    LoggerHelper.info(resources);
  }
}

export default ListResourcesAction