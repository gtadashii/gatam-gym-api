const {
  UsersAlreadyExistsException,
  UserDoesNotExistsException,
  IncorrectPasswordException,
  InvalidTokenException,
  InvalidEmailException
} = require('../utils/exceptions');

const validation = require('../validations');
const userService = require('./user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  async register(userInfo) {
    await validation.user(userInfo);
    const { name, email, password } = userInfo;
    const userAlreadyExistis = await userService.getByEmail(email);
    if (userAlreadyExistis) {
      throw new UsersAlreadyExistsException('Email já cadastrado no sistema');
    }
    const user = {
      name,
      email,
      password
    }
    const createdUser = await userService.create(user);
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email
    };
  }

  async login(userInfo) {
    await validation.login(userInfo);
    const { email, password } = userInfo;
    const user = await userService.getByEmail(email);
    if (!user) {
      throw new UserDoesNotExistsException('Usuário não existe');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new IncorrectPasswordException('Senha incorreta');
    }

    const token = await this.generateToken(user);
    return {
      name: user.name,
      email: user.email,
      token
    }
  }

  async verify(userInfo) {
    await validation.verify(userInfo);
    const { email, token } = userInfo;
    return jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
      if (err) {
        throw new InvalidTokenException('Invalid token')
      }
      if (response.email !== email) {
        throw new InvalidEmailException('Invalid email')
      }
      return {
        verified: true,
        message: 'Valid'
      }
    })
  }

  async generateToken(user) {
    if (!user) return null;
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })
  }
}

module.exports = new AuthService();