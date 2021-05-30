import express from 'express';
import { validate } from 'express-validation';
import { createRoomController, getRoomController, getRoomsController } from './rooms.controller';
import validation, { validationOptions } from './rooms.validation';
import { authorize } from '../../../middlewares/auth';

const routes = express.Router();

routes.route('/').post(validate(validation.createRoom, validationOptions), authorize, createRoomController);
routes.route('/').get(validate(validation.getRooms, validationOptions), authorize, getRoomsController);
routes.route('/:room_id').get(validate(validation.getRoom, validationOptions), authorize, getRoomController);

export default routes;
