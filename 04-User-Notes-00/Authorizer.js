const sendError = require('./sendError');
const { CognitoJwtVerifier } = require('aws-jwt-verify');

const generatePolicy = async (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: effect,
          Resource: resource,
          Action: 'execute-api:Invoke',
        },
      ],
    };
    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    foo: 'bar',
  };
  return authResponse;
};

module.exports.authorize = async (event) => {
  // lambda authorizer code, Using jwt token
  const token = event.authorizationToken;
  if (!token) {
    return sendError('Invalid token', 404);
  }

  try {
    const jwtVerifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USERPOOL_ID,
      tokenUse: 'id',
      clientId: process.env.COGNITO_WEB_CLIENT_ID,
    });

    const payload = await jwtVerifier.verify(token);
    // console.log(JSON.stringify(payload, null, 2));
    return generatePolicy('user', 'Allow', event.methodArn);
  } catch (err) {
    return sendError('Invalid token', 404);
  }
};
