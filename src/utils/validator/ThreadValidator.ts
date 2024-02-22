import * as Joi from "joi";

export const createThread = Joi.object({
    content: Joi.string().max(250).allow(null),
    image: Joi.string().allow(null)
})

export const updateThread = Joi.object({
    content: Joi.string().max(250).allow(null),
    image: Joi.string().allow(null)
})