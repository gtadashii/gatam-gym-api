const { workout } = require('./workout.validation')
const { ValidationException } = require('../utils/exceptions')

class Validation {
  async workout (data) {
    try {
      await workout.validateAsync(data, { abortEarly: false })
    } catch (err) {
      console.error(err)
      throw new ValidationException(err)
    }
  }
}

module.exports = new Validation()
