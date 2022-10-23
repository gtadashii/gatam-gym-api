const jwt = require('jsonwebtoken');
const { InvalidTokenException } = require('../utils/exceptions')

class Authorizer {
  async verify (event) {
    const token = this._getAuthTokenFromEvent(event)
    return jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
      if (err) {
        throw new InvalidTokenException('Invalid token')
      }
      return {
        verified: true,
        message: 'Valid'
      }
    })
  }

  _getAuthTokenFromEvent (event) {
    const authorization = event.headers.authorization;
    if (!authorization) {
      throw new InvalidTokenException('No token informed')
    }
    const data = authorization.split(' ')
    const token = data[1]
    return token
  }
}

module.exports = new Authorizer();
