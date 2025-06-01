import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface EC2StackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
    keyPairName: "cdk_test"; // Test key pair name for SSH access
}

export class EC2Stack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: EC2StackProps) {
        super(scope, id, props);


        // Security Group for instance in AZ1
        const securityGroupAZ1 = new ec2.SecurityGroup(this, 'SecurityGroupAZ1', {
            vpc: props.vpc,
            description: 'Security Group for EC2 Instance in AZ1',
            allowAllOutbound: true,
        });

        // Allow inbound SSH traffic from my IP for instance in AZ1
        securityGroupAZ1.addIngressRule(
            ec2.Peer.ipv4('50.98.36.55/32'),
            ec2.Port.tcp(22),
            'Allow SSH access from my IP'
        );

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
            securityGroup: securityGroupAZ1,

            keyName: props.keyPairName, // Specify the key pair name for SSH access
        });   
        
        cdk.Tags.of(securityGroupAZ1).add('Name', 'Public-EC2-SG-AZ1');
        cdk.Tags.of(instanceAZ1).add('Name', 'Public-EC2-Instance-AZ1');


        // Security Group for instance in AZ2
        const securityGroupAZ2 = new ec2.SecurityGroup(this, 'SecurityGroupAZ2', {
            vpc: props.vpc,
            description: 'Security Group for EC2 Instance in AZ2',
            allowAllOutbound: true,
        });

        // Allow inbound SSH traffic from my IP for instance in AZ2
        securityGroupAZ2.addIngressRule(
            ec2.Peer.ipv4('50.98.36.55/32'),
            ec2.Port.tcp(22),
            'Allow SSH access from my IP'
        );

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
            securityGroup: securityGroupAZ2,
            
            keyName: props.keyPairName, // Specify the key pair name for SSH access
        });   
        
        cdk.Tags.of(securityGroupAZ2).add('Name', 'Public-EC2-SG-AZ2');
        cdk.Tags.of(instanceAZ2).add('Name', 'Public-EC2-Instance-AZ2');
    }
}