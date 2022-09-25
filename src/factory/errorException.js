const { response } = require('./httpFactory')
const {
  ValidationException,
  UsersAlreadyExistsException,
  UserDoesNotExistsException,
  IncorrectPasswordException,
  InvalidTokenException,
  InvalidEmailException
} = require('../utils/exceptions')

const HTTP_ERROR_TYPE = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  NOT_FOUND: 'Not found',
  CONFLICT: 'Conflict'
}

const getErrorFromException = (err, message) => {
  let errorType = 'Internal server error'
  let erroMessage = `${message}, read the application log for more details`
  let errorCode = 500

  if (err instanceof ValidationException) {
    console.log('erro: ', JSON.stringify(err))
    errorType = HTTP_ERROR_TYPE.BAD_REQUEST
    erroMessage = err.message
    errorCode = 400
  }

  if (err instanceof UsersAlreadyExistsException) {
    console.log('erro: ', JSON.stringify(err))
    errorType = HTTP_ERROR_TYPE.BAD_REQUEST
    erroMessage = err.message
    errorCode = 400
  }

  if (err instanceof UserDoesNotExistsException) {
    console.log('erro: ', JSON.stringify(err))
    errorType = HTTP_ERROR_TYPE.NOT_FOUND
    erroMessage = err.message
    errorCode = 404
  }

  if (err instanceof IncorrectPasswordException) {
    console.log('erro: ', JSON.stringify(err))
    errorType = HTTP_ERROR_TYPE.UNAUTHORIZED
    erroMessage = err.message
    errorCode = 403
  }

  if (err instanceof InvalidTokenException) {
    console.log('erro: ', JSON.stringify(err))
    errorType = HTTP_ERROR_TYPE.UNAUTHORIZED
    erroMessage = err.message
    errorCode = 403
  }

  if (err instanceof InvalidEmailException) {
    console.log('erro: ', JSON.stringify(err))
    errorType = HTTP_ERROR_TYPE.UNAUTHORIZED
    erroMessage = err.message
    errorCode = 403
  }

  const logMessage = errorCode === 500 ? `${message}, ${(err).message}` : erroMessage

  console.log({
    codigo: errorCode,
    type: errorType,
    mensagem: logMessage
  })

  return response({ type: errorType, message: erroMessage }, errorCode)
}

module.exports = { getErrorFromException }
