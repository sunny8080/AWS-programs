const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  BatchWriteCommand,
} = require("@aws-sdk/lib-dynamodb");

// Create item using DynamoDBClient class
const createItem1 = async () => {
  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const input = {
    TableName: "td_notes_sdk",
    Item: {
      user_id: {
        S: "abcd12",
      },
      timestamp: {
        N: "10",
      },
      title: {
        S: "my title",
      },
      content: {
        S: "my content",
      },
    },
    ReturnValues: "ALL_OLD",
  };
  const command = new PutItemCommand(input);
  try {
    const response = await dbClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Create item using DynamoDBDocumentClient class (library of DynamoDBClient)
const createItem2 = async () => {
  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const ddbDocClient = DynamoDBDocumentClient.from(dbClient);

  const input = {
    TableName: "td_notes_sdk",
    Item: {
      user_id: "abcd78",
      timestamp: 20,
      title: "My Title",
      content: "my content",
    },
    ReturnValues: "ALL_OLD",
  };
  const command = new PutCommand(input);
  try {
    const response = await ddbDocClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Update an item using DynamoDBDocumentClient class (library of DynamoDBClient)
// update content and add age of a particular item
const updateItem = async () => {
  const input = {
    TableName: "td_notes_sdk",
    Key: {
      user_id: "abcd78",
      timestamp: 20,
    },
    UpdateExpression: "SET #content = :content, #age=:age",
    ExpressionAttributeNames: {
      "#content": "content",
      "#age": "age",
    },
    ExpressionAttributeValues: {
      ":content": "updated content",
      ":age": 20,
    },
    ReturnValues: "ALL_NEW",
  };

  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const docClient = DynamoDBDocumentClient.from(dbClient);
  const command = new UpdateCommand(input);

  try {
    const response = await docClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Delete an item using DynamoDBDocumentClient class
const deleteItem = async () => {
  const input = {
    TableName: "td_notes_sdk",
    Key: {
      user_id: "abcd20",
      timestamp: 20,
    },
    ReturnValues: "ALL_OLD",
  };

  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const docClient = DynamoDBDocumentClient.from(dbClient);
  const command = new DeleteCommand(input);

  try {
    const response = await docClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// BatchWrite operation (only create and delete operation can be done in a single operation in only one table)
const batchWrite = async () => {
  const input = {
    RequestItems: {
      td_notes_sdk: [
        {
          PutRequest: {
            Item: {
              user_id: "sunny11",
              timestamp: 50,
              title: "title 50",
              content: "content 50",
            },
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "sunny100",
              timestamp: 100,
              title: "title 100",
              content: "content 100",
            },
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "sunny400",
              timestamp: 200,
              title: "title 200",
              content: "content 200",
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              user_id: "abcd",
              timestamp: 14,
            },
          },
        },
      ],
    },
    ReturnConsumedCapacity: "TOTAL",
    ReturnItemCollectionMetrics: "SIZE",
  };

  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const docClient = DynamoDBDocumentClient.from(dbClient);
  const command = new BatchWriteCommand(input);

  try {
    const response = await docClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Condition create/update item
const conditionalCreateItem = async () => {
  const input = {
    TableName: "td_notes_sdk",
    Item: {
      user_id: "abcd1fg000",
      timestamp: 3001,
      title: "My Title change asdf",
      content: "my content",
    },
    ConditionExpression: "attribute_exists(user_id) and #t = :t",
    ExpressionAttributeNames: {
      "#t": "title",
    },
    ExpressionAttributeValues: {
      ":t": "My Title change asdf",
    },
    ReturnValues: "ALL_OLD",
  };

  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const docClient = DynamoDBDocumentClient.from(dbClient);
  const command = new PutCommand(input);
  try {
    const response = await docClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// createItem1();
// createItem2();
// updateItem();
// deleteItem();
// batchWrite();
conditionalCreateItem();
