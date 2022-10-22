class ValidationException extends Error {
  constructor (message) {
    super(message)
  }
}

class UsersAlreadyExistsException extends Error {
  constructor (message) {
    super(message)
  }
}

class UserDoesNotExistsException extends Error {
  constructor (message) {
    super(message)
  }
}

class IncorrectPasswordException extends Error {
  constructor (message) {
    super(message)
  }
}

class InvalidTokenException extends Error {
  constructor (message) {
    super(message)
  }
}

class InvalidEmailException extends Error {
  constructor (message) {
    super(message)
  }
}

class WorkoutDoesNotExistsException extends Error {
  constructor (message) {
    super(message)
  }
}

module.exports = {
  ValidationException,
  UsersAlreadyExistsException,
  UserDoesNotExistsException,
  IncorrectPasswordException,
  InvalidTokenException,
  InvalidEmailException,
  WorkoutDoesNotExistsException
}
