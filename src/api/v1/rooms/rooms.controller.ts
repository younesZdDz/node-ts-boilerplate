import express from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../../../utils/ApiError';
import { createRoomService, getRoomService, getRoomsService } from './rooms.service';

const createRoomController: express.Handler = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const room = await createRoomService(title, description);
        return res.status(httpStatus.CREATED).json(room);
    } catch (err) {
        return next(err);
    }
};

const getRoomsController: express.Handler = async (req, res, next) => {
    try {
        const rooms = await getRoomsService();
        return res.status(httpStatus.OK).send(rooms);
    } catch (err) {
        return next(err);
    }
};

const getRoomController: express.Handler = async (req, res, next) => {
    try {
        const { room_id: roomId } = req.params;
        const room = await getRoomService(roomId);
        if (room === null) {
            throw new ApiError({
                status: httpStatus.NOT_FOUND,
                message: 'Not found.',
            });
        }
        return res.status(httpStatus.OK).send(room);
    } catch (err) {
        return next(err);
    }
};

export { createRoomController, getRoomsController, getRoomController };
