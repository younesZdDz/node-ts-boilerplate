import httpStatus from 'http-status';
import express from 'express';
import { registerService, loginService, logoutService } from './auth.service';

const registerController: express.Handler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await registerService(email, password);
        return res.status(httpStatus.CREATED).json();
    } catch (error) {
        return next(error);
    }
};

const loginController: express.Handler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const [token, user] = await loginService(email, password);
        res.set('authorization', token.token);
        res.set('authorization-expiry-time', `${token.tokenExpiresIn}`);

        res.status(httpStatus.OK);

        return res.json({
            // eslint-disable-next-line no-underscore-dangle
            _id: user._id,
            email: user.email,
        });
    } catch (error) {
        return next(error);
    }
};

const isLoggedInCotroller: express.Handler = async (req, res) => {
    return res.status(httpStatus.OK).json();
};

const logoutController: express.Handler = async (req, res, next) => {
    try {
        const { token } = req.body;
        await logoutService(token);
        return res.status(httpStatus.NO_CONTENT).json();
    } catch (error) {
        return next(error);
    }
};

export { registerController, loginController, isLoggedInCotroller, logoutController };
