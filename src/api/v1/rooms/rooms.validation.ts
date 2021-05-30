import Joi from '@hapi/joi';
import { EvOptions } from 'express-validation';

const headers = {
    headers: Joi.object({
        authorization: Joi.string().trim().required().label('Auth Token'),
    }).options({ allowUnknown: true }),
};
export default {
    // POST /v1/rooms
    createRoom: {
        ...headers,
        body: Joi.object({
            title: Joi.string().trim().min(4).max(16).required(),
            description: Joi.string().trim().min(10).max(256).required(),
        }),
    },
    // GET /v1/rooms
    getRooms: {
        ...headers,
    },
    // GET /v1/rooms/:room_id
    getRoom: {
        ...headers,
        params: Joi.object({ room_id: Joi.string().required() }),
    },
};

export const validationOptions: EvOptions = { keyByField: true };
