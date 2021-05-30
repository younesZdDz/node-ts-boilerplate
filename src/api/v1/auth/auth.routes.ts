import express from 'express';
import { validate } from 'express-validation';
import { loginController, registerController, isLoggedInCotroller, logoutController } from './auth.controller';
import validation, { validationOptions } from './auth.validation';
import { authorize } from '../../../middlewares/auth';
import config from '../../../config';

const routes = express.Router();

if (config.SERVER.env !== 'production') {
    routes.route('/register').post(validate(validation.register, validationOptions), registerController);
}

routes.route('/login').post(validate(validation.login, validationOptions), loginController);

routes.route('/is-logged-in').get(validate(validation.isLoggedIn, validationOptions), authorize, isLoggedInCotroller);

routes.route('/logout').put(validate(validation.logout, validationOptions), logoutController);

export default routes;
