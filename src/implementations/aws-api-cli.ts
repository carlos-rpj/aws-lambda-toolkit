import IAwsApi, {
	DefaultParams,
	DeleteBucketOptions,
	DeleteStackOptions,
	ListResourcesOptions,
	ListStackOptions,
	StackResource,
	StackSummary,
} from "@interfaces/aws-api.interface";
import type ILogger from "@interfaces/logger.interface";
import type IProcessExec from "@interfaces/proccess-exec.interface";

type ListStackResourcesWithoutQuery = {
	StackResources: StackResource[];
};

type ListStackWithoutQuery = {
	StackSummaries: StackSummary[];
};

type ListStacksResultJson = ListStackWithoutQuery | StackSummary[];
type ListStacksResourcesResultJson =
	| ListStackResourcesWithoutQuery
	| StackResource[];

class AwsApiCli implements IAwsApi {
	constructor(private cli: IProcessExec, private logger: ILogger) {}

	private defaultParams(options: DefaultParams): DefaultParams {
		return {
			profile: options.profile,
			region: options.region,
		};
	}

	async listStacks(options: ListStackOptions) {
		const params = this.defaultParams(options);

		params.query = options.query;
		params["stack-status-filter"] = options.status;

		if (options.onlyName) params.query = "StackSummaries[*].StackName";

		const result = await this.cli.exec<ListStacksResultJson>(
			"aws cloudformation list-stacks",
			params,
		);
		const json = result.toJson();
		const data = Array.isArray(json) ? json : json?.StackSummaries;

		if (!params.query && options.filterName) {
			this.logger.info("Filter by name:", options.filterName);
			return data.filter((stack) =>
				stack.StackName.includes(<string>options.filterName),
			);
		}

		return data;
	}

	async listResources(stackName: string, options: ListResourcesOptions) {
		const params = this.defaultParams(options);
		params.query = options.query;

		if (options.onlyPhysicalId)
			params.query = "StackResources[*].PhysicalResourceId";
		if (options.onlyLogicalId)
			params.query = "StackResources[*].LogicalResourceId";

		const result = await this.cli.exec<ListStacksResourcesResultJson>(
			`aws cloudformation describe-stack-resources --stack-name ${stackName}`,
			params,
		);

		const json = result.toJson();
		const data = Array.isArray(json) ? json : json?.StackResources;

		return data;
	}

	async deleteBucket(bucketName: string, options: DeleteBucketOptions) {
		const params = this.defaultParams(options);

		const result = await this.cli.exec(
			`aws s3 rm s3://${bucketName} --recursive`,
			params,
		);
		return result.toString();
	}

	async deleteStack(stackName: string, options: DeleteStackOptions) {
		const params = this.defaultParams(options);

		const result = await this.cli.exec(
			`aws cloudformation delete-stack --stack-name ${stackName}`,
			params,
		);
		return result.toString();
	}
}

export default AwsApiCli;
