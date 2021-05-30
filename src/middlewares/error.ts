import httpStatus from 'http-status';
import express from 'express';
import { ValidationError } from 'express-validation';
import { ApiError } from '../utils/ApiError';
import config from '../config';
import { logger } from '../utils/logger';

export const notFoundHandler: express.Handler = (req, res, next) => {
    const err = new ApiError({
        message: 'Not Found',
        status: httpStatus.NOT_FOUND,
    });

    return next(err);
};

export const errorHandler: express.ErrorRequestHandler = (err: ApiError | ValidationError | Error, req, res, next?) => {
    let convertedError: ApiError;
    if (!(err instanceof ApiError) && !(err instanceof ValidationError)) {
        convertedError = new ApiError({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
        });
    } // ? Go crash
    else if (err instanceof ValidationError) {
        const { error } = err;
        convertedError = new ApiError({
            status: httpStatus.BAD_REQUEST,
            message: error,
        });
    } else {
        convertedError = err as ApiError;
    }

    const response = {
        code: convertedError.status,
        message: convertedError.message || httpStatus[convertedError.status],
        stack: convertedError.stack,
    };

    if (config.SERVER.env !== 'development') {
        delete response.stack;
    }
    logger.error(convertedError);
    res.status(response.code || httpStatus.INTERNAL_SERVER_ERROR);

    return res.json(response);
};
