import config from './config';
import database from './database';
import server from './server';
import { socketServer } from './socket/socket';
import { logger } from './utils/logger';

database.connect();

server.listen(config.SERVER.port, () => {
    logger.info(`Server started on port ${config.SERVER.port} (${config.SERVER.env})`);
});
socketServer.listen(config.SOCKET.socketPort, () => {
    logger.info(`Socket started on port ${config.SOCKET.socketPort} (${config.SERVER.env})`);
});
const src = server;

export default src;
