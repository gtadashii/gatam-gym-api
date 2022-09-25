'use strict'
const { response } = require('../factory/httpFactory');
const { getErrorFromException } = require('../factory/errorException')
const authService = require('../services/auth.service');

/*
  path: /auth/register
  method: POST
*/
const register = async (event) => {
  console.info('Received event: ', JSON.stringify(event));
  try {
    const userInfo = JSON.parse(event.body);
    const result = await authService.register(userInfo);
    return response(result, 200);
  } catch (err) {
    console.error(err);
    return getErrorFromException(err, 'Error while registering new user');
  }
}

/*
  path: /auth/verify
  method: POST
*/
const verify = async (event) => {
  console.info('Received event: ', JSON.stringify(event));
  try {
    const userInfo = JSON.parse(event.body);
    const result = await authService.verify(userInfo)
    return response(result, 200);
  } catch (err) {
    console.error(err);
    return getErrorFromException(err, 'Error while verifying user');
  }
}

/*
  path: /auth/login
  method: POST
*/
const login = async (event) => {
  console.info('Received event: ', JSON.stringify(event));
  try {
    const userInfo = JSON.parse(event.body);
    const result = await authService.login(userInfo);
    return response(result, 200);
  } catch (err) {
    console.error(err);
    return getErrorFromException(err, 'Login error');
  }
}

module.exports = { register, verify, login };
