interface IAwsApi {
	listStacks(options: ListStackOptions): Promise<StackSummary[]>;
	listResources(
		stackName: string,
		options: ListResourcesOptions,
	): Promise<StackResource[]>;
	deleteBucket(
		bucketName: string,
		options: DeleteBucketOptions,
	): Promise<string>;
	deleteStack(stackName: string, options: DeleteStackOptions): Promise<string>;
}

export type DefaultParams = {
	[key: string]: string | undefined;
	profile: string;
	region: string;
};

export type ListStackOptions = DefaultParams & {
	query?: string;
	status?: string;
	onlyName?: boolean;
	filterName?: string;
};

export type ListResourcesOptions = DefaultParams & {
	query?: string;
	onlyPhysicalId?: boolean;
	onlyLogicalId?: boolean;
};

export type DeleteBucketOptions = DefaultParams & {};

export type DeleteStackOptions = DefaultParams & {};

export type StackSummary = {
	StackName: string;
};

export type StackResource = {
	PhysicalResourceId: string;
	LogicalResourceId: string;
};

export default IAwsApi;
