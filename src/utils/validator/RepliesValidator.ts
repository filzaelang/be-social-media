import * as Joi from "joi";

export const createReplyValidation = Joi.object({
    thread_id: Joi.number().required()
})