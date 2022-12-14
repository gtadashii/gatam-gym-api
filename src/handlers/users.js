'use strict'
const { getErrorFromException } = require('../factory/errorException')
const { response } = require('../factory/httpFactory')
const userService = require('../services/user.service')
const authorizer = require('../utils/authorizer')

/**
 * path: /users
 * method: GET
 */
const listUsers = async (event) => {
  try {
    await authorizer.verify(event)
    const users = await userService.listUsers();
    return response(users, 200)
  } catch (err) {
    console.error(err);
    return getErrorFromException(err, 'Error while retrieving users, try again later')
  }
}

/**
 * path: /users/{id}
 * method: GET
 */
const getUser = async (event) => {
  try {
    await authorizer.verify(event)
    const { id } = event.pathParameters
    const user = await userService.get(id)
    return response(user, 200)
  } catch (err) {
    console.error(err)
    return getErrorFromException(err, 'Error while retrieving user, try again later')
  }
}

/**
 * path: /users/{id}
 * method: PUT
 */
const updateUser = async (event) => {
  try {
    await authorizer.verify(event)
    const { id } = event.pathParameters
    const { name, email } = JSON.parse(event.body)
    const updatedUser = await userService.updateUser(id, { name, email })
    return response(updatedUser, 200)
  } catch (err) {
    console.error(err)
    return getErrorFromException(err, 'Error while updating user, try again later')
  }
}

/**
 * path: /users/{id}
 * method: DELETE
 */
const deleteUser = async (event) => {
  try {
    await authorizer.verify(event)
    const { id } = event.pathParameters
    await userService.deleteUser(id);
    return response({}, 200)
  } catch (err) {
    console.error(err)
    return getErrorFromException(err, 'Error while deleting user, try again later')
  }
}

module.exports = {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
}
