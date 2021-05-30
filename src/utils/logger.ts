import winston from 'winston';
import config from '../config';

const loggerFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.align(),
    winston.format.printf((info) => {
        const { timestamp, level, message, ...extras } = info;
        return `${timestamp} [${level}]: ${message} ${
            Object.keys(extras).length ? JSON.stringify(extras, null, 2) : ''
        }`;
    }),
    winston.format.colorize({ all: true }),
);

export const logger = winston.createLogger({
    level: config.LOGGER.level || 'info',
    format: loggerFormat,
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            silent: config.SERVER.env === 'test',
        }),
    ],
    exitOnError: false,
});
