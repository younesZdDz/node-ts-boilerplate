import express from 'express';
import compress from 'compression';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import Ddos from 'ddos';
import httpStatus from 'http-status';
import routes from './api/v1/router';
import { errorHandler, notFoundHandler } from './middlewares/error';
import config from './config';
import { ApiError } from './utils/ApiError';
import { logger } from './utils/logger';
import { loggerMiddleware } from './middlewares/logger';

const ddosInstance = new Ddos(config.SECURITY.ddosConfig);

const corsOptions: CorsOptions = {
    exposedHeaders: 'authorization, authorization-expiry-time',
    origin: (origin, callback) => {
        if (origin && (!config.SECURITY.whitelist || config.SECURITY.whitelist.includes(origin))) {
            callback(null, true);
        } else {
            callback(new ApiError({ message: 'Not allowed by CORS', status: httpStatus.UNAUTHORIZED }));
        }
    },
};

const server = express();

server.use((req, res, next) => {
    req.headers.origin = req.headers.origin || req.headers.host;
    next();
});

// npm module for preventing ddos attack. See more
// https://www.npmjs.com/package/ddos
server.use(ddosInstance.express);

// parse body params and attache them to req.body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(loggerMiddleware(logger));

// gzip compression
server.use(compress());

// secure servers by setting various HTTP headers
server.use(helmet());

// enable CORS - Cross Origin Resource Sharing
server.use(cors(corsOptions));

// mount api v1 routes
server.use('/api/v1', routes);

// catch 404 and forward to error handler
server.use(notFoundHandler);
server.use(errorHandler);

export default server;
