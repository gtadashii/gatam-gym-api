const Joi = require('joi');

const userSchema = {
  name: Joi.string().required().messages({
    'any.required': 'É necessário informar o nome'
  }),
  email: Joi.string().required().messages({
    'any.required': 'É necessário informar o email'
  }),
  password: Joi.string().required().messages({
    'any.required': 'É necessário informar a senha'
  })
}

const loginSchema = {
  email: Joi.string().required().messages({
    'any.required': 'É necessário informar o e-mail'
  }),
  password: Joi.string().required().messages({
    'any.required': 'É necessário informar a senha'
  })
}

const verifySchema = {
  email: Joi.string().required().messages({
    'any.required': 'É necessário informar o e-mail'
  }),
  token: Joi.string().required().messages({
    'any.required': 'É necessário informar o e-mail'
  })
}

const user = Joi.object(userSchema).pattern(/./, Joi.any());
const login = Joi.object(loginSchema).pattern(/./, Joi.any());
const verify = Joi.object(verifySchema).pattern(/./, Joi.any());

module.exports = { user, login, verify }
