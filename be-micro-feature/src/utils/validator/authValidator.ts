import * as Joi from "joi"

export const registerSchema = Joi.object({
  fullName: Joi.string().max(100).required(),
  address: Joi.string().max(100).required(),
  username: Joi.string().max(100).required(),
  gender: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  role: Joi.string().max(100).allow(null)
})

export const loginSchema = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required()
})

 export const getOneUserValidation = Joi.object({
  id: Joi.number().min(1).positive().required(),
})