import ListStacksHelper from "../helpers/list-stacks.helper.js";
import LoggerHelper from "../helpers/logger.helper.js";

class ListStacksAction {
  static async list(options) {
    const stacks = await ListStacksHelper.list(options);
    LoggerHelper.info(stacks);
  }
}

export default ListStacksAction