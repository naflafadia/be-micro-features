import * as Joi from 'joi'

const createVoteValidation = Joi.object({
    user: Joi.number().min(1).positive().required(),
    paslon: Joi.number().min(1).positive().required()
})

export {
    createVoteValidation
}