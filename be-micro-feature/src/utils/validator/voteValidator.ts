import * as Joi from 'joi'

const createVoteValidation = Joi.object({
    noPaslon: Joi.number().min(1).positive().required()
})

export {
    createVoteValidation
}