const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

// Table Scan // Scan the whole table using pagination
const tableScan = async () => {
  const dbClient = new DynamoDBClient({ region: "ap-south-1" });
  const ddbDocClient = DynamoDBDocumentClient.from(dbClient);
  let LastEvaluatedKey = undefined;
  let pages = 0;
  let data = [];

  do {
    try {
      const input = {
        TableName: "user_notes_sdk",
        Limit: 2,
        ExclusiveStartKey: LastEvaluatedKey,
      };

      const command = new ScanCommand(input);
      const response = await ddbDocClient.send(command);
      LastEvaluatedKey = response.LastEvaluatedKey;

      if (response.Items.length > 0) pages++;
      response.Items.forEach((item) => data.push(item));

      // console.log(pages, LastEvaluatedKey);
      // console.log(JSON.stringify(response, null, 2));
    } catch (error) {
      console.log(error);
      break;
    }
  } while (LastEvaluatedKey !== undefined);

  console.log(data);
  console.log("Total pages : " + pages);
  console.log("Total items : " + data.length);
};

tableScan();
