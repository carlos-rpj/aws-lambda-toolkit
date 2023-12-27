import IAwsApi, { ListStackOptions } from "@interfaces/aws-api.interface";
import type ILogger from "@interfaces/logger.interface";

class ListStacksService {
	constructor(private aws: IAwsApi, private logger: ILogger) {}

	async list(options: ListStackOptions) {
		const resources = await this.aws.listStacks(options);
		this.logger.json(resources);
	}
}

export default ListStacksService;
