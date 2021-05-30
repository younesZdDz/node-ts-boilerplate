import httpStatus from 'http-status';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import config from '../config';
import { ApiError } from '../utils/ApiError';
import User from '../api/v1/auth/auth.model';

export default async (socket: Socket, next: (err?: ExtendedError | undefined) => void): Promise<void> => {
    const { token } = socket.handshake.auth;
    const apiError = new ApiError({
        message: 'Unauthorized',
        status: httpStatus.UNAUTHORIZED,
    });
    if (!token) {
        return next(apiError);
    }
    try {
        jwt.verify(token, config.JWT.jwtSecret as string);
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            apiError.message = 'Token expired';
        } else {
            apiError.message = 'Malformed token';
        }
        return next(apiError);
    }

    const user = await User.findOneAndUpdate(
        { 'sessions.token': token },
        { $set: { 'sessions.$.socketId': socket.id } },
        { fields: { _id: 1, email: 1, sessions: 1 }, new: true },
    );
    // eslint-disable-next-line no-param-reassign
    socket.data.user = user;
    return next();
};
