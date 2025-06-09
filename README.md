# Manual to IaC - AWS Migration (TechHealth Inc.)

## Deliverables:

Access my detailed breakdown on Medium [here](https://medium.com/@gurniksingh/modernizing-aws-infrastructure-with-cdk-a-patient-portal-case-study-8193371a4855).

### Updated Architecture:

![Updated_Architecture](images/Updated_Architecture.png)

------------------------------------------------------------------

## Project Brief:

TechHealth Inc., a healthcare technology company, built their AWS infrastructure manually through the AWS Console 5 years ago. They have a patient portal web application that needs to be modernized and migrated to Infrastructure as Code.

### Current Situation

- All infrastructure was created manually via AWS Console
- No version control of infrastructure changes
- Difficult to replicate environments
- Hard to track who made what changes
- No automated testing of infrastructure
- Infrastructure documentation is outdated

### Current Infrastructure:

![Initial_Architecture](images/Initial_Architecture.png)

- Web application running on EC2 instances
- MySQL RDS database storing patient data
- Basic VPC setup with all resources in public subnets
- No proper network segmentation
- Manual security group configurations
- Resources spread across multiple availability zones without proper organization

------------------------------------------------------------------