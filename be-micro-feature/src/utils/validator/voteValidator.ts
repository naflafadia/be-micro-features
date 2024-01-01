import * as Joi from "joi"

export const createVoteSchema = Joi.object({
    no: Joi.string().required(),
    name: Joi.string().max(250).required(),
    address: Joi.string().max(250).required(),
    accumulation: Joi.string().max(250).allow(null),
    numberOfVotes: Joi.string().max(250).allow(null),
    gender: Joi.string().max(250).required(),
    paslon: Joi.string().max(250).required(),
    picture: Joi.string().allow(null)
})