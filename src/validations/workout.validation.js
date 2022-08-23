const Joi = require('joi')

const exerciseSchema = {
  name: Joi.string().required().messages({
    'any.required': 'É necessário informar o nome do exercício'
  }),
  repetitions: Joi.string().required().messages({
    'any.required': 'É necesário informar as repetições do exercício'
  })
}

const workoutSchema = {
  name: Joi.string().required().messages({
    'any.required': 'É necessário informar o nome do treino'
  }),
  exercises: Joi.array().items(exerciseSchema).min(1).required().messages({
    'any.required': 'É necessário informar os exercícios do treino',
    'array.min': 'É necessário informar ao menos um exercício'
  })
}

const workout = Joi.object(workoutSchema).pattern(/./, Joi.any())

module.exports = { workout }
