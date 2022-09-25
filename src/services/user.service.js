const dynamo = require('./dynamo');
const bcrypt = require('bcryptjs');
const { v4: uuidV4 } = require('uuid');

class UserService {
  async create(userInfo) {
    console.info(JSON.stringify(userInfo))
    const { name, email, password } = userInfo;
    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    const user = {
      id: uuidV4(),
      name,
      email,
      password: encryptedPassword
    }
    const params = {
      TableName: process.env.USERS_TABLE,
      Item: user
    }
    await dynamo.put(params).promise()
    return { id: user.id, name, email }
  }

  async get(id) {
    const params = {
      TableName: process.env.USERS_TABLE,
      Key: { id }
    }
    const user = await dynamo.get(params).promise()
    return user.Item
  }

  async getByEmail(email) {
    if (!email) return null;

    const params = {
      TableName: process.env.USERS_TABLE,
      IndexName: 'user-email',
      KeyConditionExpression: '#email = :email',
      ExpressionAttributeNames: {
        '#email': 'email'
      },
      ExpressionAttributeValues: {
        ':email': email
      }
    };

    const user = await dynamo.query(params).promise();
    if (user.Count === 0) return null;
    return user.Items[0];
  }
}

module.exports = new UserService();
