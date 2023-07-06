aws lambda list-functions
aws lambda list-functions --region eu-west-1
aws sts get-caller-identity
aws iam list-users
aws --version
aws configure

### upload file to s3 bucket from CLI

```
aws s3 cp localFileName.zip s3://my-bucket-name/optional-file-name.zip
```

### Update lambda function from CLI

```
aws lambda update-function-code --function-name lambdaFunctionName --s3-bucket my-bucket-name --s3-key myFile.zip --publish
```

## setup aws

node index.js // to run index.js
npm i aws-sdk // install aws-jdk
npm i @aws-sdk/client-dynamodb // install only dynamodb services (for Bare bones API calls)
npm install @aws-sdk/lib-dynamodb // install only dynamodb library // to use DynamoDBDocumentClient class
