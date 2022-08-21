'use strict'
const { getErrorFromException } = require('../factory/exceptions')
const { response } = require('../factory/httpFactory')
const workoutService = require('../services/workout.service')

/*
  path: /workouts
  method: POST
*/
const createWorkout = async (event) => {
  try {
    const data = JSON.parse(event.body)
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
const listWorkouts = async () => {}

/*
  path: /workouts/{id}
  method: GET
*/
const getWorkout = async () => {}

/*
  path: /workouts/{id}
  method: PUT
*/
const updateWorkout = async () => {}

/*
  path: /workouts/{id}
  method: DELETE
*/
const deleteWorkout = async () => {}

module.exports = {
  createWorkout,
  listWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout
}
