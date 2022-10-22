const dynamo = require('./dynamo');
const bcrypt = require('bcryptjs');
const { v4: uuidV4 } = require('uuid');
const { UserDoesNotExistsException } = require('../utils/exceptions');
const validation = require('../validations/index')

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
    const result = await dynamo.get(params).promise()
    const user = result.Item
    if (!user) {
      throw new UserDoesNotExistsException(`User of id ${id} not found`)
    }
    const treatedUser = { name: user.name, email: user.email }
    return treatedUser
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

  async listUsers() {
    const params = {
      TableName: process.env.USERS_TABLE,
      Limit: 10
    }
    const results = await dynamo.scan(params).promise();
    const users = results.Items
    const treatedUsers = users.map(user => {
      return { id: user.id, name: user.name, email: user.email }
    })
    return treatedUsers
  }

  async updateUser(id, data) {
    await validation.updateUser(data)
    await this.get(id)
    const params = {
      TableName: process.env.USERS_TABLE,
      Key: { id },
      UpdateExpression: 'set #name = :name, #email = :email',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#email': 'email'
      },
      ExpressionAttributeValues: {
        ':name': data.name,
        ':email': data.email
      }
    }
    await dynamo.update(params).promise();
    return { id, ...data }
  }

  async deleteUser(id) {
    await this.get(id)
    const params = {
      TableName: process.env.USERS_TABLE,
      Key: { id }
    }
    await dynamo.delete(params).promise()
  }
}

module.exports = new UserService();
