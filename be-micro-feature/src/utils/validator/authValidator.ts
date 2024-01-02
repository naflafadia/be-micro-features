import * as Joi from "joi"

export const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

 export const getOneUserValidation = Joi.object({
  id: Joi.number().min(1).positive().required(),
})