import * as Joi from "joi"

export const createPartaiSchema = Joi.object({
    name: Joi.string().required(),
    chairman: Joi.string().max(250).required(),
    visionAndMission: Joi.string().max(250).required(),
    address: Joi.string().max(250).required(),
    paslon : Joi.number().positive().min(1).required(),
    picture: Joi.string().allow(null)
})

export const getOnePartaiValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
})