#!/usr/bin/env node
import path from 'path'
import { Command } from 'commander'

import ListResourcesAction from './src/actions/list-resources.action.js'
import DeleteStackAction from './src/actions/delete-stack.action.js'
import DeleteBucketAction from './src/actions/delete-bucket.action.js'
import ListStacksAction from './src/actions/list-stacks.action.js'

import JsonFileHelper from './src/helpers/json-file.helper.js'

const packageJson = JsonFileHelper.read(path.resolve('./package.json'))
const program = new Command()

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
  .action(ListStacksAction.list)

program
  .command('list-resources')
  .description('list the resources at a cloudformation stack')
  .argument('<string>', 'Name of the lambda stack')
  .option('--only-logical-id', 'List only the resource logical ids')
  .option('--only-physical-id', 'List only the resource physical ids')
  .option('--query <string>', 'A JMESPath query to use in filtering the response data')
  .option('--profile <string>', 'The name of AWS Profile')
  .option('--region <string>', 'The region on AWS')
  .action(ListResourcesAction.list)

program
  .command('delete-stack')
  .description('completly delete a cloudformation stack, including the dependent resources')
  .argument('<string>', 'Name of the lambda stack')
  .option('--profile <string>', 'The name of AWS Profile')
  .option('--region <string>', 'The region on AWS')
  .action(DeleteStackAction.delete)

program
  .command('delete-bucket')
  .description('cleanup and delete a S3 bucket')
  .argument('<string>', 'Name of the S3 Bucket')
  .option('--profile <string>', 'The name of AWS Profile')
  .option('--region <string>', 'The region on AWS')
  .action(DeleteBucketAction.delete)

program.parse();