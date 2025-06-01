#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from 'aws-cdk-lib';
import { CdkTypescriptStack } from '../lib/cdk_typescript-stack';
import { EC2Stack } from '../lib/ec2-stack';

const app = new cdk.App();
const vpcStack = new CdkTypescriptStack(app, 'CdkTypescriptStack', {

});

new EC2Stack(app, "MyEC2Stack", {
  vpc: vpcStack.vpc,
  keyPairName: "cdk_test", // Test key pair name for SSH access
});
