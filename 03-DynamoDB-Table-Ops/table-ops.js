// here aws V3 is used

const {
  DynamoDBClient,
  ListTablesCommand,
  DescribeTableCommand,
  CreateTableCommand,
  UpdateTableCommand,
  DeleteTableCommand,
} = require("@aws-sdk/client-dynamodb");

// Get all table names of a region
const getAllTableNames = async function () {
  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const input = {
    ExclusiveStartTableName: "aaaaaaaaa",
    Limit: 20,
  };
  const command = new ListTablesCommand(input);
  try {
    const results = await dbClient.send(command);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};

// Describe a table of a region
const describeTable = async (tableName) => {
  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const command = new DescribeTableCommand({
    TableName: tableName,
  });
  try {
    const results = await dbClient.send(command);
    // console.log(results);
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Create a table
const createTable = async () => {
  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const params = {
    TableName: "td_notes_sdk",
    AttributeDefinitions: [
      {
        AttributeName: "user_id",
        AttributeType: "S",
      },
      {
        AttributeName: "timestamp",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "user_id",
        KeyType: "HASH",
      },
      {
        AttributeName: "timestamp",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  };
  const command = new CreateTableCommand(params);
  try {
    const response = await dbClient.send(command);
    // console.log(response);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Update a table
const updateTable = async () => {
  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const input = {
    TableName: "td_notes_sdk",
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 1,
    },
  };
  const command = new UpdateTableCommand(input);
  try {
    const results = await dbClient.send(command);
    // console.log(results);
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Delete a table
const deleteTable = async (tableName) => {
  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const command = new DeleteTableCommand({
    TableName: tableName,
  });
  try {
    const response = await dbClient.send(command);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Call all function
getAllTableNames();
// describeTable("user_notes_table");
// createTable();
// updateTable();
// deleteTable("td_notes_sdk");
