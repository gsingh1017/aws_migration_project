# AWS CDK Project Setup

This section provides the essential steps to get this AWS CDK project up and running locally.


1. Prerequisites

Before launching this project, ensure you have the following installed and configured on your local machine:

    - An active AWS account. [install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) [configure]
    - AWS CLI installed globally and configured with credentials for your AWS account
        - [install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
        - [configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
    - Node.js & npm installed. [install](https://nodejs.org/en/download/)
    - AWS System Manager Sesion Manager Plugin installed. [install](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html)


2. Project Setup

    1. Clone the repository using "git clone"
    2. Navigate to the root of your CDK project (where package.json is located) and install the necessary Node.js modules with "npm install"
    3. Bootstrap your AWS environment with "cdk bootstrap"


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
