import { Server } from 'socket.io';
import { createServer } from 'http';
import { createAdapter } from '@socket.io/redis-adapter';
import redis from 'redis';
import config from '../config';
import roomsHandler from './roomsHandler';

const socketServer = createServer();
const io = new Server(socketServer, {
    cors: {
        origin: config.SOCKET.socketCorsOrigin,
    },
});
const pubClient = redis.createClient(config.DB.redisURI as string);
const subClient = pubClient.duplicate();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
io.adapter(createAdapter(pubClient, subClient));

roomsHandler(io);

export { io, socketServer };
