serverless create --template aws-nodejs --path my-sls-project

# Create a new serverless project

serverless

# Move into the newly created directory

cd your-service-nameF

# Use template serverless project

serverless --template-url=https://github.com/serverless/examples/tree/v3/...

# sls deploy

sls deploy
sls deploy function -f my-api // deploy only function
serverless deploy function --function myFun

sls invoke -f hello // invoke a function without an end point

# Invoke and display logs:

serverless invoke -f hello --log

serverless info //

serverless offline --reloadHandler

## timeout error in serverless-offline

1. set timeout of lambda to 30 - write in provider - `timeout: 30`
2. in custom of serverless-offline - write `noTimeout: true`

## EMPFILE too many open files in serverless deploy

1. include two plugin in service.plugin
   i) serverless-plugin-include-dependencies and
   ii) serverless-plugin-common-excludes

2. Not recommended (Data will be deleted)  
   serverless remove, and again
   serverless deploy

## serverless plugin

serverless-offline
serverless-iam-roles-per-function
serverless-plugin-include-dependencies
serverless-plugin-common-excludes

## serverless commands

serverless deploy
serverless logs // to fetch logs from all functions across all services
serverless info // to view all services info
serverless remove // to remove all services
serverless outputs // to view all services outputs
serverless refresh-outputs // to refresh outputs of all services
serverless logs --tail

## Authentication and authorization - API Gateway Access Controlling Methods

1. API Key - authorizing api gateway with a api key - send api key in header as x-api-key
2. Lambda Authorizer
   - token and request mode (default token mode)
   - send authorization token in Authorization header (like jwt token)
3. Cognito User Pool Authorizer
   - This authorizer only check, user is available in cognito user pool or not
   - This can cause a problem when we will you cognito user groups, as it won't check user is present in that group or not
4. IAM Authorizer
5. Others :
   i) VPC Endpoints
   ii) API Gateway resource policy
   iii) Tagged based access control

## TODO

authorizers in serverless functions

## CognitoJwtVerifier

check token is generated from user pool which we specify in configuration
check token is expired or not
support user pool groups

## User is not authorized to access this resource

(Note : it happens when you call your 2nd lambda function )
stackOverflow - https://stackoverflow.com/questions/66223516/aws-user-is-not-authorized-to-access-this-resource
it happend due to policy caching of browser
set TTL of authorizer to 0 from api gateway authorizer dashboard
