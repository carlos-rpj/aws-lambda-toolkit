import IAwsApi, { DeleteStackOptions } from "@interfaces/aws-api.interface";
import type ILogger from "@interfaces/logger.interface";

class DeleteStackService {
	constructor(private aws: IAwsApi, private logger: ILogger) {}

	async delete(stackName: string, options: DeleteStackOptions) {
		const resources = await this.aws.listResources(stackName, options);
		const bucket = resources.find(
			(resource) => resource.LogicalResourceId === "ServerlessDeploymentBucket",
		);

		if (bucket) {
			await this.aws.deleteBucket(bucket.PhysicalResourceId, options);
		}

		await this.aws.deleteStack(stackName, options);

		this.logger.info(`The stack '${stackName}' was successfully deleted!`);
	}
}

export default DeleteStackService;
