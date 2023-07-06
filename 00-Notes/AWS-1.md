# AWS (Amazon Web Services) notes

It is a cloud provider

## Cloud Computing Model

IaaS
PaaS
SaaS

## AWS certification

1. Foundation level
   i)AWS Certified Cloud Practitioner (CCP)
2. Associate level
   i) Solutions Architect Associate
   ii) Developer Associate
   iii) SysOps Administrator Associate
3. Professional level
   i) Solutions Architect - Professional
   ii) DevOps Engineer Professional
4. Specialty
   i) Advanced Networking - Specialty
   ii) Database - Specialty
   iii) Security - Specialty
   iv) Machine Learning -Specialty
   v) Data Analytics - Specialty

## Services

Amazon EC2 (Elastic Compute Cloud) - We can rent a computer. we can run different services
Amazon S3 (Simple Storage Service) - we can store our data on AWS storage and manipulate them by using this service
Amazon RDS - We can manipulate relational database

## IAM (Identity and Access Management, Global services) - users and groups

IAM policy - users or groups can be assigned JSON documents called policies - describes what a group or users can do, which services they can use
inline IAM policy - policy given to directly to a user and not to a group

## Sevices used

IAM

### AWS MFA (Multifactor Authenticator)

### AWS CLI (Command Line Interface)

### AWS SDK ( Software Development Kit)

### IAM Roles for services

### IAM security tools

common roles - EC2 instance roles, Lambda function roles, roles for CloudFormation

### AWS budget

## Aws CLI commands

aws iam list-users

## EC2 (Elastic compute cloud) - IaaS

It mainly consists in the capability of:
● Renting virtual machines (EC2)
● Storing data on virtual drives (EBS)
● Distributing load across machines (ELB)
● Scaling the services using an auto-scaling group (ASG)

EC2 user data - bootstrapping
EC2 instance and its types

## EBS (Elastic Block Store) volume -

it is a network drive (not a physical drive) you can attach to your instance while they run
Generally we use gp2 / gp3 (general purpose ssd volumes)

## AMI (Amazon Machine Image)

these are customization of EC2 instance

```
   #!/bin/bash
   # Use this for your user data (script from top to bottom)
   # install httpd (Linux 2 version)
   yum update y
   yum install -y httpd
   systemctl start httpd
   systemctl enable httpd
   echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
```

## command to connect aws instance to ssh

ssh -i downloaded_pem ec2-user@public_url
ssh -i .\downloaded_pem.pem ec2-user@100.100.100.100

## EC2 Instance Store

name of hardware attached to physical server, used for better disk performance, short time data
• EBS volumes are network drives with good but "limited" performance
• If you need a high-performance hardware disk, use EC2 Instance Store
• Better I/O performance
• EC2 Instance Store lose their storage if they're stopped (ephemeral)
• Good for buffer / cache/ scratch data / temporary content
• Risk of data loss if hardware fails
• Backups and Replication are your responsibility
• It is physically attached to EC2 instance, if we lose Ec2 then we lose EC2 as well

## EFS (Elastic File System) AWS service

Managed NFS(Network File System) that can be mounted on many EC2
unlike EBS, We can share file systems between than 1 EC2 instance by using this service

## Availability and Scalability

Vertical Scaling
Horizontal Scaling (or elastic)

## ELB (Elastic Load Balancer)

Load Balancers are servers that forward traffic to multiple servers (eg EC2 instances) downstream
ELB is managed load balancers in AWS

### Types of Load Balancers in AWS

1. Classic Load Balancer (CLB) - deprecated
2. Application Load Balancer (ALB)
3. Network Load Balancer (NLB)
4. Gateway Load Balancer (GLB)

## Route 53 - aws service

This aws service is related to AWS DNS (Domain Name Service)

## VPC (Virtual Private Cloud) - aws service

it gives full control over virtual networking environment

## Dynamo DB - aws service

WCU, RCU -Read Write capacity modes
Eventually Consistent Read mode and Strongly Consistent read mode
In dynamoDB tables we can store upto only 400KB of data, data with more size can be stored in AWS S3

1. Writing data -
   PutItem - creates a new item orr fully replace an old item (same primary key)
   UpdateItem - Edits an existing item's attributes or adds a new item if it doesn't exist
   Conditional Writes - Accept a write/update/delete only if conditions are met, otherwise returns an error

2. Reading Data-
   GetItem -

- Read based on Primary key, Primary Key can be HASH or HASH+RANGE
- Eventually Consistent Read (default)
- Option to use Strongly Consistent Reads (more RCU - might take longer)
- Projection Expression can be specified to retrieve only certain attributes

3. Reading Data Query-
   Query returns items based on:

- KeyCondition Expression
  • Partition Key value (must be = operator) - required
  • Sort Key value (=,<, <=, >, >=, Between, Begins with) - optional
- FilterExpression
  • Additional filtering after the Query operation (before data returned to you)
  • Use only with non-key attributes (does not allow HASH or RANGE attributes)

4. Reading Data Scan
   Scan the entire table and then filter out data(inefficient)

5. Delete Data
   DeleteItem -
   Delete an individual item and Ability to perform a conditional delete

   Delete Table -
   Delete a whole table and all its items
   Much quicker deletion than calling DeleteItem on all items

6. Batch operations
   operations are done in parallel for better efficiency and to save in latency
   `BatchWriteItem` -
   upto 25 PutItem or DeleteItem
   can't update items
   `BatchGetItem`
   Return items from one or more tables
   up to 100 items

7. PartiQL
   SQL compatible query language for DynamoDB (support some SQL statements also supports Batch operation)
   Allows you to select, insert, update, and delete data in DynamoDB using SQL
   Run queries across multiple DynamoDB tables
   Run PartiQL queries from:
   • AWS Management Console
   • NoSQL Workbench for DynamoDB
   • DynamoDB APIs
   • AWS CLI
   • AWS SDK

8. keys ib DynamoDB
   i) Primary Key
   ii) SortKey

9. Indexes in DynamoDB
   i) Local Secondary Index(LSI) -
   Alternative Sort Key for your table (same Partition Key as that of base table)
   The Sort Key consists of one scalar attribute (String, Number, or Binary)
   Up to 5 Local Secondary Indexes per table
   Must be defined at table creation time
   Attribute Projections - can contain some or all the attributes of the base table (KEYS ONLY, INCLUDE, ALL)

   ii) Global Secondary Index(GSI)
   Alternative Primary Key (HASH or HASH+RANGE) from the base table
   Speed up queries on non-key attributes
   The Index Key consists of scalar attributes (String, Number, or Binary)
   Attribute Projections - some or all the attributes of the base table (KEYS_ONLY, INCLUDE, ALL)
   Must provision RCUs & WCUs for the index
   Can be added/modified after table creation

10. DynamoDB Accelerator (DAX)
    in memory cache for DynamoDB, solvers Hot Key problem of throttling (too many reads)

11. DynamoDB Streams
    Features that emits events when record modification occur on a DynamoDB table
    Events can be of three types - INSERT, UPdate and remove
    It is like pre-post middleware in mongoose
    Customizable events - Keys only, New image, old image, new and old image

12. TTL (Time to Live)
    automatically delete items after an expiry timestamp
    expired items deleted within 48hrs of expiration
    use case- reduce stored data by keeping only current items

13. DynamoDB CLI (Command line interface)
    • --projection-expression: one or more attributes to retrieve
    • --filter-expression: filter items before returned to you

    General AWS CLI Pagination options (e.g., DynamoDB, S3, ...)
    • --page-size: specify that AWS CLI retrieves the full list of items but with a larger number of API calls instead of one API call (default: 1000 items)
    • --max-items: max. number of items to show in the CLI (returns NextToken)
    • --starting-token: specify the last Next Token to retrieve the next set of items

14. DynamoDB Transactions
    coordinated all-or-nothing operations (add/update/delete) to multiple items across one or more tables
    either all the transactions work or none of them work
    Two operations -
    TransactGetItems - one or more GetItem operations
    TransactWriteItems - one or more PutItem UpdateItem DeleteItem operations
    use case - financial transactions, managing orders

15. Five Steps Process-
    1. Draw an entity diagram
    2. Identify the relationships between entities (1:1, 1:N, N:M)
    3. List down all the access patterns for each entity
    4. Identify the primary key (Hash + Sort) for each entity
    5. Identify the secondary indexes for additional access patterns if required

## Lambda Function - AWS service

Lambda Invocation Policy or Function Policy
Lambda Execution Role

## Key Management Services (KMS) - AWS service
