import CLIService from "@services/cli.service";
import AwsApiCli from "@implementations/aws-api-cli";
import Logger from "@interfaces/logger.interface";

const defaultParams = {
  profile: 'default',
  region: 'us-east-1'
}

const mockLogger: Logger = {
  info: jest.fn(),
  debug: jest.fn(),
  json: jest.fn()
}

const mockCliResult = {
  toJson: jest.fn(),
  toString: jest.fn()
}

const mockCli = {
  exec: jest.fn().mockResolvedValue(mockCliResult)
}

const awsApiCli = new AwsApiCli(mockCli as unknown as CLIService, mockLogger)

describe('list stacks', () => {
  const mockStack = {
    StackId: "arn:aws:cloudformation:us-east-1:ACCOUNT_ID:stack/STACK_NAME/UUID",
    StackName: "STACK_NAME",
    TemplateDescription: "",
    CreationTime: "2023-11-07T01:38:06.403Z",
    LastUpdatedTime: "2023-12-12T22:06:28.568Z",
    StackStatus: "UPDATE_COMPLETE",
    DriftInformation: {
      StackDriftStatus: "NOT_CHECKED"
    }
  }

  test('should list the stacks', async () => {
    mockCliResult.toJson.mockReturnValue({
      StackSummaries: [mockStack]
    })

    const stacks = await awsApiCli.listStacks(defaultParams)

    expect(stacks.length).toBe(1)
    expect(stacks[0]).toEqual(mockStack)
    expect(mockCli.exec).toHaveBeenCalledWith(
      "aws cloudformation list-stacks",
      {
        profile: "default",
        region: "us-east-1",
      }
    )
  })

  test('should list the stacks - only name', async () => {
    mockCliResult.toJson.mockReturnValue([mockStack.StackName])

    const params = {
      ...defaultParams,
      onlyName: true
    }

    const stacks = await awsApiCli.listStacks(params)

    expect(stacks.length).toBe(1)
    expect(stacks[0]).toEqual(mockStack.StackName)
    expect(mockCli.exec).toHaveBeenCalledWith(
      "aws cloudformation list-stacks",
      {
        profile: "default",
        query: "StackSummaries[*].StackName",
        region: "us-east-1",
      }
    )
  })

  test('should list the stacks - filter name', async () => {
    mockCliResult.toJson.mockReturnValue({
      StackSummaries: [mockStack]
    })

    const params = {
      ...defaultParams,
      filterName: 'STACK_NAME'
    }

    const stacks = await awsApiCli.listStacks(params)

    expect(stacks.length).toBe(1)
    expect(stacks[0]).toEqual(mockStack)
    expect(mockCli.exec).toHaveBeenCalledWith(
      "aws cloudformation list-stacks",
      {
        profile: "default",
        region: "us-east-1",
      }
    )
  })

  test('shouldn\'t list the stacks - filter name', async () => {
    mockCliResult.toJson.mockReturnValue({
      StackSummaries: [mockStack]
    })

    const params = {
      ...defaultParams,
      filterName: 'OTHER_STACK'
    }

    const stacks = await awsApiCli.listStacks(params)
    expect(stacks.length).toBe(0)
  })
})

describe('list resources', () => {
  const mockResource = {
    StackName: "STACK_NAME",
    StackId: "arn:aws:cloudformation:us-east-1:ACCOUNT_ID:stack/STACK_NAME/UUID",
    LogicalResourceId: "LOGICAL_RESOURCE_ID",
    PhysicalResourceId: "PHYSICAL_RESOURCE_ID",
    ResourceType: "RESOURCE_TYPE",
    Timestamp: "2021-07-28T18:06:17.425Z",
    ResourceStatus: "CREATE_COMPLETE",
    DriftInformation: {
      StackResourceDriftStatus: "NOT_CHECKED"
    }
  }

  test('should list the resources', async () => {
    mockCliResult.toJson.mockReturnValue({
      StackResources: [mockResource]
    })

    const resources = await awsApiCli.listResources('mock-stack', defaultParams)

    expect(resources.length).toBe(1)
    expect(resources[0]).toEqual(mockResource)
    expect(mockCli.exec).toHaveBeenCalledWith(
      "aws cloudformation describe-stack-resources --stack-name mock-stack",
      {
        profile: "default",
        region: "us-east-1",
      }
    )
  })

  test('shouldn\'t list the resources', async () => {
    mockCliResult.toJson.mockReturnValue({
      StackResources: []
    })

    const resources = await awsApiCli.listResources('mock-stack', defaultParams)
    expect(resources.length).toBe(0)
  })

  test('should list the resources - only physical resource id', async () => {
    mockCliResult.toJson.mockReturnValue([mockResource.PhysicalResourceId])
    
    const params = {
      ...defaultParams,
      onlyPhysicalId: true
    }

    const resources = await awsApiCli.listResources('mock-stack', params)

    expect(resources.length).toBe(1)
    expect(resources[0]).toEqual(mockResource.PhysicalResourceId)
    expect(mockCli.exec).toHaveBeenCalledWith(
      "aws cloudformation describe-stack-resources --stack-name mock-stack",
      {
        profile: "default",
        region: "us-east-1",
        query: "StackResources[*].PhysicalResourceId"
      }
    )
  })

  test('should list the resources - only logical resource id', async () => {
    mockCliResult.toJson.mockReturnValue([mockResource.LogicalResourceId])
    
    const params = {
      ...defaultParams,
      onlyLogicalId: true
    }

    const resources = await awsApiCli.listResources('mock-stack', params)

    expect(resources.length).toBe(1)
    expect(resources[0]).toEqual(mockResource.LogicalResourceId)
    expect(mockCli.exec).toHaveBeenCalledWith(
      "aws cloudformation describe-stack-resources --stack-name mock-stack",
      {
        profile: "default",
        region: "us-east-1",
        query: "StackResources[*].LogicalResourceId"
      }
    )
  })
})

describe('delete bucket', () => {
  test('should delete the bucket', async () => {
    await awsApiCli.deleteBucket('mock-bucket', defaultParams)

    expect(mockCli.exec).toHaveBeenCalledWith(
      "aws s3 rm s3://mock-bucket --recursive",
      {
        profile: "default",
        region: "us-east-1",
      }
    )
  })
})

describe('delete stack', () => {
  test('should delete the stack', async () => {
    await awsApiCli.deleteStack('mock-stack', defaultParams)

    expect(mockCli.exec).toHaveBeenCalledWith(
      "aws cloudformation delete-stack --stack-name mock-stack",
      {
        profile: "default",
        region: "us-east-1",
      }
    )
  })
})