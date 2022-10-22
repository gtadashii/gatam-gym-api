const { workout } = require('./workout.validation')
const { ValidationException } = require('../utils/exceptions')
const { user, login, verify, updateUser } = require('./user.validation')

class Validation {
  async workout (data) {
    try {
      await workout.validateAsync(data, { abortEarly: false })
    } catch (err) {
      console.error(err)
      throw new ValidationException(err)
    }
  }
  async user (data) {
    try {
      await user.validateAsync(data, { abortEarly: false })
    } catch (err) {
      console.error(err)
      throw new ValidationException(err)
    }
  }
  async login (data) {
    try {
      await login.validateAsync(data, { abortEarly: false })
    } catch (err) {
      console.error(err)
      throw new ValidationException(err)
    }
  }
  async verify (data) {
    try {
      await verify.validateAsync(data, { abortEarly: false })
    } catch (err) {
      console.error(err)
      throw new ValidationException(err)
    }
  }
  async updateUser (data) {
    try {
      await updateUser.validateAsync(data, { abortEarly: false })
    } catch (err) {
      console.error(err)
      throw new ValidationException(err)
    }
  }
}

module.exports = new Validation()
