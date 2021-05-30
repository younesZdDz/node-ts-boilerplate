import Joi from '@hapi/joi';
import { EvOptions } from 'express-validation';

const headers = {
    headers: Joi.object({
        authorization: Joi.string().trim().required().label('Auth Token'),
    }).options({ allowUnknown: true }),
};
export default {
    // POST /v1/user/register
    register: {
        body: Joi.object({
            email: Joi.string().email().lowercase().trim().required(),
            password: Joi.string().min(8).max(16).required().trim(),
        }),
    },
    // POST /v1/user/login
    login: {
        body: Joi.object({
            email: Joi.string().email().lowercase().trim().required(),
            password: Joi.string().min(6).max(16).required().trim(),
        }),
    },

    // GET /v1/user/is-logged-in
    isLoggedIn: {
        ...headers,
    },
    // POST /v1/user/logout
    logout: {
        ...headers,
        body: Joi.object({
            token: Joi.string().required().trim().label('Token'),
        }),
    },
};

export const validationOptions: EvOptions = { keyByField: true };
