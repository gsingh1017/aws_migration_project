#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from 'aws-cdk-lib';
import { CdkTypescriptStack } from '../lib/cdk_typescript-stack';
import { EC2Stack } from '../lib/ec2-stack';
import { RDSStack } from '../lib/rds-stack';
import { IAMStack } from '../lib/iam-stack';

const app = new cdk.App();
const vpcStack = new CdkTypescriptStack(app, 'CdkTypescriptStack', {

});

const iamStack = new IAMStack(app, "MyIAMStack", {
  vpc: vpcStack.vpc,
});

const ec2Stack = new EC2Stack(app, "MyEC2Stack", {
  vpc: vpcStack.vpc,
  ec2Role: iamStack.ec2Role, // Role for EC2 instances to access AWS services
});

new RDSStack(app, "MyRDSStack", {
  vpc: vpcStack.vpc,
  ec2SecurityGroupAccess: ec2Stack.ec2SecurityGroup, // Security group for EC2 instance
});

app.synth();