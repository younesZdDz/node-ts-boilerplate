import dotenv from 'dotenv';

dotenv.config();

export default {
    SECURITY: {
        whitelist: process.env.WHITE_LIST,
        ddosConfig: {
            limit: process.env.DDOS_CONFIG_LIMIT,
            burst: process.env.DDOS_CONFIG_BURST,
        },
    },
    SERVER: {
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        baseUrl: `${process.env.BASE_URL}:${process.env.PORT}`,
        website: process.env.WEBSITE,
    },
    DB: {
        mongoURI: process.env.MONGO_URI,
        redisURI: process.env.REDIS_URI,
    },
    JWT: {
        jwtSecret: process.env.JWT_SECRET,
        jwtTokenLife: parseInt(process.env.JWT_TOKEN_LIFE || '86400', 10),
    },
    SOCKET: {
        socketPort: process.env.SOCKET_PORT,
        socketCorsOrigin: process.env.SOCKET_CORS_ORIGIN,
    },
    LOGGER: {
        level: process.env.level,
    },
};
