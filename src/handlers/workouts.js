'use strict'
const { getErrorFromException } = require('../factory/errorException')
const { response } = require('../factory/httpFactory')
const workoutService = require('../services/workout.service')
const validation = require('../validations')

/*
  path: /workouts
  method: POST
*/
const createWorkout = async (event) => {
  try {
    const data = JSON.parse(event.body)
    await validation.workout(data)
    const workout = await workoutService.create(data)
    return response(workout, 200)
  } catch (err) {
    console.error(err)
    return getErrorFromException(err, 'Error while creating workout, try again later')
  }
}

/*
  path: /workouts
  method: GET
*/
const listWorkouts = async (event) => {
  try {
    const workouts = await workoutService.list()
    return response(workouts, 200)
  } catch (err) {
    console.error(err)
    return getErrorFromException(err, 'Error while retrieving workouts, try again later')
  }
}

/*
  path: /workouts/{id}
  method: GET
*/
const getWorkout = async (event) => {
  try {
    const { id } = event.pathParameters
    const workout = await workoutService.get(id)
    return workout
  } catch (err) {
    console.error(err)
    return getErrorFromException(err, 'Error while retrieving workout, try again later')
  }
}

/*
  path: /workouts/{id}
  method: PUT
*/
const updateWorkout = async (event) => {
  try {
    const { id } = event.pathParameters
    const { name, exercises } = JSON.parse(event.body)
    const updated = await workoutService.update(id, { name, exercises })
    return response(updated, 200)
  } catch (err) {
    console.error(err)
    return getErrorFromException(err, 'Error while updating workout, try again later')
  }
}

/*
  path: /workouts/{id}
  method: DELETE
*/
const deleteWorkout = async (event) => {
  try {
    const { id } = event.pathParameters
    await workoutService.delete(id)
  } catch (err) {
    console.error(err)
    return getErrorFromException(err, 'Error while deleting workout, try again later')
  }
}

module.exports = {
  createWorkout,
  listWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout
}
