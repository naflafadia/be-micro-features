import * as Joi from "joi"

export const createPartaiSchema = Joi.object({
    no: Joi.string().required(),
    chairman: Joi.string().max(250).required(),
    visionAndMission: Joi.string().max(250).required(),
    address: Joi.string().max(250).required(),
    picture: Joi.string().allow(null)
})