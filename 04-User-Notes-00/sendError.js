const sendError = (error, statusCode) => {
  return {
    statusCode: statusCode || 500,
    body: JSON.stringify(
      {
        statusCode: statusCode || 500,
        error: error || 'Server Error',
      },
      null,
      2
    ),
  };
};

module.exports = sendError;
