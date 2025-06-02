import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface EC2StackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
    keyPairName: "cdk_test"; // Test key pair name for SSH access
}

export class EC2Stack extends cdk.Stack {

    public readonly ec2SecurityGroup: ec2.SecurityGroup; // Exported security group for EC2 instance

    constructor(scope: Construct, id: string, props: EC2StackProps) {
        super(scope, id, props);


        // Security Group for EC2 instances
        const ec2SecurityGroup = new ec2.SecurityGroup(this, 'EC2SecurityGroup', {
            vpc: props.vpc,
            description: 'Security Group for EC2 Instance in AZ1',
            allowAllOutbound: true,
        });

        // Allow inbound SSH traffic from my IP for instance in AZ1
        ec2SecurityGroup.addIngressRule(
            ec2.Peer.ipv4('1.1.1.1/32'), // add own IP address here
            ec2.Port.tcp(22),
            'Allow SSH access from my IP'
        );

        // Exported security group for use in RDS stack
        this.ec2SecurityGroup = ec2SecurityGroup;

        cdk.Tags.of(ec2SecurityGroup).add('Name', 'Public-EC2-SG');

        // EC2 instance in AZ1
        const instanceAZ1 = new ec2.Instance(this, 'Public-EC2-Instance-AZ1', {
            vpc: props.vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC,
                availabilityZones: [props.vpc.availabilityZones[0]], // EC2 placed in the first AZ
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO), // t2.micro 
            securityGroup: ec2SecurityGroup, // Attach defined security group to the instance

            keyName: props.keyPairName, // Allows SSH access using key pair "cdk_test"
        });   
        
        cdk.Tags.of(instanceAZ1).add('Name', 'Public-EC2-Instance-AZ1');


        // EC2 instance in AZ2
        const instanceAZ2 = new ec2.Instance(this, 'Public-EC2-Instance-AZ2', {
            vpc: props.vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC,
                availabilityZones: [props.vpc.availabilityZones[1]], // EC2 placed in the second AZ
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO), // t2.micro 
            securityGroup: ec2SecurityGroup, // Attach defined security group to the instance

            keyName: props.keyPairName, // Allows SSH access using key pair "cdk_test"
        });   
        
        cdk.Tags.of(instanceAZ2).add('Name', 'Public-EC2-Instance-AZ2');
    }
}