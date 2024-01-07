import * as Joi from "joi"

export const createPaslonSchema = Joi.object({
    no: Joi.string().required(),
    name: Joi.string().max(250).required(),
    visionAndMission: Joi.string().max(250).required(),
    picture: Joi.string().allow(null)
})

export const getOnePaslonValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
})