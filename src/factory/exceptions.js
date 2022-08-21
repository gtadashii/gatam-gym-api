const { response } = require('./httpFactory')

const getErrorFromException = (err, message) => {
  let errorType = 'Internal server error'
  let erroMessage = `${message}, read the application log for more details`
  let errorCode = 500

  const logMessage = errorCode === 500 ? `${message}, ${(err).message}` : erroMessage

  console.log({
    codigo: errorCode,
    type: errorType,
    mensagem: logMessage
  })

  return response({ type: errorType, message: erroMessage }, errorCode)
}

module.exports = { getErrorFromException }
