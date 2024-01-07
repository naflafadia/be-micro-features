import * as Joi from "joi"

export const createArticleSchema = Joi.object({
    author: Joi.string().max(50).required(),
    title: Joi.string().max(250).required(),
    date: Joi.string().max(10).required(),
    description: Joi.string().min(10).max(250).required(),
    picture: Joi.string().allow(null)
})

export const getOneArticleValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
});