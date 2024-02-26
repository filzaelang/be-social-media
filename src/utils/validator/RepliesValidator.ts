import * as Joi from "joi";

export const createReplyValidation = Joi.object({
    thread_id: Joi.number().required(),
    content: Joi.string().max(250).allow(null),
    image: Joi.string().allow(null)
})