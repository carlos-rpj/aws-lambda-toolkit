
import AwsApi from '@interfaces/aws-api.interface';
import Logger from '@interfaces/logger.interface';
import CLIService from '@services/cli.service';

class AwsApiCli implements AwsApi {
  constructor(
    private cli: CLIService,
    private logger: Logger
  ) { }

  private defaultParams(options: Record<'profile'|'region', string>) {
    return {
      profile: options.profile,
      region: options.region,
    }
  }

  async listStacks(options: any) {
    const params: any = this.defaultParams(options);

    params.query = options.query;
    params['stack-status-filter'] = options.status;

    if (options.onlyName) params.query = 'StackSummaries[*].StackName';

    const result = await this.cli.exec(`aws cloudformation list-stacks`, params);
    const json = result.toJson();
    const data = json?.StackSummaries || json;

    if (!params.query && options.filterName) {
      this.logger.info('Filter by name:', options.filterName)
      return data.filter((stack: { StackName: string }) => stack.StackName.includes(options.filterName));
    }

    return data;
  }

  async listResources(stackName: string, options: any) {
    const params: any = this.defaultParams(options);
    params.query = options.query;

    if (options.onlyPhysicalId) params.query = 'StackResources[*].PhysicalResourceId';
    if (options.onlyLogicalId) params.query = 'StackResources[*].LogicalResourceId';

    const result = await this.cli.exec(`aws cloudformation describe-stack-resources --stack-name ${stackName}`, params)
    const json = result.toJson();
    const data = json?.StackResources || json;

    return data;
  }

  async deleteBucket(bucketName: string, options: any) {
    const params = this.defaultParams(options);

    const result = await this.cli.exec(`aws s3 rm s3://${bucketName} --recursive`, params);
    return result.toString();
  }

  async deleteStack(stackName: string, options: any) {
    const params = this.defaultParams(options);

    const result = await this.cli.exec(`aws cloudformation delete-stack --stack-name ${stackName}`, params);
    return result.toString();
  }
}

export default AwsApiCli