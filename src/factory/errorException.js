const { response } = require('./httpFactory')
const { ValidationException } = require('../utils/exceptions')

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

  const logMessage = errorCode === 500 ? `${message}, ${(err).message}` : erroMessage

  console.log({
    codigo: errorCode,
    type: errorType,
    mensagem: logMessage
  })

  return response({ type: errorType, message: erroMessage }, errorCode)
}

module.exports = { getErrorFromException }
