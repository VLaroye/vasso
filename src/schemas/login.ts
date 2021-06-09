import Joi from 'joi';

export const loginRequestSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const registerRequestSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});