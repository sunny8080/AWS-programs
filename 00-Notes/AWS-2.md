## DynamoDB

## Data Types

1. Scalar Types -
   Exactly one value
   eg - string, number, binary, boolean and null
2. Set Types
   Multiple scalar value
   unordered collection of strings, number or binary
   only non empty values
   no duplicates allowed
   no empty sets allowed
   all values must be of same scalar type
   eg - string set, number set and binary set
   eg - ["sdf", "asdf", "454"]
   eg - [45, 78, 20]
3. Document Types
   Complex structure with nested attributes
   only non empty values in list and map
   empty lists and maps are allowed
   eg - list and map

   list -

   - ordered collection of values
   - can have multiple data types
   - eg ["Jon", 12.5, "apples"]

   map-

   - unordered collection of key-value pairs
   - ideal for storing json documents
   - eg

   ```
      {
        name : "Sunny",
        age: 22,
        address : {
          city: "asdf",
          state: "bihar"
        }
      }
   ```

## DynamoDB Consistency

DDB supports two types of read operations

1. Strong consistency
   provides most up to date data
   must be requested explicitly
2. Eventual consistency
   may or may not reflect the latest copy of data
   default consistency for all operations
   50% cheaper

## DynamoDB capacity units

1. throughput capacity
   WCU - write capacity units
   RCU - read capacity units

   RCUs
   1 RCU = 1 strongly consistence read/sec = 2 eventually consistence read/sec
   in blocks of 4 KB

   WCUs
   1 WCU = 1 table write/sec
   in blocks of 1 KB

2. Burst Capacity
   to provide for occasional burst or spikes
   5 minutes or 300 seconds of unused read and write capacity

## DynamoDB Indexes

    1. Primary index (Table index)
    2. secondary index
      2.1) Local secondary index
      2.2) Global secondary index

    index key = simple key (only partition or hash key) or composite key (partition + sort key)

## Bare bones API call vs Full API calls

## In BatchWriteItem, we cannot update an item. only PutItem and DeleteItem is allowed.

Also, we cannot specify conditions on individual put and delete requests, and BatchWriteItem does not return deleted items in the response.

Also, we can't perform multiple operations on the same item in the same BatchWriteItem request. For example, you cannot put and delete the same item in the same BatchWriteItem request.

Also, we can't process more than 25 request in a Batch

## ASL (Amazon State Language) - JSON based structured language that allows to define various steps or states of a state machine as well as interaction b/w different machines

## Amazon State Machine

## serverless CI/CD tools -

## Amazon Step Function - AWS services

## Code Commit - aws services

provide git supports (git push, pull, commit, branch, ... )

## Code Build - aws services

used to package and build serverless project

## Code Pipeline - aws services

## Cognito - aws service

give users an identity to interact with our web or mobile application

1.  Cognito user pools -
    - sign in functionality for app users
    - integrate with API gateway & application load balancer
2.  Cognito Identity pools (Federated identity) -
    - Provide AWS credentials (like AWS IAM policy) to users so they can access AWS resources directly
    - Integrate with Cognito User Pools as an identity provider

> Cognito vs IAM - "hundreds of users", "mobile users","authenticate with SAML"
> these users sit outside of aws




https://<your_domain>/oauth2/authorize?response_type=code&client_id=<your_app_client_id>&redirect_uri=<your_callback_url>

https://<your_domain>/login?response_type=token&client_id=<your_app_client_id>&redirect_uri=<your_callback_url>

https://user-notes-api.auth.ap-south-1.amazoncognito.com/login?response_type=token&client_id=1mdo5bdttd63kg88rj2gng69e9&redirect_uri=http://localhost:3000/ 



https://user-notes.auth.ap-south-1.amazoncognito.com/login?response_type=token&client_id=5ver2k0tbdqr2198jj3k4tpjke&redirect_uri=http://localhost:3000/ 



http://localhost:3000/#id_token=
eyJraWQiOiIremtrVzdMVEdZdEloV2VvVlBxQ3c5V01LOG1zc2E3SE8zRmZESUZEb0RjPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiMFBRTmkyRzdDQzJjT0NGQml5NW1ydyIsInN1YiI6ImUxZjNmZGRhLTgwZTEtNzBlMC02MTI1LWI5NTdmNWFkYzcxNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0RoVHFBZG5lYyIsImNvZ25pdG86dXNlcm5hbWUiOiJ1c2VyMDAwMSIsImF1ZCI6IjFrbDhtNDh2NnE0MjFic2IyOHVyMmJyZ2ZxIiwiZXZlbnRfaWQiOiIxZDI2NzE5NS03Zjg4LTQ1YzAtODY1Yy01YjBmYjlmYTFlNGEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY4OTg3ODU5OSwiZXhwIjoxNjg5ODgyMTk5LCJpYXQiOjE2ODk4Nzg1OTksImp0aSI6Ijg4M2Q5MDUyLTQ2YzMtNDQ5NC1hNTkyLWQzYzhiZmRhODdiMCIsImVtYWlsIjoieGVjZWhpczIyM0BubWFsbGVyLmNvbSJ9.qMt0B8PQNtK8E1EpBIIfGYh9GDuX4ewO_lSIkFMt2UtfV10WwuFNAA_OXr5PH_2b7A0bKtyXe3FecHkD5O-ii8yITcKs12rWmdwskvhgUJzWH6tQGhNYVrDBXu75BrbUQvH74cyes-urwhv091qAF98k7Z4mAHZzALkGEjbOOuHo4qmQwRRYFQ4-mTEftlhBYfr3O_GXpGMUJrHg0P4Dmb13PSX2r_pSnRmNV9yw_WK3mM5llPGzRrsuZFkbB1eBGP9OOPaZgms7K_kfFZuM8Rzb5YCVrcooMAolMY6iSc4VsnLsBRtpi9JHSTLDIHkjxdT9nXw6Q7KG7yt-DuDJRA

&access_token=eyJraWQiOiI3MGsxdXhNN2hUN2RjNGc0c1A0bjRFYUJqcElTeERmWGw0c0xOY1EwVDVJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMWYzZmRkYS04MGUxLTcwZTAtNjEyNS1iOTU3ZjVhZGM3MTUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0RoVHFBZG5lYyIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjFrbDhtNDh2NnE0MjFic2IyOHVyMmJyZ2ZxIiwiZXZlbnRfaWQiOiIxZDI2NzE5NS03Zjg4LTQ1YzAtODY1Yy01YjBmYjlmYTFlNGEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6InBob25lIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY4OTg3ODU5OSwiZXhwIjoxNjg5ODgyMTk5LCJpYXQiOjE2ODk4Nzg1OTksImp0aSI6IjRjMzA4MTIwLTBjZDctNGY5MC04YjFiLTc0Mjg0ZWJiN2U2YyIsInVzZXJuYW1lIjoidXNlcjAwMDEifQ.nGJY-CLDzDREg1cl2MVhkrVusKB1YN0szLhSVfLPCvyI8Jrz-dSKSBVE5qgj0sRSAhAIoXvRSUv8PXAHe-TZnBopG8oQ4qN-Oif10_jSbkESrP3l_GvQ4JfmGOQAuc_Il37OX0hAgdGocOb9XkTZuGZgzvbTZEXn2sHoP4VW6Zn-VxgLMhhTZ4y2JW8bivSs0dk01c5zSlsIKY9MBJ0Rtkpnf62b_g-UzE8SY2VJFxQIGnKoRammrYzQREg5psSBtvgub0rLSei--cfKh20NDSqb6e_zm3E1eiki_iN1ZaDN1pudRQeS8cQEHMr48yhnkfyrPrwsE-ubLTa4z7rXsQ&expires_in=3600&token_type=Bearer
