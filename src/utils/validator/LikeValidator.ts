import * as Joi from "joi";

export const createLikeValidation = Joi.object({
    thread_id: Joi.number().required()
})