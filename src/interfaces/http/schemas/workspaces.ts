import Joi from 'joi';

export const createWorkspaceRequestSchema = Joi.object({
    name: Joi.string().required(),
});