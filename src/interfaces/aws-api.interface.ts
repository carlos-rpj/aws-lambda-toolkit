interface AwsApi {
  listStacks(options: any): Promise<any[]>;
  listResources(stackName: string, options: any): Promise<any[]>;
  deleteBucket(bucketName: string, options: any): Promise<string>;
  deleteStack(stackName: string, options: any): Promise<string>;
}

export default AwsApi