const dynamo = require('./dynamo')
const { v4: uuidv4 } = require('uuid')

class WorkoutService {
  async create (data) {
    console.info(JSON.stringify(data))
    const workout = { id: uuidv4(), ...data }
    const params = {
      TableName: process.env.WORKOUT_TABLE,
      Item: workout
    }
    await dynamo.put(params).promise()
    return workout
  }

  async get (id) {
    const params = {
      TableName: process.env.WORKOUT_TABLE,
      Key: { id }
    }
    const workout = await dynamo.get(params).promise()
    return workout.Item
  }

  async update (id, data) {
    console.info(JSON.stringify(data))
    const params = {
      TableName: process.env.WORKOUT_TABLE,
      Key: { id },
      UpdateExpression: 'set name = :name, exercises = :exercises',
      ExpressionAttributeValues: {
        ':name': data.name,
        ':exercises': data.exercises
      }
    }
    await dynamo.update(params).promise()
    return data
  }
  
  async list () {
    const params = {
      TableName: process.env.WORKOUT_TABLE,
      Limit: 10
    }
    const results = await dynamo.scan(params).promise()
    return results.Items
  }

  async delete (id) {
    const params = {
      TableName: process.env.WORKOUT_TABLE,
      Key: { id }
    }
    await dynamo.delete(params).promise()
  }
}

module.exports = new WorkoutService()