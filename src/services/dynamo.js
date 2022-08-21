const AWS = require('aws-sdk')

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_DEPLOY_REGION
})

module.exports = dynamo