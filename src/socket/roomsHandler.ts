import { Socket, Server } from 'socket.io';
import { addMessageToRoomService } from '../api/v1/rooms/rooms.service';
import { logger } from '../utils/logger';
import authMiddleware from './authMiddleware';

export default (io: Server): void => {
    const roomsSocket = io.of('/rooms');

    roomsSocket.use(authMiddleware);

    roomsSocket.on('connection', (socket: Socket) => {
        const joinRoom = (room: string) => {
            socket.join(room);
        };

        const leaveRoom = (room: string) => {
            socket.leave(room);
        };

        const handleMessage = async ({
            content,
            createdAt,
            roomId,
        }: {
            content: string;
            createdAt: number;
            roomId: string;
        }) => {
            const { _id: sentBy } = socket.data.user;
            const message = { sentBy, content, createdAt };
            await addMessageToRoomService(roomId, message);
            roomsSocket.to(roomId).emit('room.message', message);
        };

        socket.on('room.join', joinRoom);
        socket.on('room.leave', leaveRoom);
        socket.on('room.message', handleMessage);

        socket.on('connect_error', (err) => {
            logger.error(err);
            socket.disconnect();
        });
    });
};
