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
