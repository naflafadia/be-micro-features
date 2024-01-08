import * as Joi from 'joi'

const createVoteValidation = Joi.object({
    no: Joi.number().min(1).positive().required()
})

export {
    createVoteValidation
}