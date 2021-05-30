import httpStatus from 'http-status';
import express from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import config from '../config';

export const authorize: express.Handler = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const authorization = req.headers.authorization?.split(' ')[1];
    const apiError = new ApiError({
        message: 'Unauthorized',
        status: httpStatus.UNAUTHORIZED,
    });

    let result: any = '';

    if (!authorization) {
        return next(apiError);
    }
    try {
        result = jwt.verify(authorization, config.JWT.jwtSecret as string);
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            apiError.message = 'Token expired';
        } else {
            apiError.message = 'Malformed token';
        }
        return next(apiError);
    }

    // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    req.userId = result._id;
    return next();
};
