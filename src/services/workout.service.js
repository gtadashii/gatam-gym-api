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
}

module.exports = new WorkoutService()