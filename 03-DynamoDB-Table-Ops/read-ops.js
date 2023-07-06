const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  BatchGetCommand,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

// Get an item
const getItem = async () => {
  const input = {
    TableName: "td_notes_sdk",
    Key: {
      user_id: "sunny100",
      timestamp: 100,
    },
    // AttributesToGet: ["user_id", "timestamp", "title", "content"],
    ProjectionExpression: "user_id, title, content",
  };

  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const ddbDocClient = DynamoDBDocumentClient.from(dbClient);
  const command = new GetCommand(input);
  try {
    const response = await ddbDocClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Get Batch Items // get items from different tables at once (maximum 100 items is possible and total size must less than 16MB after than follow pagination to get all items)
const getBatchItems = async () => {
  const input = {
    RequestItems: {
      td_notes_sdk: {
        Keys: [
          {
            user_id: "sunny100",
            timestamp: 100,
          },
          {
            user_id: "sunny11",
            timestamp: 50,
          },
          {
            user_id: "sunny400",
            timestamp: 200,
          },
        ],
        AttributesToGet: ["user_id", "timestamp", "title", "content"],
        // ProjectionExpression: "user_id, title, content",
      },

      user_notes_table: {
        Keys: [
          {
            user_id: "sunny8080",
            timestamp: 1524890163,
          },
        ],
        AttributesToGet: [
          "user_id",
          "timestamp",
          "cat",
          "content",
          "note_id",
          "title",
          "user_name",
        ],
      },
    },
  };

  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const ddbDocClient = DynamoDBDocumentClient.from(dbClient);
  const command = new BatchGetCommand(input);
  try {
    const response = await ddbDocClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Table query
const tableQuery = async () => {
  const input = {
    TableName: "user_notes_sdk",
    // ProjectionExpression: "user_id, serial_no, cat, content, note_id, title, user_name ",
    KeyConditionExpression: "user_id = :user_id_val",
    // KeyConditionExpression: "user_id = :user_id_val AND serial_no = :serial_no_val",
    // KeyConditionExpression: "user_id = :user_id_val AND serial_no < :serial_no_val",
    // Limit: 1,
    FilterExpression: "#t = :v",
    ExpressionAttributeNames: {
      "#t": "note_id",
    },
    ExpressionAttributeValues: {
      ":user_id_val": "sunny8080",
      // ":serial_no_val": 5,
      ":v": "note1",
    },
  };

  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const ddbDocClient = DynamoDBDocumentClient.from(dbClient);
  const command = new QueryCommand(input);
  try {
    const response = await ddbDocClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Table query using index (local or global)
const tableIndexQuery = async () => {
  const input = {
    TableName: "user_notes_sdk",
    // IndexName: "title-local-index",
    // KeyConditionExpression: "user_id = :user_id_val AND title = :title_val",
    // ExpressionAttributeValues: {
    //   ":user_id_val": "sunny8080",
    //   ":title_val": "my title",
    // },
    IndexName: "note_id-global-index",
    KeyConditionExpression: "note_id = :note_id_val",
    ExpressionAttributeValues: {
      ":note_id_val": "note1",
    },
  };

  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const ddbDocClient = DynamoDBDocumentClient.from(dbClient);
  const command = new QueryCommand(input);
  try {
    const response = await ddbDocClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Table Scan (table scan and index scan)
const tableScan = async () => {
  const input = {
    TableName: "user_notes_sdk",
    // IndexName:"title-local-index",
    // IndexName: "note_id-global-index",
    FilterExpression: "#t < :v",
    ExpressionAttributeNames: {
      "#t": "serial_no",
    },
    ExpressionAttributeValues: {
      ":v": 5,
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const ddbDocClient = DynamoDBDocumentClient.from(dbClient);
  const command = new ScanCommand(input);
  try {
    const response = await ddbDocClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// getItem();
// getBatchItems();
// tableQuery();
// tableIndexQuery();
tableScan();
