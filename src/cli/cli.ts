#!/usr/bin/env node
import { Command } from 'commander'

import ConsoleLogger from '@implementations/console-logger'
import AwsApiCli from '@implementations/aws-api-cli'

import CLIService from '@services/cli.service'
import ListStacksService from '@services/list-stacks.service'
import ListResourcesService from '@services/list-resources.service'
import DeleteBucketService from '@services/delete-bucket.service'
import DeleteStackService from '@services/delete-stack.service'
import packageJson  from '@package.json'

const program = new Command()

const consoleLogger = new ConsoleLogger()
const cliService = new CLIService(consoleLogger)
const awsApiCli = new AwsApiCli(cliService, consoleLogger)

const listStacksService = new ListStacksService(awsApiCli, consoleLogger)
const listResourcesService = new ListResourcesService(awsApiCli, consoleLogger)
const deleteBucketService = new DeleteBucketService(awsApiCli, consoleLogger)
const deleteStackService = new DeleteStackService(awsApiCli, consoleLogger)

program
  .name('aws-lambda-toolkit')
  .description(packageJson.description)
  .version(packageJson.version, '-v, --version')

program
  .command('list-stacks')
  .description('list the cloudformation stacks')
  .option('--query <string>', 'A JMESPath query to use in filtering the response data')
  .option('--status <string>', 'Status of tasks')
  .option('--filter-name <string>', 'Filter stacks by name')
  .option('--only-name', 'List only the stacks names')
  .option('--profile <string>', 'The name of AWS Profile')
  .option('--region <string>', 'The region on AWS')
  .action(listStacksService.list.bind(listStacksService))

program
  .command('list-resources')
  .description('list the resources at a cloudformation stack')
  .argument('<string>', 'Name of the lambda stack')
  .option('--only-logical-id', 'List only the resource logical ids')
  .option('--only-physical-id', 'List only the resource physical ids')
  .option('--query <string>', 'A JMESPath query to use in filtering the response data')
  .option('--profile <string>', 'The name of AWS Profile')
  .option('--region <string>', 'The region on AWS')
  .action(listResourcesService.list.bind(listResourcesService))

program
  .command('delete-stack')
  .description('completly delete a cloudformation stack, including the dependent resources')
  .argument('<string>', 'Name of the lambda stack')
  .option('--profile <string>', 'The name of AWS Profile')
  .option('--region <string>', 'The region on AWS')
  .action(deleteStackService.delete.bind(deleteStackService))

program
  .command('delete-bucket')
  .description('cleanup and delete a S3 bucket')
  .argument('<string>', 'Name of the S3 Bucket')
  .option('--profile <string>', 'The name of AWS Profile')
  .option('--region <string>', 'The region on AWS')
  .action(deleteBucketService.delete.bind(deleteBucketService))

program.parse();